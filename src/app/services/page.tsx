import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { services } from "@/lib/content";
import { serviceDetails } from "@/lib/content-pages";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArrowRight, ArrowUpRight, Icon } from "@/components/Icons";
import { toneVars } from "@/lib/tones";

export const metadata: Metadata = {
  title: "Services",
  description:
    "IT consulting, cloud and infrastructure, data and AI, application development and IT staffing — engaged individually or as one integrated team.",
  alternates: { canonical: "/services" },
};

const engage = [
  { title: "Project delivery", body: "A defined scope, timeline and outcome, delivered end to end by our team." },
  { title: "Managed services", body: "We run and improve your platforms against agreed service levels." },
  { title: "Talent & team extension", body: "Vetted specialists or full teams who work as part of yours." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={["Everything you need to ", "build, run and grow."]}
        intro="Five capabilities that cover the full technology lifecycle — from strategy to steady-state operations, and the people in between. Use one, or bring us in as a single accountable partner."
        crumbs={[{ label: "Services", href: "/services" }]}
      >
        <Link href="/contact" className="btn btn-primary">
          Talk to an expert <ArrowRight />
        </Link>
      </PageHero>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <ul className="border-t border-line">
            {services.map((s, i) => (
              <li key={s.slug} className="border-b border-line" data-reveal>
                <Link
                  href={`/services/${s.slug}`}
                  style={toneVars(s.tone)}
                  className="group grid gap-6 py-10 transition-colors duration-500 md:grid-cols-12 md:items-center md:py-12"
                >
                  <span className="tone-text font-display text-[14px] font-bold tabular-nums md:col-span-1">0{i + 1}</span>
                  <div className="flex items-center gap-5 md:col-span-5">
                    <span className="tone-icon grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-[rotate] duration-500 ease-out-expo group-hover:-rotate-6">
                      <Icon name={s.icon} size={26} />
                    </span>
                    <h2 className="text-[clamp(1.4rem,1.1rem+1vw,2rem)] font-bold transition-colors duration-500 group-hover:text-[var(--ci)]">
                      {s.title}
                    </h2>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-[15.5px] leading-relaxed text-ink-2">{s.body}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {serviceDetails[s.slug].offerings.slice(0, 3).map((o) => (
                        <li key={o.title} className="tone-soft rounded-full px-3 py-1 text-[12.5px] font-medium">
                          {o.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="hidden justify-self-end md:col-span-1 md:grid">
                    <span className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-line-2 transition-[background-color,color,rotate] duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-[var(--c)] group-hover:text-white group-hover:ring-[var(--c)]">
                      <ArrowUpRight />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-tint py-24 md:py-32">
        <div className="container-x">
          <SectionHead eyebrow="Engagement" title="Work with us" accent="your way" intro="Every organization buys differently. Choose the model that fits your goals, budget and in-house capacity — and change it as you grow." />
          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {engage.map((e, i) => (
              <li key={e.title} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="rounded-3xl bg-white p-8 ring-1 ring-line">
                <span className="font-display text-[44px] font-extrabold leading-none tracking-[-0.04em] text-gradient">0{i + 1}</span>
                <h3 className="mt-6 text-[21px] font-bold">{e.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{e.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
