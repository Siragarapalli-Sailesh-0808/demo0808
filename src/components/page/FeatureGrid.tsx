import type { Feature } from "@/lib/content-pages";

/** Plain feature cards: a short brand rule, title and description. */
export function FeatureGrid({ items, cols = 3 }: { items: Feature[]; cols?: 2 | 3 }) {
  return (
    <ul className={`grid gap-4 md:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""} lg:gap-5`}>
      {items.map((f, i) => (
        <li key={f.title} data-reveal style={{ ["--d" as string]: `${(i % 3) * 60}ms` }}>
          <article className="h-full rounded-lg border border-line bg-surface p-7 transition-[border-color,box-shadow] duration-300 hover:border-line-2 hover:shadow-card md:p-8">
            <span aria-hidden className="block h-[3px] w-8 bg-brand-blue" />
            <h3 className="mt-5 text-[19px] font-semibold leading-snug">{f.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.body}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
