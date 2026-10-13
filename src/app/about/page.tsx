import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { about } from "@/lib/content-pages";
import { site } from "@/lib/site";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/SectionHead";
import { Steps } from "@/components/page/Steps";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArrowRight, Pin } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About us",
  description: about.intro,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={["The right people, ", "since 2013."]}
        intro={about.intro}
        crumbs={[{ label: "About", href: "/about" }]}
      >
        <Link href="/contact" className="btn btn-primary">
          Work with us <ArrowRight />
        </Link>
        <Link href="/services" className="btn btn-ghost">
          Our services
        </Link>
      </PageHero>

      {/* Stats */}
      <section className="pb-20">
        <div className="container-x">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-line ring-1 ring-line lg:grid-cols-4">
            {about.stats.map((s, i) => (
              <li key={s.label} className="bg-white p-7 md:p-10" data-reveal style={{ ["--d" as string]: `${i * 70}ms` }}>
                <p className="font-display text-[clamp(2.2rem,1.6rem+2.4vw,3.6rem)] font-extrabold leading-none tracking-[-0.04em]">
                  {s.value}
                </p>
                <p className="mt-3 text-[14.5px] text-muted">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Our story" title="How we" accent="started" />
          </div>
          <div className="space-y-6 lg:col-span-7">
            {about.story.map((p, i) => (
              <p key={i} className="text-[18px] leading-relaxed text-ink-2 md:text-[19px]" data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                {p}
              </p>
            ))}
            <div className="grid gap-4 pt-6 sm:grid-cols-2">
              {[
                { k: "Mission", v: about.mission },
                { k: "Vision", v: about.vision },
              ].map((m, i) => (
                <div
                  key={m.k}
                  data-reveal
                  style={{ ["--d" as string]: `${i * 80}ms` }}
                  className={`rounded-3xl p-7 ${i === 0 ? "bg-[linear-gradient(135deg,#6d28d9,#2563eb)] text-white" : "bg-[#e2f8fc]"}`}
                >
                  <p className={`text-[12.5px] font-semibold uppercase tracking-[0.08em] ${i === 0 ? "text-white/70" : "text-[#0e7490]"}`}>{m.k}</p>
                  <p className={`mt-4 font-display text-[19px] font-semibold leading-snug ${i === 0 ? "text-white" : "text-ink"}`}>{m.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-tint py-24 md:py-32">
        <div className="container-x">
          <SectionHead eyebrow="Values" title="What we" accent="stand for" center />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <li
                key={v.title}
                data-reveal
                style={{ ["--d" as string]: `${i * 70}ms` }}
                className="group rounded-3xl bg-white p-7 ring-1 ring-line transition-[box-shadow,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="font-display text-[48px] font-extrabold leading-none tracking-[-0.05em] text-accent-100 transition-colors duration-500 group-hover:text-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-8 text-[21px] font-bold">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHead
                eyebrow="How we work"
                title="A simple way of"
                accent="working"
                intro="Whether we're placing talent, supporting your databases or running your IT, every engagement follows the same honest, transparent rhythm."
              />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Steps steps={about.approach} />
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="bg-tint py-24 md:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Offices" title="Where to" accent="find us" />
          <ul className="mt-12 grid max-w-xl gap-5">
            {site.offices.map((o, i) => (
              <li key={o.country} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="rounded-3xl bg-white p-8 ring-1 ring-line md:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-50 text-accent">
                  <Pin />
                </span>
                <h3 className="mt-6 text-[24px] font-bold">{o.country}</h3>
                <address className="mt-3 not-italic text-[15.5px] leading-relaxed text-muted">
                  {o.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
