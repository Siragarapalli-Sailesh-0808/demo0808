import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/content";
import { serviceDetails } from "@/lib/content-pages";
import { site } from "@/lib/site";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { Steps } from "@/components/page/Steps";
import { Outcomes } from "@/components/page/Outcomes";
import { Faq } from "@/components/page/Faq";
import { RelatedServices } from "@/components/page/RelatedServices";
import { JsonLd } from "@/components/page/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArrowRight, Icon } from "@/components/Icons";
import { toneVars } from "@/lib/tones";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  const d = serviceDetails[slug];
  return {
    title: s.title,
    description: d.intro,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title: `${s.title} | ${site.name}`, description: d.intro, url: `/services/${slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const d = serviceDetails[slug];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: s.title,
              description: d.intro,
              serviceType: s.title,
              provider: { "@type": "Organization", name: site.legalName, url: site.url },
              areaServed: ["United States", "India"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: s.title,
                itemListElement: d.offerings.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o.title, description: o.body } })),
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: d.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ],
        }}
      />

      <PageHero
        eyebrow={s.title}
        title={d.headline}
        intro={d.intro}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: s.title, href: `/services/${slug}` },
        ]}
        aside={
          <div
            style={toneVars(s.tone)}
            className="relative ml-auto hidden w-full max-w-[360px] flex-col items-center gap-8 rounded-[40px] bg-white/85 px-7 pb-8 pt-12 shadow-[0_40px_80px_-40px_rgb(11_18_32/0.35)] ring-1 ring-white lg:flex"
          >
            <span className="tone-icon grid h-32 w-32 place-items-center rounded-[34px]" style={{ animation: "float 7s ease-in-out infinite" }}>
              <Icon name={s.icon} size={58} strokeWidth={1.2} />
            </span>
            <ul className="flex flex-wrap justify-center gap-1.5">
              {d.offerings.slice(0, 4).map((o) => (
                <li key={o.title} className="tone-soft rounded-full px-3 py-1 text-[12px] font-semibold">
                  {o.title}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <Link href="/contact" className="btn btn-primary">
          Start a conversation <ArrowRight />
        </Link>
        <Link href="#approach" className="btn btn-ghost">
          How we work
        </Link>
      </PageHero>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <SectionHead eyebrow="What we deliver" title="Capabilities" accent="in focus" />
          <div className="mt-12">
            <FeatureGrid items={d.offerings} />
          </div>
        </div>
      </section>

      {d.models && (
        <section className="bg-tint py-24 md:py-32">
          <div className="container-x">
            <SectionHead eyebrow="Engagement models" title="Hire the way" accent="you work" center />
            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {d.models.map((m, i) => (
                <li
                  key={m.title}
                  data-reveal
                  style={{ ["--d" as string]: `${i * 70}ms` }}
                  className="group relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-line transition-[background-color,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:bg-[linear-gradient(140deg,#7c3aed,#2563eb)]"
                >
                  <span className="font-display text-[13px] font-semibold text-accent transition-colors duration-500 group-hover:text-white/70">0{i + 1}</span>
                  <h3 className="mt-10 text-[22px] font-bold transition-colors duration-500 group-hover:text-white">{m.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/80">{m.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="approach" className="py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHead eyebrow="Our approach" title="How we" accent="work" intro="A clear, repeatable path from first conversation to lasting results — with checkpoints so you always know where things stand." />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Steps steps={d.approach} />
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <Outcomes title="What you can expect" items={d.outcomes} />
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="FAQ" title="Common" accent="questions" />
          </div>
          <div className="lg:col-span-8" data-reveal>
            <Faq items={d.faqs} />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-tint py-24">
        <div className="container-x">
          <RelatedServices slugs={services.filter((x) => x.slug !== slug).map((x) => x.slug)} title="Explore other services" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
