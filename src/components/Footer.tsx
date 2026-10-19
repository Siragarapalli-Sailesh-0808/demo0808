import { Link } from "next-view-transitions";
import { site } from "@/lib/site";
import { industryGroups, services } from "@/lib/content";
import { Logo } from "./Logo";
import { Mail, Social } from "./Icons";
import { BackToTop } from "./BackToTop";

const company = [
  { label: "About us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "E-Verify", href: "/e-verify" },
  { label: "Contact", href: "/contact" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Equal Opportunity Employer", href: "/equal-opportunity" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-tint pt-20">
      <div aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: "var(--grad-brand)" }} />
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo imgClassName="h-[72px] md:h-20" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
              The right people, with the right skills, at the right price. IT staffing, database administration, ERP and
              managed IT services since {site.founded}.
            </p>
            <ul className="mt-7 space-y-3 text-[15px]">
              {site.emails.map((e) => (
                <li key={e}>
                  <a href={`mailto:${e}`} className="inline-flex items-center gap-3 text-ink-2 transition-colors hover:text-accent">
                    <Mail className="text-accent" /> {e}
                  </a>
                </li>
              ))}
            </ul>
            {site.socials.length > 0 && (
              <ul className="mt-7 flex gap-2">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink-2 ring-1 ring-line transition-[background-color,color,translate] duration-300 hover:-translate-y-0.5 hover:bg-navy hover:text-white hover:ring-transparent"
                    >
                      <Social name={s.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <FooterCol title="Services" links={services.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))} />
            <FooterCol title="Who we serve" links={industryGroups.map((g) => ({ label: g.label, href: `/industries#${g.key}` }))} />
            <FooterCol title="Company" links={company} />
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line-2/70 py-8 text-[13.5px] text-muted md:flex-row md:items-center md:justify-between">
          <div>
            <p>
              © {year} {site.legalName} All rights reserved.
            </p>
            {site.everify.enabled && (
              <p className="mt-1 text-[12px]">E-Verify® is a registered trademark of the U.S. Department of Homeland Security.</p>
            )}
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BackToTop />
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="font-display text-[14px] font-semibold text-ink">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[14px] leading-snug text-muted transition-colors hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
