"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { services } from "@/lib/content";
import { ArrowUpRight, Icon } from "../Icons";

/** Bento layout per card on large screens (6-column grid). */
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export function WhatWeDo() {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);

  // Draw the connecting line as the grid scrolls through the viewport
  useEffect(() => {
    const el = wrap.current;
    const p = path.current;
    if (!el || !p) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      p.style.strokeDashoffset = "0";
      return;
    }
    let raf = 0;
    let active = false;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const prog = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.2)));
      p.style.strokeDashoffset = String(1 - prog);
    };
    const onScroll = () => {
      if (active && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      active = e.isIntersecting;
      if (active) onScroll();
    });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const spotlight = (e: React.PointerEvent<HTMLElement>) => {
    const t = e.currentTarget;
    const r = t.getBoundingClientRect();
    t.style.setProperty("--mx", `${e.clientX - r.left}px`);
    t.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

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
            <path
              ref={path}
              d="M2 6 C 20 2, 30 14, 50 8 S 92 2, 97 22 S 70 50, 50 50 S 4 46, 3 70 S 30 98, 50 94 S 96 90, 98 98"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray="1"
              style={{ strokeDashoffset: 1 }}
            />
          </svg>

          <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
            {services.map((s, i) => {
              const featured = s.icon === "talent";
              return (
                <div key={s.slug} data-reveal style={{ ["--d" as string]: `${i * 70}ms` }} className={`${spans[i]} ${featured ? "md:col-span-2" : ""}`}>
                <Link
                  href={`/services/${s.slug}`}
                  onPointerMove={spotlight}
                  className={`group relative isolate flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl p-7 transition-[box-shadow,translate] duration-500 ease-out-expo hover:-translate-y-1 md:p-8 ${
                    featured
                      ? "bg-ink text-white shadow-[0_30px_60px_-30px_rgb(11_18_32/0.5)]"
                      : "bg-surface shadow-card ring-1 ring-line hover:shadow-lift"
                  }`}
                >
                  {/* cursor spotlight */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), ${
                        featured ? "rgb(36 83 255 / 0.45)" : "rgb(36 83 255 / 0.09)"
                      }, transparent 65%)`,
                    }}
                  />
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-2xl transition-[background-color,color,rotate] duration-500 ease-out-expo group-hover:-rotate-6 ${
                        featured ? "bg-accent text-white" : "bg-accent-50 text-accent group-hover:bg-accent group-hover:text-white"
                      }`}
                    >
                      <Icon name={s.icon} size={26} />
                    </span>
                    <span className={`font-display text-[13px] font-semibold tabular-nums ${featured ? "text-white/40" : "text-muted/70"}`}>
                      0{i + 1}
                    </span>
                  </div>

                  <div className="mt-auto pt-10">
                    <h3 className={`text-[22px] font-bold md:text-[24px] ${featured ? "!text-white" : ""}`}>{s.title}</h3>
                    <p className={`mt-3 max-w-md text-[15px] leading-relaxed ${featured ? "text-white/70" : "text-muted"}`}>{s.body}</p>
                    <span
                      className={`mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold ${featured ? "text-white" : "text-ink"}`}
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
