import Image from "next/image";
import heroArt from "../../../public/hero-3d.webp";
import { Waves } from "../effects/Waves";
import { TiltArt } from "../effects/TiltArt";

/**
 * Hero background: static CSS colour mesh (no WebGL, no per-frame work → smooth scrolling).
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 52% at 88% 30%, rgb(124 58 237 / 0.20), transparent 70%), radial-gradient(38% 46% at 72% 78%, rgb(6 182 212 / 0.16), transparent 70%), radial-gradient(30% 40% at 100% 95%, rgb(236 72 153 / 0.12), transparent 70%), radial-gradient(40% 40% at 0% 0%, rgb(124 58 237 / 0.07), transparent 70%), var(--color-bg)",
        }}
      />
      {/* interactive waves — flow on their own and part around the cursor */}
      <Waves />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}

/** Custom 3D artwork (rendered once, served as an optimized image) with two glass badges. */
export function HeroPanel() {
  return (
    <div className="fade-up relative mx-auto w-full max-w-[600px]" style={{ ["--d" as string]: "150ms" }}>
      {/* soft halo behind the artwork */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgb(255 255 255 / 0.95), rgb(237 233 254 / 0.75) 55%, rgb(224 242 254 / 0.0) 100%)",
        }}
      />
      <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-[#7c3aed]/10" />
      <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#2563eb]/15" />

      <div className="relative" style={{ animation: "float 8s ease-in-out infinite" }}>
        <TiltArt maskSrc={heroArt.src}>
        <Image
          src={heroArt}
          alt="Colourful 3D shapes representing connected technology systems and teams"
          priority
          sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, 90vw"
          className="h-auto w-full select-none"
          draggable={false}
        />
        </TiltArt>
      </div>

      {/* Glass badges */}
      <div className="absolute -left-2 bottom-[12%] sm:left-0" >
        <div className="fade-up" style={{ ["--d" as string]: "650ms" }}>
          <div
            className="flex items-center gap-3 rounded-2xl bg-white/90 py-3 pl-3 pr-5 shadow-[0_24px_50px_-24px_rgb(76_29_149/0.45)] ring-1 ring-white"
            style={{ animation: "float 7s 1.2s ease-in-out infinite" }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: "linear-gradient(135deg,#a78bfa,#6d28d9)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <circle cx="9" cy="8" r="3.2" />
                <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
                <circle cx="17" cy="9.5" r="2.4" />
                <path d="M16 14.6a4.5 4.5 0 0 1 5 4.4" />
              </svg>
            </span>
            <span>
              <span className="block font-display text-[17px] font-extrabold leading-tight text-ink">2,500+</span>
              <span className="block text-[12.5px] font-medium text-muted">experts placed</span>
            </span>
          </div>
        </div>
      </div>
      <div className="absolute -right-2 top-[10%] hidden sm:block">
        <div className="fade-up" style={{ ["--d" as string]: "800ms" }}>
          <div
            className="flex items-center gap-3 rounded-2xl bg-white/90 py-3 pl-3 pr-5 shadow-[0_24px_50px_-24px_rgb(14_116_144/0.45)] ring-1 ring-white"
            style={{ animation: "float 6.5s 0.4s ease-in-out infinite" }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: "linear-gradient(135deg,#22d3ee,#0e7490)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            <span>
              <span className="block font-display text-[17px] font-extrabold leading-tight text-ink">98%</span>
              <span className="block text-[12.5px] font-medium text-muted">client retention</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
