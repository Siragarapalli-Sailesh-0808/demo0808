import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { industryGroups } from "@/lib/content";
import { industryDetails } from "@/lib/content-pages";
import { PageHero } from "@/components/page/PageHero";
import { SubNav } from "@/components/page/SubNav";
import { Art } from "@/components/sections/WhoWeServe";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArrowRight, Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Who we serve",
  description:
    "IT staffing, database administration and managed IT support for global enterprises, government agencies and small and mid-sized businesses.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we serve"
        title={["Built for the organizations ", "we know best."]}
        intro="Enterprises, government agencies and growing businesses each need something different. We bring the right people and the right level of support to each."
        crumbs={[{ label: "Who we serve", href: "/industries" }]}
      />

      <SubNav items={industryGroups.map((g) => ({ id: g.key, label: g.label }))} />

      {industryGroups.map((g, gi) => {
        const d = industryDetails[g.key];
        return (
          <section key={g.key} id={g.key} className={`scroll-mt-36 py-24 md:py-28 ${gi % 2 ? "bg-tint" : ""}`}>
            <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-6">
                <p className="eyebrow" data-reveal>
                  0{gi + 1} · {g.label}
                </p>
                <h2 className="mt-5 text-[clamp(1.7rem,1.2rem+1.8vw,2.7rem)] font-bold leading-[1.15]" data-reveal style={{ ["--d" as string]: "60ms" }}>
                  {g.statement}
                </h2>
                <ul className="mt-8 flex flex-wrap gap-2" data-reveal style={{ ["--d" as string]: "120ms" }}>
                  {g.sectors.map((s) => (
                    <li key={s} className="rounded-md bg-white px-3.5 py-2 text-[14px] font-medium text-ink ring-1 ring-line">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[220px] overflow-hidden rounded-lg bg-tint ring-1 ring-line lg:col-span-6 lg:h-[300px]" data-reveal style={{ ["--d" as string]: "120ms" }}>
                <div className="absolute inset-0">
                  <Art kind={g.art} fit="meet" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:col-span-12">
                <div className="rounded-lg bg-white p-8 ring-1 ring-line" data-reveal>
                  <h3 className="text-[19px] font-bold">Common challenges</h3>
                  <ul className="mt-5 space-y-3">
                    {d.challenges.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-[15.5px] text-ink-2">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-line-2" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-ink p-8 text-white" data-reveal style={{ ["--d" as string]: "80ms" }}>
                  <h3 className="text-[19px] font-bold !text-white">How we help</h3>
                  <ul className="mt-5 space-y-3">
                    {d.help.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-[15.5px] text-white/85">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent">
                          <Check size={11} />
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="mt-7 inline-flex items-center gap-2 text-[14.5px] font-semibold text-white">
                    Talk to our team <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand />
    </>
  );
}
