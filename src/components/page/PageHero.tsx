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
    <section className="grain relative isolate overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute -right-[10%] -top-[160px] h-[640px] w-[640px] rounded-full bg-accent/25 blur-[110px] will-change-transform"
          style={{ animation: "drift 20s ease-in-out infinite" }}
        />
        <div
          className="absolute right-[18%] top-[220px] h-[420px] w-[420px] rounded-full bg-[rgb(178_230_245)]/60 blur-[100px] will-change-transform"
          style={{ animation: "drift 24s -8s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute -right-[5%] top-[380px] h-[380px] w-[380px] rounded-full bg-[rgb(210_200_255)]/70 blur-[100px] will-change-transform"
          style={{ animation: "drift 28s -4s ease-in-out infinite" }}
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
