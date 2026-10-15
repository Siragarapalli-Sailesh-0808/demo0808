import { Link } from "next-view-transitions";
import { solutions } from "@/lib/content";
import { ArrowRight, Check } from "../Icons";

/** Engagement models — four plain cards, left-aligned, no hover theatrics. */
export function WhatWeOffer() {
  return (
    <section id="what-we-offer" className="relative border-y border-line bg-tint py-24 md:py-28">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="eyebrow" data-reveal>
              Engagement models
            </p>
            <h2 className="h-section mt-4" data-reveal style={{ ["--d" as string]: "60ms" }}>
              How we work with you
            </h2>
          </div>
          <p className="max-w-xl text-[17px] leading-relaxed text-ink-2 lg:col-span-6" data-reveal style={{ ["--d" as string]: "120ms" }}>
            Bring in a single consultant, convert a contractor to a permanent hire, or hand us your databases. Every
            engagement is backed by our compliant hiring process and satisfaction guarantee.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {solutions.map((s, i) => (
            <li key={s.slug} data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
              <article className="flex h-full flex-col rounded-lg border border-line bg-white p-7">
                <h3 className="text-[19px] font-semibold leading-snug">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[14.5px] text-ink-2">
                      <Check size={15} className="mt-[3px] shrink-0 text-brand-green" />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link href={s.href} className="mt-auto inline-flex items-center gap-2 pt-7 text-[14.5px] font-semibold text-accent hover:underline hover:underline-offset-4">
                  Learn more<span className="sr-only"> about {s.title}</span> <ArrowRight size={14} />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
