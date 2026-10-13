import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

/** Simple, readable layout for policy pages. */
export function LegalPage({ title, updated, href, children }: { title: string; updated: string; href: string; children: ReactNode }) {
  return (
    <section className="pb-24 pt-40 md:pt-48">
      <div className="container-x max-w-3xl">
        <Breadcrumbs items={[{ label: title, href }]} />
        <h1 className="mt-6 text-[clamp(2.2rem,1.6rem+2.4vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">{title}</h1>
        <p className="mt-4 text-[14px] text-muted">Last updated: {updated}</p>
        <div className="legal mt-10">{children}</div>
      </div>
    </section>
  );
}
