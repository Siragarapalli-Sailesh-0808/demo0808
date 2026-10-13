import { strengths } from "@/lib/content";
import { FeatureGrid } from "../page/FeatureGrid";
import { SectionHead } from "../page/SectionHead";

/** "Why M & K" — real strengths from the company's own materials (replaces sample case studies). */
export function WhyUs() {
  return (
    <section id="why-mk" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHead eyebrow="Why M & K" title="Hiring done" accent="right." />
          </div>
          <p className="max-w-xl text-[17px] leading-relaxed text-ink-2 lg:col-span-5" data-reveal style={{ ["--d" as string]: "100ms" }}>
            Since 2013 we&apos;ve built long-term relationships with both employers and IT professionals — so the people we
            place are the right fit for the role, the team and the budget.
          </p>
        </div>
        <div className="mt-12">
          <FeatureGrid items={strengths} />
        </div>
      </div>
    </section>
  );
}
