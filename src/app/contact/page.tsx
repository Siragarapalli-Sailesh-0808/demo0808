import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/page/PageHero";
import { ContactForm } from "@/components/page/ContactForm";
import { JsonLd } from "@/components/page/JsonLd";
import { Pin } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Talk to ${site.name} about IT consulting, cloud, data and AI, application development or IT staffing. We reply within one business day.`,
  alternates: { canonical: "/contact" },
};

const next = [
  { title: "We reply within a day", body: "A specialist — not a bot — gets back to you within one business day." },
  { title: "A short discovery call", body: "We learn about your goals, timelines and constraints." },
  { title: "A clear proposal", body: "You receive a plan, team or shortlist with transparent pricing." },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${site.name}`,
          url: `${site.url}/contact`,
          mainEntity: {
            "@type": "Organization",
            name: site.legalName,
            url: site.url,
            email: site.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: site.address.street,
              addressLocality: site.address.city,
              addressRegion: site.address.region,
              postalCode: site.address.postalCode,
              addressCountry: site.address.country,
            },
            contactPoint: site.emails.map((email) => ({ "@type": "ContactPoint", contactType: "sales", email, url: `${site.url}/contact`, areaServed: "US", availableLanguage: ["English"] })),
          },
        }}
      />
      <PageHero
        eyebrow="Contact"
        title={["Let's talk about ", "what's next."]}
        intro="Tell us about your project, challenge or hiring need. We'll connect you with the right person and come back with a clear next step."
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="rounded-lg bg-tint p-6 ring-1 ring-line sm:p-10 lg:col-span-7 lg:self-start" data-reveal>
            <ContactForm />
          </div>

          <aside className="space-y-4 lg:col-span-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {site.offices.map((o, i) => (
                <address
                  key={o.country}
                  data-reveal
                  style={{ ["--d" as string]: `${140 + i * 60}ms` }}
                  className="flex gap-4 rounded-lg bg-white p-6 not-italic ring-1 ring-line"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent">
                    <Pin />
                  </span>
                  <span>
                    <span className="block font-display text-[16px] font-semibold text-ink">{o.country}</span>
                    {o.lines.map((l) => (
                      <span key={l} className="block text-[14.5px] leading-relaxed text-muted">
                        {l}
                      </span>
                    ))}
                  </span>
                </address>
              ))}
            </div>

            <div className="rounded-lg bg-white p-6 ring-1 ring-line" data-reveal style={{ ["--d" as string]: "260ms" }}>
              <p className="font-display text-[16px] font-semibold">What happens next</p>
              <ol className="mt-5 space-y-5">
                {next.map((n, i) => (
                  <li key={n.title} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-50 font-display text-[13px] font-bold text-accent">{i + 1}</span>
                    <span>
                      <span className="block text-[15px] font-semibold text-ink">{n.title}</span>
                      <span className="mt-0.5 block text-[14px] leading-relaxed text-muted">{n.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
