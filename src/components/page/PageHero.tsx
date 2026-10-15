import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** Inner-page header: quiet grey band, breadcrumb, title and intro. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
  aside,
}: {
  eyebrow: string;
  title: [string, string];
  intro: string;
  crumbs: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-44 md:pb-20 md:pt-52">
      <div aria-hidden className="absolute inset-0 -z-10 bg-tint" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-px bg-line" />

      <div className="container-x relative grid items-end gap-12 lg:grid-cols-12">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow fade-up mt-10" style={{ ["--d" as string]: "60ms" }}>
            {eyebrow}
          </p>
          <h1
            className="fade-up mt-5 text-[clamp(2.4rem,1.5rem+3.6vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
            style={{ ["--d" as string]: "120ms" }}
          >
            {title[0]}
            <span className="accent-word">{title[1]}</span>
          </h1>
          <p
            className="fade-up mt-6 max-w-2xl text-[17.5px] leading-relaxed text-ink-2 md:text-[19px]"
            style={{ ["--d" as string]: "200ms" }}
          >
            {intro}
          </p>
          {children && (
            <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "280ms" }}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="fade-up lg:col-span-5" style={{ ["--d" as string]: "320ms" }}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
