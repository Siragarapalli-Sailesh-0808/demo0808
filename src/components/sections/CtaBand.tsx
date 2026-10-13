import Link from "next/link";
import { ArrowRight } from "../Icons";
import { MagneticLink } from "../MagneticLink";

/** Bold gradient call-to-action band. Glows are radial gradients (no blur filters) so scrolling stays smooth. */
export function CtaBand() {
  return (
    <section data-anim-zone className="relative py-20 md:py-28">
      <div className="container-x">
        <div
          className="relative isolate overflow-hidden rounded-[40px] px-6 py-16 text-center text-white md:px-12 md:py-24"
          style={{ background: "linear-gradient(120deg, #5b21b6 0%, #4338ca 35%, #1d4ed8 65%, #0e7490 100%)" }}
          data-reveal
        >
          <span aria-hidden className="orb -left-24 -top-32 -z-10 h-[460px] w-[460px]" style={{ ["--orb" as string]: "rgb(236 72 153 / 0.45)", animation: "drift 20s ease-in-out infinite" }} />
          <span aria-hidden className="orb -bottom-40 -right-20 -z-10 h-[520px] w-[520px]" style={{ ["--orb" as string]: "rgb(34 211 238 / 0.45)", animation: "drift 24s -6s ease-in-out infinite reverse" }} />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage: "radial-gradient(rgb(255 255 255 / 0.5) 1px, transparent 1.2px)",
              backgroundSize: "24px 24px",
              maskImage: "radial-gradient(60% 70% at 50% 50%, #000, transparent)",
              WebkitMaskImage: "radial-gradient(60% 70% at 50% 50%, #000, transparent)",
            }}
          />

          <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.08em] ring-1 ring-white/25">
            <span className="h-2 w-2 rounded-full bg-[#fde68a]" /> Let&apos;s talk
          </p>
          <h2 className="mx-auto mt-6 max-w-4xl text-[clamp(2.4rem,1.4rem+4.4vw,5rem)] font-extrabold leading-[1.04] tracking-[-0.035em] !text-white">
            Let&apos;s start the{" "}
            <span className="relative whitespace-nowrap">
              right work
              <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full md:-bottom-3 md:h-4">
                <path d="M4 14 C 80 4, 200 2, 296 10" fill="none" stroke="#fde68a" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-white/85">
            Tell us where you want to go. We&apos;ll bring the strategy, the engineering and the people to get you there.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticLink href="/contact" className="btn btn-white h-14 px-8 text-[16px]">
              Get in touch <ArrowRight />
            </MagneticLink>
            <Link href="/services/talent-staffing-solutions" className="btn h-14 px-8 text-[16px] text-white ring-1 ring-white/40 transition-colors hover:bg-white/10">
              Hire talent
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
