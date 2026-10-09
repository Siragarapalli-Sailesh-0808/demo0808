import { ArrowRight } from "../Icons";
import { MagneticLink } from "../MagneticLink";

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden py-28 md:py-40">
      {/* Drifting light — blurred once, then only moved (cheap on the GPU) */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute left-[8%] top-[10%] h-[420px] w-[420px] rounded-full bg-accent/25 blur-[100px] will-change-transform"
          style={{ animation: "drift 18s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[0%] right-[10%] h-[380px] w-[380px] rounded-full bg-[rgb(178_230_245)]/60 blur-[100px] will-change-transform"
          style={{ animation: "drift 22s -6s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute left-[45%] top-[40%] h-[300px] w-[300px] rounded-full bg-[rgb(210_200_255)]/70 blur-[90px] will-change-transform"
          style={{ animation: "drift 26s -3s ease-in-out infinite" }}
        />
      </div>

      <div className="container-x text-center">
        <p className="eyebrow justify-center" data-reveal>
          Let&apos;s talk
        </p>
        <h2
          className="mx-auto mt-6 max-w-4xl text-[clamp(2.6rem,1.4rem+5vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.035em]"
          data-reveal
          style={{ ["--d" as string]: "80ms" }}
        >
          Let&apos;s start the <span className="accent-word">right</span> work.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-ink-2" data-reveal style={{ ["--d" as string]: "160ms" }}>
          Tell us where you want to go. We&apos;ll bring the strategy, the engineering and the people to get you there.
        </p>
        <div className="mt-10 flex justify-center" data-reveal style={{ ["--d" as string]: "240ms" }}>
          <MagneticLink href="/contact" className="btn btn-primary h-14 px-8 text-[16px]">
            Get in touch <ArrowRight />
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
