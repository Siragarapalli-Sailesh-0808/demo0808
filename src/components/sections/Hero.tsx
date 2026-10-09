import Link from "next/link";
import { ArrowRight } from "../Icons";
import { HeroBackdrop, HeroCards } from "./HeroVisual";

const line1 = ["Building", "enterprise", "technology", "that", "stays"];

export function Hero() {
  return (
    <section className="grain relative isolate flex min-h-[min(100svh,980px)] items-center overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <HeroBackdrop />

      <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow fade-up" style={{ ["--d" as string]: "0ms" }}>
            IT Consulting &amp; Talent Solutions
          </p>

          <h1 className="mt-6 text-[clamp(2.6rem,1.6rem+4.4vw,5.25rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
            {line1.map((w, i) => (
              <span key={w + i} className="word" style={{ ["--i" as string]: i }}>
                <span>{w}</span>
                {" "}
              </span>
            ))}
            <span className="word" style={{ ["--i" as string]: line1.length }}>
              <span className="accent-word">resilient.</span>
            </span>
          </h1>

          <p
            className="fade-up mt-7 max-w-[34rem] text-[17.5px] leading-relaxed text-ink-2 md:text-[19px]"
            style={{ ["--d" as string]: "320ms" }}
          >
            We design, modernize and run mission-critical systems — and bring in the expert talent that keeps them
            moving. Proven architecture, security-first delivery and outcomes you can measure.
          </p>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "440ms" }}>
            <Link href="/contact" className="btn btn-primary">
              Get in touch <ArrowRight />
            </Link>
            <Link href="#what-we-do" className="btn btn-ghost">
              Explore services
            </Link>
          </div>
        </div>

        <div className="relative hidden h-[540px] lg:col-span-5 lg:block">
          <HeroCards />
        </div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="relative h-11 w-[26px] rounded-full ring-1 ring-ink/20">
          <span className="absolute left-1/2 top-2 h-2 w-[3px] -translate-x-1/2 animate-bounce rounded-full bg-ink/50" />
        </div>
      </div>
    </section>
  );
}
