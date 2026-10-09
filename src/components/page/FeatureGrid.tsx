"use client";

import type { Feature } from "@/lib/content-pages";

/** Numbered feature cards with a cursor-following spotlight. */
export function FeatureGrid({ items, cols = 3 }: { items: Feature[]; cols?: 2 | 3 }) {
  const spotlight = (e: React.PointerEvent<HTMLElement>) => {
    const t = e.currentTarget;
    const r = t.getBoundingClientRect();
    t.style.setProperty("--mx", `${e.clientX - r.left}px`);
    t.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <ul className={`grid gap-4 md:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""} lg:gap-5`}>
      {items.map((f, i) => (
        <li key={f.title} data-reveal style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}>
          <article
            onPointerMove={spotlight}
            className="group relative isolate h-full overflow-hidden rounded-3xl bg-surface p-7 shadow-card ring-1 ring-line transition-[box-shadow,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift md:p-8"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(340px circle at var(--mx,50%) var(--my,50%), rgb(36 83 255 / 0.09), transparent 65%)" }}
            />
            <span className="font-display text-[13px] font-semibold tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-6 text-[20px] font-bold leading-snug">{f.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.body}</p>
            <span
              aria-hidden
              className="absolute bottom-0 left-7 right-7 h-[2px] origin-left scale-x-0 rounded-full bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100 md:left-8 md:right-8"
            />
          </article>
        </li>
      ))}
    </ul>
  );
}
