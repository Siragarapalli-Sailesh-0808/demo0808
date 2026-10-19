import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { site } from "@/lib/site";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { EVerifyBadge } from "@/components/EVerifyBadge";
import { ArrowRight, Check, ExternalLink } from "@/components/Icons";

export const metadata: Metadata = {
  title: "E-Verify Participating Employer",
  description: `${site.legalName} is an official E-Verify participating employer, confirming U.S. employment authorization through the Department of Homeland Security and Social Security Administration.`,
  alternates: { canonical: "/e-verify" },
};

const principles = [
  {
    title: "100% Verified Workforce",
    body: "Every candidate placed on client assignments or hired internally is verified for lawful employment authorization in the United States.",
  },
  {
    title: "Post-Offer Verification Only",
    body: "In full accordance with federal law, E-Verify is utilized only after a job offer has been accepted and Form I-9 is completed — never as a pre-screening filter.",
  },
  {
    title: "Equal Opportunity & Anti-Discrimination",
    body: "We uphold strict compliance with the Immigrant and Employee Rights (IER) Section of the U.S. Department of Justice, guaranteeing non-discriminatory hiring.",
  },
  {
    title: "Government & Enterprise Compliance",
    body: "Our in-house compliance officer ensures all documentation meets federal, state, and client-specific regulatory standards.",
  },
];

const steps = [
  {
    step: "01",
    title: "Job Offer & Form I-9 Completion",
    body: "Once an employment offer is made and accepted, the new employee completes Section 1 of Form I-9 on or before their first day of work.",
  },
  {
    step: "02",
    title: "Documentation Review",
    body: "The candidate presents their choice of unexpired documentation proving identity and employment eligibility from the federal Lists of Acceptable Documents.",
  },
  {
    step: "03",
    title: "Electronic Verification",
    body: `${site.shortName} enters the Form I-9 data into the secure E-Verify system, which cross-checks records directly with the Department of Homeland Security (DHS) and Social Security Administration (SSA).`,
  },
  {
    step: "04",
    title: "Employment Authorized",
    body: "Confirmation is typically received in seconds, establishing full legal authorization and creating a complete, verifiable audit trail.",
  },
];

const faqs = [
  {
    q: "What is E-Verify?",
    a: "E-Verify is an Internet-based system administered by the U.S. Department of Homeland Security (DHS) in partnership with the Social Security Administration (SSA). It allows participating employers to electronically confirm the employment eligibility of newly hired employees.",
  },
  {
    q: "Can E-Verify be used to screen job applicants before hiring?",
    a: "No. Federal law strictly prohibits using E-Verify before an applicant has accepted a formal job offer and completed Form I-9. At M & K Technovations, verification occurs strictly post-hire.",
  },
  {
    q: "What happens if a Tentative Non-Confirmation (TNC) occurs?",
    a: "If information does not initially match federal records, a Tentative Non-Confirmation is issued. Employees have the legal right to contest the TNC, and federal regulations strictly prohibit taking adverse action (such as delay in start date or termination) while the case is being resolved.",
  },
  {
    q: "Who chooses which documents to present for verification?",
    a: "The employee always chooses which document or combination of documents to present from the Lists of Acceptable Documents (List A or List B + List C). Employers cannot mandate specific documents.",
  },
];

