"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/content";
import { toneVars } from "@/lib/tones";

/** Animated counters that count up once when scrolled into view. */
export function Stats() {
  return (
    <section aria-label="Key figures" className="relative z-10 -mt-10 md:-mt-16">
      <div className="container-x">
        <ul
          className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-line shadow-[0_30px_60px_-36px_rgb(79_70_229/0.45)] ring-1 ring-line lg:grid-cols-4"
          data-reveal
        >
          {stats.map((s) => (
            <li key={s.label} style={toneVars(s.tone)} className="group relative flex items-center gap-4 bg-white p-6 md:p-8">
              <span className="tone-icon grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 md:h-14 md:w-14">
                <StatIcon label={s.label} />
              </span>
              <p>
                <span className="block font-display text-[clamp(1.7rem,1.3rem+1.6vw,2.6rem)] font-extrabold leading-none tracking-[-0.03em] text-ink">
                  {s.text ? <span className="tone-text">{s.text}</span> : <Counter to={s.value ?? 0} grouping={s.grouping !== false} />}
                  {s.suffix && <span className="tone-text">{s.suffix}</span>}
                </span>
                <span className="mt-1.5 block text-[13.5px] font-medium text-muted md:text-[14.5px]">{s.label}</span>
              </p>
              <span aria-hidden className="absolute inset-x-6 bottom-0 h-[3px] origin-left scale-x-0 rounded-full bg-[var(--c)] transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Odometer: each digit is a 0–9 strip that rolls into place when the stats come into view.
 * Server HTML already shows the final number (SEO / no-JS); transform-only animation.
 */
function Counter({ to, grouping = true }: { to: number; grouping?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(false); // false = show final digits
  const [rolled, setRolled] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // already visible on load: leave as is
    setArmed(true);
    setRolled(false);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        requestAnimationFrame(() => setRolled(true));
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const label = grouping ? to.toLocaleString("en-US") : String(to);
  const chars = label.split("");
  let digitIndex = 0;
  return (
    <>
    <span className="sr-only">{label}</span>
    <span ref={ref} className="odo tabular-nums" aria-hidden data-armed={armed || undefined}>
      {chars.map((ch, i) => {
        if (!/\d/.test(ch)) {
          return (
            <span key={i} aria-hidden>
              {ch}
            </span>
          );
        }
        const d = Number(ch);
        const idx = digitIndex++;
        return (
          <span key={i} className="odo-digit" aria-hidden>
            <span
              className="odo-strip"
              style={{ transform: `translateY(-${(rolled ? d + 10 : 0) * 5}%)`, ["--od" as string]: `${idx * 90}ms` }}
            >
              {Array.from({ length: 20 }, (_, k) => (
                <span key={k}>{k % 10}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
    </>
  );
}

function StatIcon({ label }: { label: string }) {
  const p = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (label.startsWith("Serving"))
    return (
      <svg {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  if (label.startsWith("US-based"))
    return (
      <svg {...p}>
        <path d="M12 3 19 6v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  if (label.startsWith("Database"))
    return (
      <svg {...p}>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </svg>
    );
  return (
    <svg {...p}>
      <path d="M12 21s-7-4.4-7-10.2A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7 2.8C19 16.6 12 21 12 21Z" />
    </svg>
  );
}
