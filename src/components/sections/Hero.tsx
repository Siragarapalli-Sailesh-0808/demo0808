import { Link } from "next-view-transitions";
import { ArrowRight } from "../Icons";
import { HeroBackdrop, HeroPanel } from "./HeroVisual";

const rotating = ["teams", "talent", "databases", "support"];

export function Hero() {
  return (
    <section data-anim-zone className="relative isolate overflow-hidden pb-24 pt-40 md:pb-32 md:pt-52">
      <HeroBackdrop />

      <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 xl:col-span-7">
          <p
            className="fade-up inline-flex items-center gap-2.5 rounded-full py-2 pl-2.5 pr-5 text-[13.5px] font-semibold text-white shadow-[0_14px_30px_-14px_rgb(79_70_229/0.8)]"
            style={{ ["--d" as string]: "0ms", background: "var(--grad-brand)" }}
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fde68a" aria-hidden style={{ animation: "spin-slow 8s linear infinite" }}>
                <path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" />
              </svg>
            </span>
            IT Staffing · Database · Managed IT
          </p>

          <h1 className="mt-7 text-[clamp(2.8rem,1.4rem+4.6vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
            <span className="word" style={{ ["--i" as string]: 0 }}>
              <span>
                <span className="text-gradient-live pb-[0.06em]">Smarter systems.</span>
              </span>
            </span>
            <br />
            <span className="word" style={{ ["--i" as string]: 2 }}>
              <span>Stronger</span>
              {"\u00A0"}
            </span>
            {/* Rotating word — pure CSS cycle; screen readers and search engines get "teams." */}
            <span className="fade-up inline-block" style={{ ["--d" as string]: "260ms" }}>
              <span className="rotator" aria-hidden>
                {rotating.map((w, i) => (
                  <span key={w} style={{ animationDelay: `${i * 2.6 - 0.6}s` }}>
                    <span className="text-rotator">{w}</span>.
                  </span>
                ))}
              </span>
              <span className="sr-only">teams.</span>
            </span>
          </h1>

          <p
            className="fade-up mt-7 max-w-[36rem] text-[17.5px] leading-relaxed text-ink-2 md:text-[19px]"
            style={{ ["--d" as string]: "320ms" }}
          >
            M &amp; K Technovations delivers the right people, with the right skills, at the right price — IT staffing,
            100% US-based database administration, ERP support and managed IT for enterprises and government agencies.
          </p>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "440ms" }}>
            <Link href="/services" className="btn btn-primary h-[54px] px-7 text-[15.5px]">
              Explore our services <ArrowRight />
            </Link>
            <Link href="/services/it-staffing" className="btn btn-ghost h-[54px] px-7 text-[15.5px]">
              Hire IT talent
            </Link>
          </div>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] text-muted" style={{ ["--d" as string]: "560ms" }}>
            {[
              ["#7c3aed", "Serving clients since 2013"],
              ["#0891b2", "Harrisburg, PA headquarters"],
              ["#059669", "Background-checked talent"],
            ].map(([c, t]) => (
              <span key={t} className="inline-flex items-center gap-2 font-medium">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                  <circle cx="12" cy="12" r="10" fill={c} opacity=".14" />
                  <path d="m7.5 12.5 3 3 6-6.5" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-5">
          <HeroPanel />
        </div>
      </div>
    </section>
  );
}
