import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { getJobs } from "@/lib/jobs";
import { site } from "@/lib/site";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { ArrowRight, Pin } from "@/components/Icons";
import { EVerifyBadge } from "@/components/EVerifyBadge";

export const revalidate = 30; // seconds — keep in sync with JOBS_REVALIDATE in src/lib/jobs.ts

export const metadata: Metadata = {
  title: "Careers — IT jobs",
  description: `Open IT positions with ${site.legalName}: contract, contract-to-hire and direct-hire roles in database administration, ERP, infrastructure and IT support. Updated regularly.`,
  alternates: { canonical: "/careers" },
};

const perks = [
  { title: "Roles that fit your skills", body: "We match you with contract, contract-to-hire and permanent roles that suit your experience and goals." },
  { title: "Enterprise & government clients", body: "Work on meaningful systems for established enterprises and public-sector agencies." },
  { title: "A recruiter on your side", body: "We prepare you for interviews, handle paperwork and stay in touch throughout your assignment." },
];

export default async function CareersPage() {
  const jobs = await getJobs();
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={["Find your next ", "IT role."]}
        intro="We place skilled technology professionals with enterprises and government agencies across the United States. Browse our current openings below."
        crumbs={[{ label: "Careers", href: "/careers" }]}
      >
        <a href="#openings" className="btn btn-primary">
          View openings <ArrowRight />
        </a>
      </PageHero>

      <section id="openings" className="scroll-mt-32 py-20 md:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Open positions" title={jobs.length ? `Current openings (${jobs.length})` : "Current openings"} />
          {jobs.length ? (
            <ul className="mt-12 grid gap-4">
              {jobs.map((j, i) => (
                <li key={j.slug} data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
                  <Link
                    href={`/careers/${j.slug}`}
                    className="group flex flex-col gap-4 rounded-lg border border-line bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-line-2 hover:shadow-card md:flex-row md:items-center md:justify-between"
                  >
                    <div className="max-w-3xl">
                      <h3 className="text-[20px] font-semibold transition-colors group-hover:text-accent">{j.title}</h3>
                      <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14.5px] text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <Pin size={15} /> {j.location}
                          {j.remote ? " · Remote" : ""}
                        </span>
                        <span>{j.type}</span>
                        {j.experience && <span>{j.experience}</span>}
                        <span>Posted {formatDate(j.posted)}</span>
                      </p>
                      {j.summary && <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-ink-2">{j.summary}</p>}
                    </div>
                    <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-accent">
                      View details <ArrowRight />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-12 rounded-lg bg-tint p-8 ring-1 ring-line md:p-10" data-reveal>
              <p className="font-display text-[20px] font-semibold">There are no published openings right now.</p>
              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-2">
                New roles open often. Please check back soon for the latest IT openings with {site.legalName}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-tint py-24 md:py-28">
        <div className="container-x">
          <SectionHead eyebrow={`Why ${site.shortName}`} title="Work with a recruiter who" accent="knows IT" />
          <div className="mt-12">
            <FeatureGrid items={perks} />
          </div>
          {site.everify.enabled && (
            <div className="mt-6 space-y-4" data-reveal>
              <EVerifyBadge variant="strip" />
              <p className="text-[14px] leading-relaxed text-muted">
                E-Verify is used only after a job offer is accepted and Form I-9 is completed — never to screen applicants.
                {site.everify.posters.length > 0 && (
                  <>
                    {" "}
                    Read our notices:{" "}
                    {site.everify.posters.map((p, i) => (
                      <span key={p.href}>
                        {i > 0 && " · "}
                        <a href={p.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline underline-offset-2">
                          {p.label}
                        </a>
                      </span>
                    ))}
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </section>

    </>
  );
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}
