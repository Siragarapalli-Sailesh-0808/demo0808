import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/**
 * Inner-page hero. Uses CSS-only drifting light (no WebGL) so inner pages stay
 * featherweight; the homepage keeps the shader as the signature moment.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
  aside,
}: {
  eyebrow: string;
  title: [string, string];
  intro: string;
  crumbs: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section data-anim-zone className="relative isolate overflow-hidden pb-20 pt-44 md:pb-28 md:pt-52">
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* colour glows: radial gradients, not blur filters, so they cost nothing while scrolling */}
        <span
          className="orb -right-[12%] -top-[220px] h-[760px] w-[760px]"
          style={{ ["--orb" as string]: "rgb(124 58 237 / 0.28)", animation: "drift 22s ease-in-out infinite" }}
        />
        <span
          className="orb right-[16%] top-[160px] h-[560px] w-[560px]"
          style={{ ["--orb" as string]: "rgb(6 182 212 / 0.24)", animation: "drift 26s -8s ease-in-out infinite reverse" }}
        />
        <span
          className="orb -right-[6%] top-[320px] h-[480px] w-[480px]"
          style={{ ["--orb" as string]: "rgb(236 72 153 / 0.16)", animation: "drift 30s -4s ease-in-out infinite" }}
        />
        {/* fine blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(11 18 32 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(11 18 32 / 0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(70% 80% at 80% 30%, #000, transparent 75%)",
            WebkitMaskImage: "radial-gradient(70% 80% at 80% 30%, #000, transparent 75%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-x relative grid items-end gap-12 lg:grid-cols-12">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow fade-up mt-10" style={{ ["--d" as string]: "60ms" }}>
            {eyebrow}
          </p>
          <h1
            className="fade-up mt-5 text-[clamp(2.4rem,1.5rem+3.6vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.035em]"
            style={{ ["--d" as string]: "120ms" }}
          >
            {title[0]}
            <span className="accent-word">{title[1]}</span>
          </h1>
          <p
            className="fade-up mt-6 max-w-2xl text-[17.5px] leading-relaxed text-ink-2 md:text-[19px]"
            style={{ ["--d" as string]: "200ms" }}
          >
            {intro}
          </p>
          {children && (
            <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "280ms" }}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="fade-up lg:col-span-5" style={{ ["--d" as string]: "320ms" }}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