export default function EVerifyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "E-Verify", href: "/e-verify" }]}
        eyebrow="Federal Compliance & Verification"
        title={["E-Verify® Participating ", "Employer"]}
        intro={`${site.legalName} participates in the federal E-Verify program, electronically confirming the employment eligibility of every new team member with the U.S. Department of Homeland Security and the Social Security Administration.`}
        aside={
          <div className="rounded-2xl bg-white p-7 ring-1 ring-line shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-5">
              <EVerifyBadge variant="compact" />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active Participant
              </span>
            </div>
            <div className="mt-5 space-y-3 text-[14px] text-ink-2">
              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-muted">Participant Status</span>
                <span className="font-semibold text-ink">Enrolled &amp; Verified</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-muted">Authority</span>
                <span className="font-semibold text-ink">USCIS / DHS / SSA</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-muted">Compliance Oversight</span>
                <span className="font-semibold text-ink">In-House Compliance Officer</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted">Scope</span>
                <span className="font-semibold text-ink">All U.S. Placements</span>
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-line">
              <a
                href="https://www.e-verify.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-accent hover:underline"
              >
                Official E-Verify Website (e-verify.gov) <ExternalLink size={14} />
              </a>
            </div>
          </div>
        }
      />

      {/* Core Principles */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="Our Commitment"
            title="Integrity, documentation &"
            accent="compliance"
            intro="For clients and candidates alike, our E-Verify participation provides transparent assurance that every hire meets all legal work authorization requirements."
          />
          <div className="mt-14">
            <FeatureGrid items={principles} />
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="border-y border-line bg-tint py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="Step-by-Step Flow"
            title="How E-Verify works at"
            accent={`${site.shortName}`}
            intro="A systematic, respectful, and legally compliant process that ensures quick verification without unnecessary delays."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.step}
                className="relative flex flex-col justify-between rounded-xl bg-white p-7 ring-1 ring-line shadow-xs transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <span className="font-mono text-2xl font-bold tracking-tight text-accent">
                    {s.step}
                  </span>
                  <h3 className="mt-4 font-display text-[17px] font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Notices & Rights */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="eyebrow">Employee Rights</p>
              <h2 className="h-section mt-4">
                Know your <span className="accent-word">rights</span>
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-ink-2">
                Federal law protects employees against discrimination based on citizenship status, immigration status, or national origin during the hiring and verification process.
              </p>
              <ul className="mt-8 space-y-4 text-[15px] text-ink-2">
                <li className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check size={13} />
                  </span>
                  <span>Employers cannot demand specific documents or refuse valid documents that appear genuine.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check size={13} />
                  </span>
                  <span>Candidates receive written notification and clear instructions if a government record check requires resolution.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check size={13} />
                  </span>
                  <span>No adverse action or suspension may occur during an ongoing Tentative Non-Confirmation review.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-navy p-8 text-white md:p-10 shadow-lg">
                <p className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-white/60">
                  Required Federal Notices
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-snug">
                  Official Participation &amp; Right to Work Notices
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-white/80">
                  As an E-Verify employer, {site.legalName} prominently displays the official English and Spanish notices regarding employment eligibility verification and worker protections:
                </p>
                <div className="mt-8 space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-white/10 p-4 transition-colors hover:bg-white/15">
                    <div>
                      <p className="font-semibold text-white">Notice of E-Verify Participation</p>
                      <p className="text-[13px] text-white/60">Department of Homeland Security / SSA</p>
                    </div>
                    <a
                      href="https://www.e-verify.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal-300 hover:text-white"
                    >
                      Learn more <ExternalLink size={13} />
                    </a>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/10 p-4 transition-colors hover:bg-white/15">
                    <div>
                      <p className="font-semibold text-white">Right to Work Notice</p>
                      <p className="text-[13px] text-white/60">DOJ Civil Rights Division / IER</p>
                    </div>
                    <a
                      href="https://www.justice.gov/crt/immigrant-and-employee-rights-section"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal-300 hover:text-white"
                    >
                      Learn more <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="border-t border-line bg-tint py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="FAQ"
            title="Frequently asked"
            accent="questions"
            intro="Common questions regarding E-Verify compliance, documentation, and candidate protections."
            center
          />
          <div className="mx-auto mt-14 max-w-3xl space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-xl bg-white p-6 ring-1 ring-line shadow-xs">
                <h3 className="font-display text-[17px] font-semibold text-ink">
                  {f.q}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                  {f.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl text-center">
            <p className="text-[13px] text-muted">
              E-Verify® is a registered trademark of the U.S. Department of Homeland Security. For further inquiries regarding our compliance or verification policies, contact our compliance team.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/careers" className="btn btn-primary">
                View Open Positions <ArrowRight />
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Contact Compliance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
