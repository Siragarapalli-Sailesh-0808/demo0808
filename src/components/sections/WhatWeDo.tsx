"use client";

import { Link } from "next-view-transitions";
import { useEffect, useRef } from "react";
import { services } from "@/lib/content";
import { ArrowUpRight, Icon } from "../Icons";
import { toneVars } from "@/lib/tones";
import { cardLeave, cardMove } from "@/lib/pointer";

/** Bento layout per card on large screens (6-column grid). */
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export function WhatWeDo() {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);

  // Draw the connecting line once when the grid enters view (one CSS transition, no per-scroll work)
  useEffect(() => {
    const el = wrap.current;
    const p = path.current;
    if (!el || !p) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        p.style.strokeDashoffset = "0";
        io.disconnect();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="what-we-do" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6" data-reveal>
            <p className="eyebrow">Capabilities</p>
            <h2 className="h-section mt-4">
              What we <span className="accent-word">do</span>
            </h2>
          </div>
          <p className="max-w-xl text-[17px] leading-relaxed text-ink-2 lg:col-span-6" data-reveal style={{ ["--d" as string]: "100ms" }}>
            End-to-end technology capability that drives change, keeps operations reliable and sustains performance.
            Engage us for a single capability, or as one integrated team across all five.
          </p>
        </div>

        <div ref={wrap} className="relative mt-14 md:mt-20">
          {/* Connecting line — sits behind the cards and shows through the gaps */}
          <svg
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -inset-y-10 hidden h-[calc(100%+80px)] w-[calc(100%+48px)] lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M2 6 C 20 2, 30 14, 50 8 S 92 2, 97 22 S 70 50, 50 50 S 4 46, 3 70 S 30 98, 50 94 S 96 90, 98 98"
              fill="none"
              stroke="var(--color-line-2)"
              strokeWidth="1.2"
              strokeDasharray="3 5"
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id="wwd-line" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#7c3aed" />
                <stop offset=".5" stopColor="#2563eb" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <path
              ref={path}
              d="M2 6 C 20 2, 30 14, 50 8 S 92 2, 97 22 S 70 50, 50 50 S 4 46, 3 70 S 30 98, 50 94 S 96 90, 98 98"
              fill="none"
              stroke="url(#wwd-line)"
              strokeWidth="2.2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray="1"
              style={{ strokeDashoffset: 1, transition: "stroke-dashoffset 2.4s cubic-bezier(.16,1,.3,1) .2s" }}
            />
          </svg>

          <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
            {services.map((s, i) => {
              const featured = s.icon === "talent";
              return (
                <div key={s.slug} data-reveal style={{ ["--d" as string]: `${i * 70}ms` }} className={`${spans[i]} ${featured ? "md:col-span-2" : ""}`}>
                <Link
                  href={`/services/${s.slug}`}
                  data-cursor="Explore"
                  onPointerMove={cardMove}
                  onPointerLeave={cardLeave}
                  style={{
                    ...toneVars(s.tone),
                    ...(featured ? { background: "linear-gradient(140deg, #4c1d95 0%, #3730a3 45%, #0e7490 100%)" } : {}),
                  }}
                  className={`tilt-card group relative isolate flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl p-7 hover:-translate-y-1 md:p-8 ${
                    featured
                      ? "text-white shadow-[0_40px_70px_-34px_rgb(76_29_149/0.75)]"
                      : "bg-surface shadow-card ring-1 ring-line hover:shadow-[0_30px_60px_-30px_var(--c)] hover:ring-[var(--c2)]"
                  }`}
                >
                  <span aria-hidden className="glow-border" style={featured ? { ["--glow" as string]: "rgb(255 255 255 / 0.85)" } : undefined} />
                  {/* cursor spotlight */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), ${
                        featured ? "rgb(255 255 255 / 0.16)" : "var(--cs)"
                      }, transparent 65%)`,
                    }}
                  />
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-2xl transition-[rotate] duration-500 ease-out-expo group-hover:-rotate-6 ${
                        featured ? "bg-white/15 text-white ring-1 ring-white/30" : "tone-icon"
                      }`}
                    >
                      <Icon name={s.icon} size={26} />
                    </span>
                    <span className={`font-display text-[13px] font-bold tabular-nums ${featured ? "text-white/50" : "tone-text"}`}>
                      0{i + 1}
                    </span>
                  </div>

                  <div className="mt-auto pt-10">
                    <h3 className={`text-[22px] font-bold md:text-[24px] ${featured ? "!text-white" : ""}`}>{s.title}</h3>
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
