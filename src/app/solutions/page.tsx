import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { solutions } from "@/lib/content";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArrowRight, ArrowUpRight, Check, Icon } from "@/components/Icons";
import { toneVars } from "@/lib/tones";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Enterprise solutions for digital operations, supply chain and asset intelligence, industry platforms and delivery accelerators.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={["Solutions built for ", "complex operations."]}
        intro="Proven answers to the operational and industry-specific challenges enterprises face most. Each one fits into your existing environment and is designed for continuity, efficiency and long-term value."
        crumbs={[{ label: "Solutions", href: "/solutions" }]}
      >
        <Link href="/contact" className="btn btn-primary">
          Discuss your challenge <ArrowRight />
        </Link>
      </PageHero>

      <section className="pb-24 md:pb-32">
        <div className="container-x grid gap-5 md:grid-cols-2">
          {solutions.map((s, i) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              data-reveal
              style={{ ["--d" as string]: `${(i % 2) * 90}ms`, ...toneVars(s.tone) }}
              className="group relative isolate flex flex-col overflow-hidden rounded-[28px] bg-surface p-8 shadow-card ring-1 ring-line transition-[box-shadow,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_var(--c)] hover:ring-[var(--c2)] md:p-10"
            >
              <span
                aria-hidden
                className="orb -right-28 -top-28 -z-10 h-80 w-80 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ ["--orb" as string]: "var(--cs)" }}
              />
              <div className="flex items-start justify-between">
                <span className="tone-icon grid h-14 w-14 place-items-center rounded-2xl">
                  <Icon name={s.icon} size={26} />
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-line-2 transition-[background-color,color,rotate] duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-ink group-hover:text-white group-hover:ring-ink">
                  <ArrowUpRight />
                </span>
              </div>
              <h2 className="mt-10 text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] font-bold">{s.title}</h2>
              <p className="mt-3 max-w-lg text-[15.5px] leading-relaxed text-muted">{s.body}</p>
              <ul className="mt-8 grid gap-2.5 border-t border-line pt-6 sm:grid-cols-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[14.5px] text-ink-2">
                    <Check size={15} className="tone-text mt-1 shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
