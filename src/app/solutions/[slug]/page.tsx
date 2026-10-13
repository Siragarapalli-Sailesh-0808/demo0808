import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { solutions } from "@/lib/content";
import { solutionDetails } from "@/lib/content-pages";
import { site } from "@/lib/site";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { Outcomes } from "@/components/page/Outcomes";
import { RelatedServices } from "@/components/page/RelatedServices";
import { JsonLd } from "@/components/page/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArrowRight, ArrowUpRight, Icon } from "@/components/Icons";
import { toneVars } from "@/lib/tones";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) return {};
  const d = solutionDetails[slug];
  return {
    title: s.title,
    description: d.intro,
    alternates: { canonical: `/solutions/${slug}` },
    openGraph: { title: `${s.title} | ${site.name}`, description: d.intro, url: `/solutions/${slug}` },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) notFound();
  const d = solutionDetails[slug];
  const others = solutions.filter((x) => x.slug !== slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: d.intro,
          provider: { "@type": "Organization", name: site.legalName, url: site.url },
        }}
      />
      <PageHero
        eyebrow={s.title}
        title={d.headline}
        intro={d.intro}
        crumbs={[
          { label: "Solutions", href: "/solutions" },
          { label: s.title, href: `/solutions/${slug}` },
        ]}
        aside={
          <div className="relative ml-auto hidden w-full max-w-[380px] rounded-[32px] bg-white/85 p-7 shadow-[0_40px_80px_-40px_rgb(11_18_32/0.35)] ring-1 ring-white lg:block">
            <span className="tone-icon grid h-14 w-14 place-items-center rounded-2xl" style={toneVars(s.tone)}>
              <Icon name={s.icon} size={26} />
            </span>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">Focus areas</p>
            <ul className="mt-3 space-y-2.5">
              {s.items.map((it, i) => (
                <li key={it} className="flex items-center gap-3 text-[14.5px] font-medium text-ink">
                  <span className="font-display text-[12px] font-semibold tabular-nums text-accent">0{i + 1}</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <Link href="/contact" className="btn btn-primary">
          Talk to a specialist <ArrowRight />
        </Link>
      </PageHero>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <SectionHead eyebrow="Capabilities" title="What's" accent="included" />
          <div className="mt-12">
            <FeatureGrid items={d.capabilities} />
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <Outcomes title="The difference it makes" items={d.outcomes} />
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <RelatedServices slugs={d.services} title="Services behind this solution" />
        </div>
      </section>

      <section className="border-t border-line bg-tint py-24">
        <div className="container-x">
          <h2 className="text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] font-bold" data-reveal>
            Other solutions
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((o, i) => (
              <li key={o.slug} data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
                <Link
                  href={`/solutions/${o.slug}`}
                  className="group flex h-full items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-line transition-[box-shadow,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="tone-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={toneVars(o.tone)}>
                    <Icon name={o.icon} size={20} />
                  </span>
                  <span className="flex-1 font-display text-[15.5px] font-semibold leading-snug">{o.title}</span>
                  <ArrowUpRight className="shrink-0 text-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
