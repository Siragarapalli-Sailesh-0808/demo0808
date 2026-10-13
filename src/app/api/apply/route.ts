import { NextResponse } from "next/server";
import { jobs } from "@/lib/jobs";

/**
 * Job application endpoint: emails the application with the résumé attached, through Resend.
 * Uses the same environment variables as the contact form (RESEND_API_KEY, CONTACT_FROM, CONTACT_TO);
 * set CAREERS_TO to send applications to a different address.
 */

const MAX_BYTES = 4 * 1024 * 1024; // keeps the request under Vercel's 4.5 MB body limit
const hits = new Map<string, number[]>();

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clean = (v: FormDataEntryValue | null, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Check the file really is a PDF / Word document by its first bytes, not just its name. */
function fileKind(buf: Uint8Array, name: string): "pdf" | "doc" | "docx" | null {
  const n = name.toLowerCase();
  const starts = (...b: number[]) => b.every((x, i) => buf[i] === x);
  if (n.endsWith(".pdf") && starts(0x25, 0x50, 0x44, 0x46)) return "pdf";
  if (n.endsWith(".docx") && starts(0x50, 0x4b, 0x03, 0x04)) return "docx";
  if (n.endsWith(".doc") && starts(0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1)) return "doc";
  return null;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) {
    return NextResponse.json({ ok: false, error: "Too many applications. Please try again in a few minutes." }, { status: 429 });
  }
  hits.set(ip, [...recent, now]);

  if (Number(req.headers.get("content-length") ?? 0) > MAX_BYTES + 64 * 1024) {
    return NextResponse.json({ ok: false, errors: { cv: "Please keep your résumé under 4 MB." } }, { status: 413 });
  }

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (clean(fd.get("website"), 200)) return NextResponse.json({ ok: true }); // honeypot

  const jobSlug = clean(fd.get("job"), 120);
  const job = jobs.find((j) => j.slug === jobSlug);
  const data = {
    name: clean(fd.get("name"), 120),
    email: clean(fd.get("email"), 200),
    phone: clean(fd.get("phone"), 40),
    location: clean(fd.get("location"), 120),
    role: job ? job.title : clean(fd.get("role"), 160),
    message: clean(fd.get("message"), 4000),
  };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "Please enter a valid email address.";

  const cv = fd.get("cv");
  let attachment: { filename: string; content: string } | null = null;
  if (!(cv instanceof File) || cv.size === 0) errors.cv = "Please attach your résumé.";
  else if (cv.size > MAX_BYTES) errors.cv = "Please keep your résumé under 4 MB.";
  else {
    const buf = new Uint8Array(await cv.arrayBuffer());
    const kind = fileKind(buf, cv.name);
    if (!kind) errors.cv = "Please upload a PDF or Word document.";
    else {
      const safe = `${data.name || "resume"}`.replace(/[^\w.-]+/g, "_").slice(0, 60);
      attachment = { filename: `${safe}-resume.${kind}`, content: Buffer.from(buf).toString("base64") };
    }
  }
  if (Object.keys(errors).length || !attachment) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const { RESEND_API_KEY, CONTACT_FROM } = process.env;
  const to = process.env.CAREERS_TO || process.env.CONTACT_TO;
  if (!RESEND_API_KEY || !CONTACT_FROM || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[apply] Email not configured — application received:", data, attachment.filename);
      return NextResponse.json({ ok: true });
    }
    console.error("[apply] RESEND_API_KEY / CONTACT_FROM / CONTACT_TO are not set.");
    return NextResponse.json({ ok: false, error: "Applications are temporarily unavailable." }, { status: 503 });
  }

  const rows = [
    ["Position", data.role || "General application"],
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Location", data.location || "—"],
  ]
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#667085">${k}</td><td style="padding:6px 0;color:#0b1220"><strong>${esc(v)}</strong></td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: to.split(",").map((s) => s.trim()),
      reply_to: data.email,
      subject: `Application: ${data.role || "General"} — ${data.name}`,
      html: `<div style="font-family:Inter,Arial,sans-serif;font-size:15px"><h2 style="margin:0 0 16px">New job application</h2><table>${rows}</table>${
        data.message ? `<p style="margin-top:20px;white-space:pre-wrap;line-height:1.6">${esc(data.message)}</p>` : ""
      }<p style="color:#667085">Résumé attached.</p></div>`,
      text: `Position: ${data.role || "General"}\n${data.name} <${data.email}>\nPhone: ${data.phone}\nLocation: ${data.location}\n\n${data.message}`,
      attachments: [attachment],
    }),
  });

  if (!res.ok) {
    console.error("[apply] Resend error", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "We couldn't send your application right now." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
