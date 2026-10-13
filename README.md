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
| **Job openings** | `src/lib/jobs.ts` — copy the example, fill it in, push. Each job gets its own page and Google for Jobs data. |
| Logo files | `public/brand/` (`logo.svg`, `logo-white.svg`, `logo-navy.svg`, `mark.svg`) |
| Redirects from old WordPress URLs | `next.config.ts` |

Empty `socials` / `whatsapp` values hide those buttons everywhere.

## Forms (contact + job applications)

Both forms email you through [Resend](https://resend.com). Applications arrive with the résumé attached
(PDF/DOC/DOCX, max 4 MB, file type checked on the server). Spam protection: hidden honeypot + rate limit.

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
5. Set up the Resend environment variables (above) and send a test from both forms on the preview link.

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
