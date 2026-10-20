import { Link } from "next-view-transitions";
import { ArrowRight } from "../Icons";

/** Closing call to action: a calm navy band with a direct line to the team. */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="h-1" style={{ background: "var(--grad-brand)" }} />
      <div className="container-x grid gap-10 py-16 md:py-20 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7" data-reveal>
          <h2 className="max-w-[22ch] text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.12] !text-white">
            Need IT talent or dependable database support?
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
            Tell us about the role, the system or the project. Our team will get back to you with the right next step.
          </p>
        </div>
        <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end" data-reveal style={{ ["--d" as string]: "80ms" }}>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-white h-[52px] px-7 text-[15.5px]">
              Contact us <ArrowRight />
            </Link>
            <Link href="/careers" className="btn h-[52px] px-7 text-[15.5px] text-white ring-1 ring-white/35 transition-colors hover:bg-white/10">
              Find a job
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
