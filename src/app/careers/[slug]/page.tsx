import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import { getJobs, type Job } from "@/lib/jobs";
import { site } from "@/lib/site";
import { PageHero } from "@/components/page/PageHero";
import { JsonLd } from "@/components/page/JsonLd";
import { ArrowLeft, Check } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

// New rows in the jobs sheet get their own page on first visit; existing pages refresh every few minutes.
export const revalidate = 300; // seconds — keep in sync with JOBS_REVALIDATE in src/lib/jobs.ts
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getJobs()).map((j) => ({ slug: j.slug }));
}

async function findJob(slug: string) {
  return (await getJobs()).find((x) => x.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const j = await findJob(slug);
  if (!j) return { title: "Job not found", robots: { index: false } };
  return {
    title: `${j.title} — ${j.location}`,
    description: j.summary || `${j.type} ${j.title} role in ${j.location} with ${site.legalName}.`,
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

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const j = await findJob(slug);
  if (!j) notFound();

  const [city, region] = j.location.split(",").map((s) => s.trim());
  const list = (items: string[]) => (items.length ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : "");
  const blocks = [
    { h: "What you'll do", items: j.responsibilities },
    { h: "What you'll bring", items: j.requirements },
  ].filter((b) => b.items.length);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: j.title,
          description: `<p>${esc(j.summary || j.title)}</p>${j.responsibilities.length ? `<h3>Responsibilities</h3>${list(j.responsibilities)}` : ""}${
            j.requirements.length ? `<h3>Requirements</h3>${list(j.requirements)}` : ""
          }`,
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
        }}
      />
      <PageHero
        eyebrow={[j.location, j.remote ? "Remote" : "", j.type, j.experience].filter(Boolean).join(" · ")}
        title={[j.title, ""]}
        intro={j.summary}
        crumbs={[
          { label: "Careers", href: "/careers" },
          { label: j.title, href: `/careers/${j.slug}` },
        ]}
      />

      <section className="py-20">
        <div className="container-x">
          {blocks.length > 0 && (
            <div className={`grid gap-6 ${blocks.length === 2 ? "md:grid-cols-2" : "max-w-3xl"}`}>
              {blocks.map((b) => (
                <div key={b.h} className="rounded-lg border border-line bg-white p-8" data-reveal>
                  <h2 className="text-[21px] font-semibold">{b.h}</h2>
                  <ul className="mt-5 space-y-3">
                    {b.items.map((t) => (
                      <li key={t} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-ink-2">
                        <Check size={15} className="mt-[5px] shrink-0 text-brand-green" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <dl className="mt-8 grid gap-x-10 gap-y-4 border-t border-line pt-8 text-[15px] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Job type", j.type],
              ["Location", `${j.location}${j.remote ? " (Remote)" : ""}`],
              ["Posted", fmt(j.posted)],
              ...(j.validThrough ? [["Open until", fmt(j.validThrough)]] : []),
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted">{k}</dt>
                <dd className="mt-1 font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <Link href="/careers" className="mt-12 inline-flex items-center gap-2 text-[15px] font-semibold text-accent hover:underline hover:underline-offset-4">
            <ArrowLeft size={15} /> All openings
          </Link>
        </div>
      </section>
    </>
  );
}

function fmt(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
