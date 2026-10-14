import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { jobs } from "@/lib/jobs";
import { site } from "@/lib/site";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { ApplyForm } from "@/components/page/ApplyForm";
import { ArrowRight, Pin } from "@/components/Icons";
import { EVerifyBadge } from "@/components/EVerifyBadge";

export const metadata: Metadata = {
  title: "Careers — IT jobs",
  description: `Open IT positions with ${site.legalName}: contract, contract-to-hire and direct-hire roles in database administration, ERP, infrastructure and IT support. Send us your résumé.`,
  alternates: { canonical: "/careers" },
};

const perks = [
  { title: "Roles that fit your skills", body: "We match you with contract, contract-to-hire and permanent roles that suit your experience and goals." },
  { title: "Enterprise & government clients", body: "Work on meaningful systems for established enterprises and public-sector agencies." },
  { title: "A recruiter on your side", body: "We prepare you for interviews, handle paperwork and stay in touch throughout your assignment." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={["Find your next ", "IT role."]}
        intro="We place skilled technology professionals with enterprises and government agencies across the United States. Browse our openings, or send us your résumé and we'll reach out when the right role comes up."
        crumbs={[{ label: "Careers", href: "/careers" }]}
      >
        <a href="#openings" className="btn btn-primary">
          {jobs.length ? "View openings" : "Send your résumé"} <ArrowRight />
        </a>
      </PageHero>

      <section id="openings" className="scroll-mt-32 pb-24 md:pb-28">
        <div className="container-x">
          <SectionHead eyebrow="Open positions" title={jobs.length ? `${jobs.length} open` : "Current"} accent={jobs.length === 1 ? "role" : jobs.length ? "roles" : "openings"} />
          {jobs.length ? (
            <ul className="mt-12 grid gap-4">
              {jobs.map((j, i) => (
                <li key={j.slug} data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
                  <Link
                    href={`/careers/${j.slug}`}
                    className="group flex flex-col gap-4 rounded-3xl bg-white p-7 ring-1 ring-line transition-[box-shadow,translate] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-lift md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <h3 className="text-[21px] font-bold transition-colors group-hover:text-accent">{j.title}</h3>
                      <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14.5px] text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <Pin size={15} /> {j.location}
                          {j.remote ? " · Remote" : ""}
                        </span>
                        <span>{j.type}</span>
                        {j.experience && <span>{j.experience}</span>}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-accent">
                      View & apply <ArrowRight />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-12 rounded-3xl bg-tint p-8 ring-1 ring-line md:p-10" data-reveal>
              <p className="font-display text-[20px] font-semibold">There are no published openings right now.</p>
              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-2">
                New roles open often, and many are filled before they&apos;re ever posted. Send us your résumé below and our recruiters will contact you when a
                role matches your skills.
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

      <section id="apply" className="scroll-mt-32 py-24 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="Apply" title="Send us your" accent="résumé" intro="Tell us a little about yourself and attach your résumé. We review every application." />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ApplyForm />
          </div>
        </div>
      </section>
    </>
  );
}
