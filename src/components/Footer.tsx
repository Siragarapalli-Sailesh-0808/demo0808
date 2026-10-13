import { Link } from "next-view-transitions";
import { site } from "@/lib/site";
import { industryGroups, services, solutions } from "@/lib/content";
import { Logo } from "./Logo";
import { Mail, Phone, Social } from "./Icons";
import { BackToTop } from "./BackToTop";

const company = [
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-tint pt-20">
      <div aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: "var(--grad-brand)" }} />
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">{site.description}</p>
            <ul className="mt-7 space-y-3 text-[15px]">
              <li>
                <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-3 text-ink-2 transition-colors hover:text-accent">
                  <Phone className="text-accent" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 text-ink-2 transition-colors hover:text-accent">
                  <Mail className="text-accent" /> {site.email}
                </a>
              </li>
            </ul>
            <ul className="mt-7 flex gap-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink-2 ring-1 ring-line transition-[background-color,color,translate] duration-300 hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#7c3aed,#2563eb)] hover:text-white hover:ring-transparent"
                  >
                    <Social name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            <FooterCol title="Services" links={services.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))} />
            <FooterCol title="Solutions" links={solutions.map((s) => ({ label: s.title, href: `/solutions/${s.slug}` }))} />
            <FooterCol title="Industries" links={industryGroups.map((g) => ({ label: g.label, href: `/industries#${g.key}` }))} />
            <FooterCol title="Company" links={company} />
          </nav>
        </div>

        <div className="mt-16 grid gap-8 border-t border-line-2/70 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {site.offices.map((o) => (
            <address key={o.country} className="not-italic">
              <p className="font-display text-[14px] font-semibold text-ink">{o.country}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                {o.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </address>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line-2/70 py-8 text-[13.5px] text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Security & Compliance"].map((l) => (
              <li key={l}>
                <Link href={`/${l.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className="transition-colors hover:text-ink">
                  {l}
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
