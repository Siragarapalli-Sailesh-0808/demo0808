import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Internal endpoint for /email-request (staff email accounts and password resets).
 * Emails each request to EMAIL_REQUESTS_TO through Resend.
 *
 * Vercel → Settings → Environment Variables:
 *   EMAIL_REQUESTS_TO   where requests are sent (required; comma-separated for several people)
 *   EMAIL_REQUEST_CODE  optional access code staff must enter (blocks strangers who find the page)
 *   RESEND_API_KEY, CONTACT_FROM   already used by the contact form
 */

const hits = new Map<string, number[]>();
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
const domain = new URL(site.url).hostname.replace(/^www\./, "");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 8) return NextResponse.json({ ok: false, error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (clean(body.website, 200)) return NextResponse.json({ ok: true }); // honeypot

  const code = process.env.EMAIL_REQUEST_CODE;
  if (code && clean(body.code, 100) !== code) {
    return NextResponse.json({ ok: false, errors: { code: "That access code isn't correct." } }, { status: 403 });
  }

  const type = clean(body.type, 20) === "reset" ? "reset" : "new";
  const d = {
    fullName: clean(body.fullName, 120),
    username: clean(body.username, 64).toLowerCase().replace(/@.*$/, ""),
    existingEmail: clean(body.existingEmail, 200).toLowerCase(),
    jobTitle: clean(body.jobTitle, 120),
    recoveryEmail: clean(body.recoveryEmail, 200),
    startDate: clean(body.startDate, 20),
    requestedBy: clean(body.requestedBy, 120),
    requesterEmail: clean(body.requesterEmail, 200),
    notes: clean(body.notes, 2000),
  };

  const errors: Record<string, string> = {};
  if (d.fullName.length < 2) errors.fullName = "Please enter the employee's full name.";
  if (type === "new") {
    if (!/^[a-z0-9]+([._-][a-z0-9]+)*$/.test(d.username)) errors.username = "Use letters, numbers, dots or dashes only (e.g. john.smith).";
  } else if (!isEmail(d.existingEmail) || !d.existingEmail.endsWith(`@${domain}`)) {
    errors.existingEmail = `Enter the employee's @${domain} address.`;
  }
  if (d.recoveryEmail && !isEmail(d.recoveryEmail)) errors.recoveryEmail = "Please enter a valid email address.";
  if (d.requestedBy.length < 2) errors.requestedBy = "Please enter your name.";
  if (!isEmail(d.requesterEmail)) errors.requesterEmail = "Please enter a valid email address.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const { RESEND_API_KEY, CONTACT_FROM, EMAIL_REQUESTS_TO } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM || !EMAIL_REQUESTS_TO) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[email-request] Email not configured — request received:", type, d);
      return NextResponse.json({ ok: true });
    }
    console.error("[email-request] RESEND_API_KEY / CONTACT_FROM / EMAIL_REQUESTS_TO are not set.");
    return NextResponse.json({ ok: false, error: "This form is temporarily unavailable." }, { status: 503 });
  }

  const address = type === "new" ? `${d.username}@${domain}` : d.existingEmail;
  const title = type === "new" ? "New email account" : "Password reset";
  const rows: [string, string][] = [
    ["Request", title],
    ["Employee", d.fullName],
    [type === "new" ? "Requested address" : "Account", address],
    ...(type === "new" ? ([["Job title", d.jobTitle || "—"], ["Start date", d.startDate || "—"]] as [string, string][]) : []),
    ["Recovery email", d.recoveryEmail || "—"],
    ["Requested by", `${d.requestedBy} <${d.requesterEmail}>`],
    ["Send login details to", site.email],
  ];
  const steps =
    type === "new"
      ? [
          `Check ${address} is free, then buy/assign the mailbox`,
          `Create the user (${d.fullName})${d.recoveryEmail ? ` and add recovery email ${d.recoveryEmail}` : ""}`,
          "Set a temporary password (change required at first sign-in)",
          `Email the address to ${site.email}; send the temporary password separately`,
        ]
      : [`Reset the password for ${address}`, `Email ${site.email} that it's done; send the new temporary password separately`];

  const html = `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;color:#0d2b45">
<h2 style="margin:0 0 16px">${esc(title)} — ${esc(address)}</h2>
<table>${rows.map(([k, v]) => `<tr><td style="padding:5px 16px 5px 0;color:#5b6b7b">${esc(k)}</td><td style="padding:5px 0"><strong>${esc(v)}</strong></td></tr>`).join("")}</table>
${d.notes ? `<p style="margin-top:16px;white-space:pre-wrap;line-height:1.6">${esc(d.notes)}</p>` : ""}
<h3 style="margin:24px 0 8px">To do</h3><ol>${steps.map((s) => `<li style="margin:4px 0">${esc(s)}</li>`).join("")}</ol></div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: EMAIL_REQUESTS_TO.split(",").map((s) => s.trim()),
      reply_to: d.requesterEmail,
      subject: `[Email request] ${title}: ${address}`,
      html,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${d.notes}\n\nTo do:\n${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}`,
    }),
  });
  if (!res.ok) {
    const raw = await res.text();
    console.error("[email-request] Resend error", res.status, raw);
    // Internal page: show the email service's reason (addresses masked) so setup problems are easy to fix.
    let reason = "";
    try {
      reason = String(JSON.parse(raw).message ?? "");
    } catch {}
    reason = reason.replace(/[^\s@()<>]+@[^\s@()<>]+/g, "***").slice(0, 300);
    return NextResponse.json(
      { ok: false, error: `We couldn't send your request right now (email service said: ${reason || `error ${res.status}`}).` },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
