"use client";

import type { Feature } from "@/lib/content-pages";
import { toneOrder, toneVars } from "@/lib/tones";
import { cardLeave, cardMove } from "@/lib/pointer";

/** Numbered feature cards with a cursor-following spotlight. */
export function FeatureGrid({ items, cols = 3 }: { items: Feature[]; cols?: 2 | 3 }) {
  return (
    <ul className={`grid gap-4 md:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""} lg:gap-5`}>
      {items.map((f, i) => (
        <li key={f.title} data-reveal style={{ ["--d" as string]: `${(i % 3) * 70}ms`, ...toneVars(toneOrder[i % toneOrder.length]) }}>
          <article
            onPointerMove={cardMove}
            onPointerLeave={cardLeave}
            className="tilt-card group relative isolate h-full overflow-hidden rounded-3xl bg-surface p-7 shadow-card ring-1 ring-line hover:-translate-y-1 hover:shadow-lift md:p-8"
          >
            <span aria-hidden className="glow-border" />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(340px circle at var(--mx,50%) var(--my,50%), var(--cs), transparent 65%)" }}
            />
            <span className="tone-icon grid h-11 w-11 place-items-center rounded-xl font-display text-[14px] font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-6 text-[20px] font-bold leading-snug">{f.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.body}</p>
            <span
              aria-hidden
              className="absolute bottom-0 left-7 right-7 h-[2px] origin-left scale-x-0 rounded-full bg-[var(--c)] transition-transform duration-700 ease-out-expo group-hover:scale-x-100 md:left-8 md:right-8"
            />
          </article>
        </li>
      ))}
    </ul>
  );
}
