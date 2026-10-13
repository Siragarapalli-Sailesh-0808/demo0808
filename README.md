# Company Website — Phases 1 & 2

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · OGL shader · Lenis smooth scroll.
Light theme only. Typography: Plus Jakarta Sans (headings) + Inter (body), self-hosted.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project → Import** the repo. Framework is detected automatically; no settings needed.
3. After you connect your domain, update `url` in `src/lib/site.ts` so the sitemap, canonical links and social previews use it.

## Contact form setup (do this once on Vercel)

The form at `/contact` emails each enquiry to you through [Resend](https://resend.com) (free tier is plenty).

1. Create a Resend account and verify your company domain.
2. In Vercel → Project → **Settings → Environment Variables**, add the three values from `.env.example`:
   `RESEND_API_KEY`, `CONTACT_FROM` (an address on your verified domain) and `CONTACT_TO` (where enquiries should land).
3. Redeploy. Replies go straight to the visitor (their address is set as reply-to).

Without these values the form shows a friendly "temporarily unavailable — email us" message in production;
in local development it simply logs the enquiry to the terminal. Spam protection: hidden honeypot field + basic rate limit.

## Where to edit things

| What | File |
|---|---|
| Company name, logo mark, phone, **WhatsApp number**, email, offices, socials | `src/lib/site.ts` |
| Jobs in the "Now hiring" top bar, home-page stats | `src/lib/content.ts` (`openRoles`, `stats`) |
| Brand gradient + per-service colours | `src/app/globals.css` (`--grad-brand`) and `src/lib/tones.ts` |
| Home page copy (services, solutions, industries, case studies, partner tiles) | `src/lib/content.ts` |
| Inner page copy (service/solution details, FAQs, industries, About, contact options) | `src/lib/content-pages.ts` |
| Colours, fonts, spacing tokens | `src/app/globals.css` (`@theme` block) |
| Logo (placeholder until the real one arrives) | `src/components/Logo.tsx` |
| SEO defaults (title, description, keywords) | `src/app/layout.tsx` |
| Pages listed in the sitemap | `src/app/sitemap.ts` |

## Home page sections

`src/components/sections/`

1. **Hero** — live "liquid light" WebGL shader + floating cards that follow the mouse
2. **What we do** — 5 service cards (bento), cursor spotlight, connecting line that draws on scroll
3. **What we offer** — 4 solution panels that expand on hover (accordion on mobile)
4. **Who we serve** — 4 industry groups, auto-playing tabs with a wipe transition
5. **Case studies** — 3 sample stories with an animated dashboard
6. **Partnerships / accreditations / memberships** — placeholder logo tiles
7. **Call to action** — drifting light background, magnetic button
8. **Footer** — links, contact, US + India offices, legal links

## Performance safeguards

- No CSS blur filters or backdrop blur anywhere: soft glows are radial gradients (blurs were the main cause of stuttery scrolling).
- Looping animations pause automatically when their section is off-screen; the job ticker pauses once tucked away.
- The hero shader draws at most ~20fps while the page is scrolling, and phones use a static gradient instead.

- Shader starts only after the page has loaded, renders at reduced resolution, pauses off-screen and in hidden tabs, runs at 30fps on phones.
- Devices without a real GPU, low-power devices and "reduce motion" users get a single still frame.
- Smooth scrolling is desktop-only (phones keep native scrolling).
- Animations use transform/opacity only; no layout shift (CLS ≈ 0).
- First-load JavaScript: ~118 KB.

## SEO included

Static pre-rendering, per-page metadata, Open Graph + Twitter cards, auto-generated social image,
`sitemap.xml`, `robots.txt`, Organization + WebSite JSON-LD structured data, semantic headings, skip link.

## Pages

| Route | What's on it |
|---|---|
| `/` | Home (sections above) |
| `/about` | Stats, story, mission & vision, values, how we work, leadership, offices |
| `/services` + 5 detail pages | Capabilities, engagement models (staffing), approach timeline, outcomes, FAQ, related services |
| `/solutions` + 4 detail pages | Capabilities, outcomes, supporting services, other solutions |
| `/industries` | Sticky section nav; challenges and how we help for each industry group |
| `/contact` | Enquiry form, direct contact, offices, what happens next |

Every page has its own title, description, canonical URL, breadcrumbs (with structured data),
and the sitemap lists them all. Service pages also publish Service + FAQ structured data for rich Google results.

## Not built yet (next phase)

Insights (blog + case-study articles), Careers (blank until content is provided), and the legal pages
(Privacy, Terms, Cookies, Security). Links to these currently show the custom "page on its way" screen.
