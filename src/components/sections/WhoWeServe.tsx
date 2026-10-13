"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { industryGroups } from "@/lib/content";
import { ArrowRight } from "../Icons";

const DURATION = 7000;

export function WhoWeServe() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    if (i === active) return;
    setPrev(active);
    setActive(i);
  };

  const running = auto && visible && !paused;

  return (
    <section id="who-we-serve" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center" data-reveal>
            Industries
          </p>
          <h2 className="h-section mt-4" data-reveal style={{ ["--d" as string]: "60ms" }}>
            Who we <span className="accent-word">serve</span>
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-ink-2" data-reveal style={{ ["--d" as string]: "120ms" }}>
            Enterprises and institutions across regulated, asset-intensive and growth-focused sectors. We bring deep
            familiarity with complex operations, regulatory landscapes and large-scale delivery.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-14"
          data-reveal
          style={{ ["--d" as string]: "160ms" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative h-[600px] overflow-hidden rounded-[28px] bg-tint ring-1 ring-line sm:h-[540px] md:h-[520px]" role="tabpanel" aria-live="polite">
            {industryGroups.map((g, i) => {
              const state = i === active ? "active" : i === prev ? "prev" : "idle";
              return (
                <div
                  key={g.key}
                  id={`panel-${g.key}`}
                  aria-hidden={state !== "active"}
                  className="absolute inset-0"
                  style={{
                    zIndex: state === "active" ? 2 : state === "prev" ? 1 : 0,
                    clipPath: state === "idle" ? "inset(0 0 0 100%)" : "inset(0 0 0 0)",
                    transition: state === "active" ? "clip-path 1.1s cubic-bezier(.76,0,.24,1)" : "none",
                  }}
                >
                  <Slide group={g} on={state === "active"} />
                </div>
              );
            })}
          </div>

          <div role="tablist" aria-label="Industry groups" className="-mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0">
            {industryGroups.map((g, i) => {
              const on = i === active;
              return (
                <button
                  key={g.key}
                  role="tab"
                  aria-selected={on}
                  aria-controls={`panel-${g.key}`}
                  onClick={() => go(i)}
                  className="group min-w-[200px] snap-start text-left md:min-w-0"
                >
                  <span className="relative block h-[3px] overflow-hidden rounded-full bg-line">
                    {on && (
                      <span
                        key={active}
                        className="absolute inset-0 origin-left"
                        style={{
                          background: "var(--grad-brand)",
                          ...(auto
                            ? { animation: `progress ${DURATION}ms linear both`, animationPlayState: running ? "running" : "paused" }
                            : {}),
                        }}
                        onAnimationEnd={() => go((active + 1) % industryGroups.length)}
                      />
                    )}
                  </span>
                  <span
                    className={`mt-4 block font-display text-[15px] font-semibold leading-snug transition-colors duration-300 ${
                      on ? "text-[#5b21b6]" : "text-muted group-hover:text-ink"
                    }`}
                  >
                    {g.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide({ group, on }: { group: (typeof industryGroups)[number]; on: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-white via-tint to-tint-2">
      <div aria-hidden className="absolute -right-10 top-0 h-full w-full opacity-40 md:w-[62%] md:opacity-100">
        <Art kind={group.art} />
      </div>
      <div aria-hidden className="absolute inset-0 bg-white/75 md:bg-transparent md:bg-gradient-to-r md:from-white md:via-white/70 md:to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-7 md:p-12">
        <div className="max-w-2xl">
          <p
            className={`text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[#6d28d9] transition-[opacity,translate] duration-700 ease-out-expo ${
              on ? "translate-y-0 opacity-100 delay-500" : "translate-y-3 opacity-0"
            }`}
          >
            {group.label}
          </p>
          <p
            className={`mt-4 font-display text-[clamp(1.4rem,1.05rem+1.3vw,2.1rem)] font-semibold leading-[1.18] tracking-[-0.02em] text-ink transition-[opacity,translate] duration-1000 ease-out-expo ${
              on ? "translate-y-0 opacity-100 delay-[600ms]" : "translate-y-4 opacity-0"
            }`}
          >
            {group.statement}
          </p>
        </div>

        <div>
          <p className="text-[13px] font-semibold text-muted">Sectors we serve</p>
          <ul className="mt-3 flex max-w-3xl flex-wrap gap-2">
            {group.sectors.map((s, i) => (
              <li
                key={s}
                className={`rounded-full bg-white px-4 py-2 text-[14px] font-medium text-ink shadow-card ring-1 ring-line transition-[opacity,translate] duration-700 ease-out-expo ${
                  on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: on ? `${700 + i * 60}ms` : "0ms" }}
              >
                {s}
              </li>
            ))}
          </ul>
          <Link
            href={`/industries#${group.key}`}
            tabIndex={on ? 0 : -1}
            className="link-arrow mt-6 !text-[#5b21b6]"
          >
            View industry expertise <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Lightweight generative SVG art — one motif per industry group. */
export function Art({ kind, fit = "slice" }: { kind: "grid" | "columns" | "waves" | "orbit"; fit?: "slice" | "meet" }) {
  const par = (slice: string) => (fit === "meet" ? "xMidYMid meet" : slice);
  const stroke = "rgb(36 83 255 / 0.28)";
  if (kind === "grid") {
    const cells = [];
    for (let y = 0; y < 8; y++)
      for (let x = 0; x < 10; x++) {
        const hot = (x * 7 + y * 3) % 11 === 0;
        cells.push(
          <rect
            key={`${x}-${y}`}
            x={x * 64 + 8}
            y={y * 64 + 8}
            width={48}
            height={48}
            rx={10}
            fill={hot ? "rgb(36 83 255 / 0.85)" : "rgb(255 255 255 / 0.7)"}
            stroke={hot ? "none" : stroke}
          />,
        );
      }
    return (
      <svg viewBox="0 0 640 520" preserveAspectRatio={par("xMaxYMid slice")} className="h-full w-full">
        {cells}
      </svg>
    );
  }
  if (kind === "columns") {
    return (
      <svg viewBox="0 0 640 520" preserveAspectRatio={par("xMaxYMax slice")} className="h-full w-full">
        <path d="M60 150 L340 40 L620 150 Z" fill="rgb(255 255 255 / 0.8)" stroke={stroke} strokeWidth="2" />
        <rect x="60" y="150" width="560" height="22" fill="rgb(36 83 255 / 0.85)" />
        {Array.from({ length: 7 }).map((_, i) => (
          <g key={i}>
            <rect x={90 + i * 76} y={190} width={40} height={250} rx={6} fill="rgb(255 255 255 / 0.85)" stroke={stroke} strokeWidth="2" />
            <line x1={103 + i * 76} x2={103 + i * 76} y1={205} y2={425} stroke={stroke} />
            <line x1={117 + i * 76} x2={117 + i * 76} y1={205} y2={425} stroke={stroke} />
          </g>
        ))}
        <rect x="40" y="450" width="600" height="18" fill="rgb(255 255 255 / 0.9)" stroke={stroke} strokeWidth="2" />
        <rect x="20" y="468" width="640" height="18" fill="rgb(36 83 255 / 0.2)" />
      </svg>
    );
  }
  if (kind === "waves") {
    return (
      <svg viewBox="0 0 640 520" preserveAspectRatio={par("xMaxYMid slice")} className="h-full w-full">
        {Array.from({ length: 14 }).map((_, i) => {
          const y = 60 + i * 30;
          const a = 26 + (i % 4) * 8;
          return (
            <path
              key={i}
              d={`M0 ${y} C 120 ${y - a}, 200 ${y + a}, 320 ${y} S 520 ${y - a}, 640 ${y}`}
              fill="none"
              stroke={i === 6 ? "rgb(36 83 255 / 0.9)" : stroke}
              strokeWidth={i === 6 ? 3 : 1.6}
            />
          );
        })}
        <circle cx="320" cy="240" r="9" fill="#2453ff" />
        <circle cx="320" cy="240" r="22" fill="none" stroke="rgb(36 83 255 / 0.4)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 640 520" preserveAspectRatio={par("xMaxYMid slice")} className="h-full w-full">
      {[70, 130, 190, 250].map((r, i) => (
        <circle key={r} cx="400" cy="260" r={r} fill="none" stroke={stroke} strokeWidth="1.6" strokeDasharray={i % 2 ? "4 8" : undefined} />
      ))}
      <circle cx="400" cy="260" r="34" fill="rgb(36 83 255 / 0.9)" />
      {[
        [470, 260, 10],
        [400, 130, 8],
        [210, 260, 12],
        [577, 172, 9],
        [312, 437, 11],
        [520, 410, 7],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? "#fff" : "#2453ff"} stroke="#2453ff" strokeWidth="2" />
      ))}
    </svg>
  );
}
