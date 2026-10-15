import { Link } from "next-view-transitions";
import { services } from "@/lib/content";
import { ArrowUpRight, Icon } from "../Icons";
import { toneVars } from "@/lib/tones";

/** Bento layout per card on large screens (6-column grid). */
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6" data-reveal>
            <p className="eyebrow">Our services</p>
            <h2 className="h-section mt-4">
              What we <span className="accent-word">do</span>
            </h2>
          </div>
          <p className="max-w-xl text-[17px] leading-relaxed text-ink-2 lg:col-span-6" data-reveal style={{ ["--d" as string]: "100ms" }}>
            Five services from one accountable partner — engage us for a single hire, ongoing database support or
            a complete managed IT arrangement.
          </p>
        </div>

        <div className="relative mt-12 md:mt-16">
          <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
            {services.map((s, i) => {
              const featured = s.icon === "talent";
              return (
                <div key={s.slug} data-reveal style={{ ["--d" as string]: `${i * 70}ms` }} className={`${spans[i]} ${featured ? "md:col-span-2" : ""}`}>
                <Link
                  href={`/services/${s.slug}`}
                  style={{
                    ...toneVars(s.tone),
                    ...(featured ? { background: "#0d2b45" } : {}),
                  }}
                  className={`group relative isolate flex h-full min-h-[260px] flex-col overflow-hidden rounded-lg p-7 transition-[border-color,box-shadow] duration-300 md:p-8 ${
                    featured ? "text-white" : "border border-line bg-surface hover:border-line-2 hover:shadow-card"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-md ${
                        featured ? "bg-white/15 text-white ring-1 ring-white/30" : "tone-icon"
                      }`}
                    >
                      <Icon name={s.icon} size={26} />
                    </span>
                  </div>

                  <div className="mt-auto pt-10">
                    <h3 className={`text-[21px] font-semibold md:text-[22px] ${featured ? "!text-white" : ""}`}>{s.title}</h3>
                    <p className={`mt-3 max-w-md text-[15px] leading-relaxed ${featured ? "text-white/70" : "text-muted"}`}>{s.body}</p>
                    <span
                      className={`mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold ${featured ? "text-white" : "tone-text"}`}
                    >
                      Learn more
                      <ArrowUpRight className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
