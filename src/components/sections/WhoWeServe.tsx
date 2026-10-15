import { Link } from "next-view-transitions";
import { industryGroups } from "@/lib/content";
import { ArrowRight, Check } from "../Icons";

/** Who we serve — three client groups side by side. */
export function WhoWeServe() {
  return (
    <section id="who-we-serve" className="relative py-24 md:py-28">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="eyebrow" data-reveal>
              Who we serve
            </p>
            <h2 className="h-section mt-4" data-reveal style={{ ["--d" as string]: "60ms" }}>
              Built around the clients we know best
            </h2>
          </div>
          <p className="max-w-xl text-[17px] leading-relaxed text-ink-2 lg:col-span-6" data-reveal style={{ ["--d" as string]: "120ms" }}>
            Large enterprises, government agencies and growing businesses each need something different from an IT
            partner. Here is how we help each of them.
          </p>
        </div>

        <ul className="mt-12 grid border-t border-navy md:grid-cols-3">
          {industryGroups.map((g, i) => (
            <li
              key={g.key}
              data-reveal
              style={{ ["--d" as string]: `${i * 60}ms` }}
              className={`flex flex-col border-b border-line py-8 md:border-b-0 md:py-10 ${i > 0 ? "md:border-l md:pl-8" : ""} ${i < 2 ? "md:pr-8" : ""}`}
            >
              <h3 className="text-[21px] font-semibold">{g.label}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{g.statement}</p>
              <ul className="mt-6 space-y-2.5">
                {g.sectors.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-[15px] text-ink-2">
                    <Check size={15} className="mt-[4px] shrink-0 text-brand-green" />
                    {s}
                  </li>
                ))}
              </ul>
              <Link
                href={`/industries#${g.key}`}
                className="mt-auto inline-flex items-center gap-2 pt-7 text-[14.5px] font-semibold text-accent hover:underline hover:underline-offset-4"
              >
                More about {g.label.toLowerCase()} <ArrowRight size={14} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Quiet diamond lattice (the logo's rotated-square motif) used as a panel backdrop. */
export function Art({ className = "" }: { kind?: string; fit?: string; className?: string }) {
  return (
    <svg aria-hidden className={`h-full w-full text-navy/[0.08] ${className}`}>
      <defs>
        <pattern id="mk-art-lattice" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect x="0.5" y="0.5" width="39" height="39" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mk-art-lattice)" />
    </svg>
  );
}
