import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/page/PageHero";
import { ContactForm } from "@/components/page/ContactForm";
import { JsonLd } from "@/components/page/JsonLd";
import { Mail, Phone, Pin, Social } from "@/components/Icons";

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
            email: site.email,
            telephone: site.phone,
            contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: site.email, telephone: site.phone, availableLanguage: ["English"] }],
          },
        }}
      />
      <PageHero
        eyebrow="Contact"
        title={["Let's talk about ", "what's next."]}
        intro="Tell us about your project, challenge or hiring need. We'll connect you with the right person and come back with a clear next step."
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="pb-24 md:pb-32">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="rounded-[32px] bg-tint p-6 ring-1 ring-line sm:p-10 lg:col-span-7 lg:self-start" data-reveal>
            <ContactForm />
          </div>

          <aside className="space-y-4 lg:col-span-5">
            <div className="rounded-[28px] p-8 text-white" data-reveal style={{ ["--d" as string]: "80ms", background: "linear-gradient(140deg, #1e1b4b, #312e81 50%, #1e3a8a)" }}>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-white/60">Prefer to reach out directly?</p>
              <ul className="mt-6 space-y-4">
                <li>
                  <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 transition-colors duration-300 group-hover:bg-[#7c3aed]">
                      <Mail />
                    </span>
                    <span>
                      <span className="block text-[13px] text-white/60">Email</span>
                      <span className="block font-display text-[17px] font-semibold">{site.email}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="group flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 transition-colors duration-300 group-hover:bg-[#7c3aed]">
                      <Phone />
                    </span>
                    <span>
                      <span className="block text-[13px] text-white/60">Phone</span>
                      <span className="block font-display text-[17px] font-semibold">{site.phone}</span>
                    </span>
                  </a>
                </li>
              </ul>
              <ul className="mt-8 flex gap-2 border-t border-white/10 pt-6">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors duration-300 hover:bg-[#7c3aed]"
                    >
                      <Social name={s.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {site.offices.map((o, i) => (
                <address
                  key={o.country}
                  data-reveal
                  style={{ ["--d" as string]: `${140 + i * 60}ms` }}
                  className="flex gap-4 rounded-[24px] bg-white p-6 not-italic ring-1 ring-line"
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

            <div className="rounded-[24px] bg-white p-6 ring-1 ring-line" data-reveal style={{ ["--d" as string]: "260ms" }}>
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
