import Link from "next/link";
import { services } from "@/lib/content";
import { ArrowUpRight, Icon } from "../Icons";
import { toneVars } from "@/lib/tones";

export function RelatedServices({ slugs, title = "Related services" }: { slugs: string[]; title?: string }) {
  const list = services.filter((s) => slugs.includes(s.slug));
  return (
    <div>
      <h2 className="text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] font-bold" data-reveal>
        {title}
      </h2>
      <ul className={`mt-8 grid gap-4 md:grid-cols-2 ${list.length > 2 ? "lg:grid-cols-4" : ""}`}>
        {list.map((s, i) => (
          <li key={s.slug} data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
            <Link
              href={`/services/${s.slug}`}
              style={toneVars(s.tone)}
              className="group flex h-full flex-col rounded-3xl bg-surface p-6 shadow-card ring-1 ring-line transition-[box-shadow,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="tone-icon grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6">
                <Icon name={s.icon} size={22} />
              </span>
              <span className="mt-8 font-display text-[17px] font-semibold leading-snug text-ink">{s.title}</span>
              <span className="mt-2 text-[14px] text-muted">{s.short}</span>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-semibold">
                Learn more
                <ArrowUpRight className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
