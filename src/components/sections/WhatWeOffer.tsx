"use client";

import Link from "next/link";
import { useState } from "react";
import { solutions } from "@/lib/content";
import { ArrowRight, Check, Icon } from "../Icons";

export function WhatWeOffer() {
  const [active, setActive] = useState(0);

  return (
    <section id="what-we-offer" className="relative overflow-hidden bg-tint py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" />
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center" data-reveal>
            Solutions
          </p>
          <h2 className="h-section mt-4" data-reveal style={{ ["--d" as string]: "60ms" }}>
            What we <span className="accent-word">offer</span>
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-ink-2" data-reveal style={{ ["--d" as string]: "120ms" }}>
            Enterprise solutions built around complex operational and industry-specific challenges. Each one fits into
            your existing environment and is designed for continuity, efficiency and long-term value.
          </p>
        </div>

        {/* Desktop: expanding panels */}
        <div className="mt-16 hidden h-[540px] gap-4 lg:flex" data-reveal style={{ ["--d" as string]: "160ms" }}>
          {solutions.map((s, i) => {
            const on = i === active;
            return (
              <article
                key={s.slug}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                aria-expanded={on}
                className={`relative min-w-0 cursor-pointer overflow-hidden rounded-3xl outline-none transition-[flex-grow,background-color,box-shadow] duration-700 ease-out-expo ${
                  on
                    ? "bg-accent text-white shadow-[0_40px_80px_-40px_rgb(36_83_255/0.7)]"
                    : "bg-white text-ink ring-1 ring-line hover:ring-line-2"
                }`}
                style={{ flexGrow: on ? 2.6 : 1, flexBasis: 0 }}
              >
                {/* soft light in the active panel */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white blur-3xl transition-opacity duration-700 ${
                    on ? "opacity-25" : "opacity-0"
                  }`}
                />
                <div className="relative flex h-full w-full flex-col p-7 xl:p-8">
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-2xl transition-colors duration-700 ${
                        on ? "bg-white/15 text-white ring-1 ring-white/30" : "bg-accent-50 text-accent"
                      }`}
                    >
                      <Icon name={s.icon} size={26} />
                    </span>
                    <span className={`font-display text-[13px] font-semibold tabular-nums transition-opacity duration-500 ${on ? "text-white/50" : "opacity-0"}`}>
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className={`mt-8 font-bold leading-tight ${on ? "text-[26px]" : "text-[19px]"} ${on ? "!text-white" : ""}`}>{s.title}</h3>

                  <div
                    className={`mt-4 transition-[opacity,translate] duration-700 ease-out-expo ${
                      on ? "translate-y-0 opacity-100 delay-150" : "pointer-events-none translate-y-3 opacity-0"
                    }`}
                  >
                    <p className="max-w-md text-[15.5px] leading-relaxed text-white/80">{s.body}</p>
                    <ul className="mt-6 grid max-w-md gap-2.5">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-center gap-3 text-[15px] text-white">
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/20">
                            <Check size={12} />
                          </span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/solutions/${s.slug}`}
                    tabIndex={on ? 0 : -1}
                    className={`mt-auto inline-flex items-center gap-2 text-[14.5px] font-semibold transition-opacity duration-500 ${
                      on ? "text-white opacity-100" : "opacity-0"
                    }`}
                  >
                    Explore solution <ArrowRight />
                  </Link>

                  <div
                    aria-hidden
                    className={`absolute bottom-7 left-7 right-7 transition-[opacity,translate] duration-500 ease-out-expo xl:left-8 ${
                      on ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
                    }`}
                  >
                    <span
                      className="block font-display text-[88px] font-extrabold leading-none tracking-[-0.05em] text-transparent"
                      style={{ WebkitTextStroke: "1.5px var(--color-line-2)" }}
                    >
                      0{i + 1}
                    </span>
                    <span className="mt-3 flex items-center gap-2 text-[13.5px] font-medium text-muted">
                      {s.items.length} focus areas <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile & tablet: accordion */}
        <div className="mt-12 space-y-3 lg:hidden">
          {solutions.map((s, i) => {
            const on = i === active;
            return (
              <div
                key={s.slug}
                className={`overflow-hidden rounded-2xl transition-colors duration-500 ${on ? "bg-accent text-white" : "bg-white ring-1 ring-line"}`}
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-4 p-5 text-left"
                  aria-expanded={on}
                  onClick={() => setActive(on ? -1 : i)}
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${on ? "bg-white/15" : "bg-accent-50 text-accent"}`}>
                    <Icon name={s.icon} size={22} />
                  </span>
                  <span className="flex-1 font-display text-[17px] font-semibold leading-snug">{s.title}</span>
                  <span className={`text-2xl leading-none transition-transform duration-500 ${on ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="min-h-0">
                    <div className="px-5 pb-6">
                      <p className={`text-[15px] leading-relaxed ${on ? "text-white/80" : "text-muted"}`}>{s.body}</p>
                      <ul className="mt-4 space-y-2">
                        {s.items.map((it) => (
                          <li key={it} className="flex items-center gap-2.5 text-[14.5px]">
                            <Check size={14} /> {it}
                          </li>
                        ))}
                      </ul>
                      <Link href={`/solutions/${s.slug}`} className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold">
                        Explore solution <ArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
