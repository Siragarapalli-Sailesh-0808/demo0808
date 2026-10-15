# M & K Technovations Inc. — website

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Lenis smooth scroll. Light theme only.
Typography: Plus Jakarta Sans (headings) + Inter (body), self-hosted. Replaces the WordPress site at mandkstaffing.com.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Where to edit things

| What | File |
| --- | --- |
| Phone, emails, address, social links, WhatsApp | `src/lib/site.ts` |
| Home page content, services, engagement models, stats | `src/lib/content.ts` |
| Service pages, About page, "Who we serve" details | `src/lib/content-pages.ts` |
| **Job openings** | A Google Sheet — see "Posting jobs" below. No code changes needed. |
| Logo files | `public/brand/` (`logo.svg`, `logo-white.svg`, `logo-navy.svg`, `mark.svg`) |
| Redirects from old WordPress URLs | `next.config.ts` |

Empty `socials` / `whatsapp` values hide those buttons everywhere.

## Posting jobs (Google Sheet — free, no backend)

The careers page reads open jobs from a Google Sheet. Visitors only view jobs; there is no apply form.

**One-time setup**
1. In Google Sheets: **File → Import → Upload** `docs/jobs-template.csv` (choose "Replace spreadsheet").
2. **File → Share → Publish to web** → pick the jobs sheet (not "Entire document") → **Comma-separated values (.csv)** → **Publish**. Copy the link.
3. Paste that link into `jobsSheetUrl` in `src/lib/site.ts` (or set `JOBS_SHEET_URL` in Vercel → Settings → Environment Variables) and redeploy once.

**Day to day (the admin)**
- Add a row per job. Required: **Title** and **Status = Open**.
- **Responsibilities / Requirements**: one item per line inside the cell (Alt+Enter on Windows, Ctrl+Option+Enter on Mac).
- **Posted / Closing date**: `YYYY-MM-DD`. After the closing date the job hides itself.
- To take a job down, set **Status = Closed** (or delete the row).
- Changes appear on the website within about 5–10 minutes (Google updates the published file every few minutes, and the site re-checks every 5 minutes).
- Everything in the sheet is public once published — don't add private notes or pay rates you don't want shown.

Each open job gets its own page (`/careers/<job-title-location>`), appears in the "Now hiring" bar at the top of every page, in the sitemap, and is marked up for Google's job search.

## Contact form

The contact form emails you through [Resend](https://resend.com). Spam protection: hidden honeypot + rate limit.

1. Create a Resend account and add the domain `mandkstaffing.com`. Resend gives you a few DNS records
   (on the `send.` subdomain and `resend._domainkey`). **Add them alongside your existing records — they
   don't replace your current email records.**
2. In Vercel → Project → **Settings → Environment Variables**, add the values from `.env.example`.
3. Redeploy.

## Going live on mandkstaffing.com — cutover checklist

The domain's **email (mandip@ / deep@mandkstaffing.com) must keep working**. Only the website records change.

**Before**
1. Back up the WordPress site (files + database) from the current host. Keep that hosting for 2–4 weeks after launch.
2. Find out where DNS is managed (registrar or host). Screenshot every existing DNS record.
3. Lower the TTL of the website records (`@` A record and `www`) to 300 seconds a day ahead.
4. In Vercel → Project → Settings → **Domains**, add `mandkstaffing.com` and `www.mandkstaffing.com`.
   Vercel shows the exact records to use.
5. Set up the Resend environment variables (above) and send a test from the contact form on the preview link.

**Cutover — change only these**
- `@` (apex) **A** record → the IP Vercel shows (currently `76.76.21.21`)
- `www` **CNAME** → the value Vercel shows (e.g. `cname.vercel-dns.com`)

**Do not touch:** MX records, SPF (`TXT v=spf1 …`), DKIM, DMARC, autodiscover/mail records, or anything
else unrelated to the website. Don't switch nameservers to Vercel — that would move email records too.

**After**
1. Check https://mandkstaffing.com and https://www.mandkstaffing.com load with a padlock (Vercel issues SSL automatically).
2. Send and receive a test email on mandip@ and deep@.
3. Spot-check old URLs redirect, e.g. `/about-us/`, `/contact-us/`, `/services/support-services/`, `/jobs/`.
4. Google Search Console: verify the domain, submit `https://mandkstaffing.com/sitemap.xml`, and use URL Inspection on the home page.
5. Update the website link on Google Business Profile, LinkedIn and directories if needed.
6. After 2–4 weeks with no issues, cancel the old WordPress hosting (not the domain or email!).
