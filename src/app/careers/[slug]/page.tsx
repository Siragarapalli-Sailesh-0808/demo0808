import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { jobs, type Job } from "@/lib/jobs";
import { site } from "@/lib/site";
import { PageHero } from "@/components/page/PageHero";
import { JsonLd } from "@/components/page/JsonLd";
import { ApplyForm } from "@/components/page/ApplyForm";
import { ArrowRight, Check } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const j = jobs.find((x) => x.slug === slug);
  if (!j) return {};
  return {
    title: `${j.title} — ${j.location}`,
    description: j.summary,
    alternates: { canonical: `/careers/${slug}` },
  };
}

const employmentType: Record<Job["type"], string[]> = {
  Contract: ["CONTRACTOR"],
  "Contract-to-Hire": ["CONTRACTOR", "FULL_TIME"],
  "Full-time": ["FULL_TIME"],
  "Part-time": ["PART_TIME"],
  Temporary: ["TEMPORARY"],
};

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const j = jobs.find((x) => x.slug === slug);
  if (!j) notFound();

  const [city, region] = j.location.split(",").map((s) => s.trim());
  const list = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: j.title,
          description: `<p>${j.summary}</p><h3>Responsibilities</h3>${list(j.responsibilities)}<h3>Requirements</h3>${list(j.requirements)}`,
          datePosted: j.posted,
          ...(j.validThrough ? { validThrough: j.validThrough } : {}),
          employmentType: employmentType[j.type],
          hiringOrganization: { "@type": "Organization", name: site.legalName, sameAs: site.url, logo: `${site.url}/brand/logo.svg` },
          ...(j.remote
            ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "USA" } }
            : {
                jobLocation: {
                  "@type": "Place",
                  address: { "@type": "PostalAddress", addressLocality: city, addressRegion: region, addressCountry: "US" },
                },
              }),
          directApply: true,
        }}
      />
      <PageHero
        eyebrow={`${j.type}${j.experience ? ` · ${j.experience}` : ""}`}
        title={[`${j.title} `, `— ${j.location}${j.remote ? " (Remote)" : ""}`]}
        intro={j.summary}
        crumbs={[
          { label: "Careers", href: "/careers" },
          { label: j.title, href: `/careers/${j.slug}` },
        ]}
      >
        <a href="#apply" className="btn btn-primary">
          Apply now <ArrowRight />
        </a>
      </PageHero>

      <section className="py-20">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[
            { h: "What you'll do", items: j.responsibilities },
            { h: "What you'll bring", items: j.requirements },
          ].map((b) => (
            <div key={b.h} className="rounded-lg bg-white p-8 ring-1 ring-line" data-reveal>
              <h2 className="text-[22px] font-bold">{b.h}</h2>
              <ul className="mt-5 space-y-3">
                {b.items.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-ink-2">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-50 text-accent">
                      <Check size={11} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="apply" className="scroll-mt-32 border-t border-line bg-tint py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)] font-bold">
              Apply for <span className="accent-word">this role</span>
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">Attach your résumé and we&apos;ll be in touch if your experience is a match.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ApplyForm job={j.slug} />
          </div>
        </div>
      </section>
    </>
  );
}
