import { Link } from "next-view-transitions";
import { site } from "@/lib/site";
import { ArrowRight, Phone } from "../Icons";

const paths = [
  { title: "Hire IT talent", body: "Contract, contract-to-hire and direct-hire professionals", href: "/services/it-staffing" },
  { title: "Database administration", body: "Oracle, SQL Server, DB2, MySQL — 100% US-based DBAs", href: "/services/database-administration" },
  { title: "Managed IT support", body: "Help desk, networks and security for growing businesses", href: "/services/managed-it-support" },
];

/** Diamond lattice drawn from the logo's rotated-square motif. Static SVG, no animation. */
function Lattice({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} width="100%" height="100%">
      <defs>
        <pattern id="mk-lattice" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect x="0.5" y="0.5" width="43" height="43" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mk-lattice)" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-white pb-20 pt-40 md:pb-28 md:pt-48">

      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="eyebrow fade-up">IT staffing &amp; technology services since {site.founded}</p>

          <h1
            className="fade-up mt-6 max-w-[15ch] text-[clamp(2.5rem,1.5rem+3.6vw,4.1rem)] font-semibold leading-[1.06] tracking-[-0.03em]"
            style={{ ["--d" as string]: "80ms" }}
          >
            The right people, with the right skills, at the right price.
          </h1>

          <p className="fade-up mt-7 max-w-[38rem] text-[17.5px] leading-relaxed text-ink-2 md:text-[19px]" style={{ ["--d" as string]: "160ms" }}>
            IT staff augmentation, 100% US-based database administration, ERP support and managed IT for enterprises and
            government agencies — from our headquarters in Harrisburg, Pennsylvania.
          </p>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "240ms" }}>
            <Link href="/contact" className="btn btn-primary h-[52px] px-7 text-[15.5px]">
              Talk to our team <ArrowRight />
            </Link>
            <Link href="/services" className="btn btn-ghost h-[52px] px-7 text-[15.5px]">
              View our services
            </Link>
          </div>

          <ul className="fade-up mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[14.5px] font-medium text-ink-2" style={{ ["--d" as string]: "320ms" }}>
            {["Background-checked professionals", "In-house compliance officer", ...(site.everify.enabled ? ["E-Verify participating employer"] : [])].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                  <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="var(--color-brand-green)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-up lg:col-span-5" style={{ ["--d" as string]: "200ms" }}>
          <div className="relative overflow-hidden rounded-lg bg-navy text-white shadow-[0_30px_60px_-30px_rgb(13_43_69/0.55)]">
            <Lattice className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 text-white/[0.07]" />
            <div aria-hidden className="h-1" style={{ background: "var(--grad-brand)" }} />
            <div className="relative p-7 md:p-9">
              <h2 className="font-display text-[22px] font-semibold !text-white">How can we help?</h2>
              <ul className="mt-5 divide-y divide-white/12 border-y border-white/12">
                {paths.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="group flex items-center justify-between gap-6 py-5 transition-colors">
                      <span>
                        <span className="block font-display text-[17px] font-semibold text-white group-hover:underline group-hover:underline-offset-4">
                          {p.title}
                        </span>
                        <span className="mt-1 block text-[14px] leading-snug text-white/65">{p.body}</span>
                      </span>
                      <ArrowRight className="shrink-0 text-[#7cc4ec] transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
              <a href={`tel:${site.phoneHref}`} className="mt-6 inline-flex items-center gap-3 text-[15px] text-white/80 hover:text-white">
                <Phone className="text-[#7cc4ec]" />
                Prefer to talk? <span className="font-semibold text-white">{site.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
