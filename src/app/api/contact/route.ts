import { NextResponse } from "next/server";
import { contactInterests } from "@/lib/content-pages";

/**
 * Contact form endpoint. Sends enquiries by email through Resend.
 * Configure RESEND_API_KEY, CONTACT_FROM and CONTACT_TO in Vercel → Settings → Environment Variables.
 */

const hits = new Map<string, number[]>(); // light best-effort rate limit per server instance

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) {
    return NextResponse.json({ ok: false, error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const data = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    company: clean(body.company, 160),
    phone: clean(body.phone, 40),
    interest: clean(body.interest, 80),
    message: clean(body.message, 5000),
  };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  if (data.interest && !contactInterests.includes(data.interest)) data.interest = "";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Email not configured — enquiry received:", data);
      return NextResponse.json({ ok: true });
    }
    console.error("[contact] RESEND_API_KEY / CONTACT_FROM / CONTACT_TO are not set.");
    return NextResponse.json({ ok: false, error: "Our form is temporarily unavailable." }, { status: 503 });
  }

  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company || "—"],
    ["Phone", data.phone || "—"],
    ["Interested in", data.interest || "—"],
  ]
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#667085">${k}</td><td style="padding:6px 0;color:#0b1220"><strong>${esc(v)}</strong></td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: CONTACT_TO.split(",").map((s) => s.trim()),
      reply_to: data.email,
      subject: `New enquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html: `<div style="font-family:Inter,Arial,sans-serif;font-size:15px"><h2 style="margin:0 0 16px">New website enquiry</h2><table>${rows}</table><p style="margin-top:20px;white-space:pre-wrap;line-height:1.6">${esc(data.message)}</p></div>`,
      text: `${data.name} <${data.email}>\nCompany: ${data.company}\nPhone: ${data.phone}\nInterest: ${data.interest}\n\n${data.message}`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "We couldn't send your message right now." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
