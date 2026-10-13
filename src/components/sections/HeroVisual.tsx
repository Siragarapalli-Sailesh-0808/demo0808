"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import { Check, Icon } from "../Icons";

const HeroShader = dynamic(() => import("../HeroShader"), { ssr: false });

export function HeroBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      {/* CSS first paint / fallback — matches the shader palette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 92% 18%, rgb(124 58 237 / 0.22), transparent 70%), radial-gradient(40% 50% at 70% 75%, rgb(6 182 212 / 0.20), transparent 70%), radial-gradient(35% 45% at 100% 90%, rgb(236 72 153 / 0.14), transparent 70%), radial-gradient(40% 40% at 0% 0%, rgb(124 58 237 / 0.08), transparent 70%), var(--color-bg)",
        }}
      />
      <HeroShader />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}

const avatars = [
  ["AK", "#6d28d9"],
  ["SR", "#1d4ed8"],
  ["MP", "#0e7490"],
  ["JL", "#be185d"],
];

const orbitNodes = [
  { a: 0, r: 46, c: "#7c3aed" },
  { a: 72, r: 46, c: "#2563eb" },
  { a: 144, r: 46, c: "#06b6d4" },
  { a: 216, r: 46, c: "#ec4899" },
  { a: 288, r: 46, c: "#10b981" },
  { a: 40, r: 33, c: "#f59e0b" },
  { a: 160, r: 33, c: "#7c3aed" },
  { a: 280, r: 33, c: "#2563eb" },
];

/** Colourful hero illustration: gradient mesh panel, orbiting network and floating data cards. */
export function HeroPanel() {
  const ref = useRef<HTMLDivElement>(null);

  // Gentle mouse parallax — only CSS variables on one element, eased in rAF, stops when settled
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0;
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--px", x.toFixed(4));
      el.style.setProperty("--py", y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const layer = (depth: number): React.CSSProperties => ({
    transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
  });

  return (
    <div ref={ref} className="fade-up relative mx-auto aspect-[1/1.02] w-full max-w-[540px]" style={{ ["--d" as string]: "200ms" }}>
      {/* Mesh panel */}
      <div
        className="absolute inset-0 overflow-hidden rounded-[40px] ring-1 ring-white/70"
        style={{
          background:
            "radial-gradient(55% 50% at 18% 18%, #c4b5fd, transparent 70%), radial-gradient(55% 55% at 88% 22%, #93c5fd, transparent 70%), radial-gradient(65% 55% at 72% 92%, #67e8f9, transparent 70%), radial-gradient(45% 45% at 10% 88%, #f9a8d4, transparent 70%), linear-gradient(135deg, #ede9fe, #e0f2fe)",
          boxShadow: "0 50px 100px -50px rgb(79 70 229 / 0.55)",
        }}
      >
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgb(255 255 255 / 0.9) 1.2px, transparent 1.3px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Orbiting network (rotates as one composited layer) */}
        <div className="absolute inset-0 grid place-items-center" style={layer(8)}>
          <div className="relative aspect-square w-[78%]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              <circle cx="50" cy="50" r="46" fill="none" stroke="white" strokeOpacity=".75" strokeWidth=".5" />
              <circle cx="50" cy="50" r="33" fill="none" stroke="white" strokeOpacity=".75" strokeWidth=".5" strokeDasharray="1.5 2" />
              <circle cx="50" cy="50" r="20" fill="white" fillOpacity=".35" />
            </svg>
            <div className="absolute inset-0" style={{ animation: "spin-slow 60s linear infinite" }}>
              {orbitNodes.map((n, i) => {
                const rad = (n.a * Math.PI) / 180;
                return (
                  <span
                    key={i}
                    className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-[3px] ring-white"
                    style={{
                      left: `${50 + n.r * Math.cos(rad)}%`,
                      top: `${50 + n.r * Math.sin(rad)}%`,
                      background: n.c,
                      boxShadow: `0 6px 14px -4px ${n.c}`,
                    }}
                  />
                );
              })}
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <span
                className="grid h-[26%] w-[26%] place-items-center rounded-[28%] font-display text-[clamp(1.1rem,0.8rem+1.2vw,1.8rem)] font-extrabold text-white shadow-[0_20px_40px_-14px_rgb(79_70_229/0.9)] ring-4 ring-white/70"
                style={{ background: "var(--grad-brand)" }}
              >
                {site.mark}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Program health card */}
      <div className="absolute -left-1 top-[3%] w-[54%] max-w-[250px] sm:-left-8" style={layer(-16)}>
        <div className="fade-up" style={{ ["--d" as string]: "560ms" }}>
          <div className="rounded-2xl bg-white p-4 shadow-[0_30px_60px_-28px_rgb(11_18_32/0.45)] sm:p-5" style={{ animation: "float 7s ease-in-out infinite" }}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted">Program health</span>
              <span className="hidden rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 sm:inline">On track</span>
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-display text-[28px] font-extrabold leading-none tracking-tight sm:text-[32px]">98.7%</span>
              <span className="pb-0.5 text-[12px] font-semibold text-emerald-700">▲ 4.2%</span>
            </div>
            <svg viewBox="0 0 260 64" className="mt-2 h-12 w-full sm:h-14" aria-hidden>
              <defs>
                <linearGradient id="spark-stroke" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#7c3aed" />
                  <stop offset=".6" stopColor="#2563eb" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#6366f1" stopOpacity=".25" />
                  <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 50 C30 46 40 30 70 34 S110 52 140 36 190 14 215 22 245 10 260 6 V64 H0Z" fill="url(#spark-fill)" />
              <path
                d="M0 50 C30 46 40 30 70 34 S110 52 140 36 190 14 215 22 245 10 260 6"
                fill="none"
                stroke="url(#spark-stroke)"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
                style={{ animation: "draw 2s 0.9s var(--ease-out-expo) both" }}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Talent card */}
      <div className="absolute -right-1 -bottom-[4%] w-[56%] max-w-[250px] sm:-right-8" style={layer(20)}>
        <div className="fade-up" style={{ ["--d" as string]: "700ms" }}>
          <div className="rounded-2xl bg-white p-4 shadow-[0_30px_60px_-28px_rgb(11_18_32/0.45)] sm:p-5" style={{ animation: "float 8s 1s ease-in-out infinite" }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted">Talent ready to deploy</span>
            <div className="mt-3 flex items-center">
              {avatars.map(([a, c]) => (
                <span
                  key={a}
                  className="-ml-2 grid h-9 w-9 place-items-center rounded-full text-[11px] font-bold text-white ring-2 ring-white first:ml-0"
                  style={{ background: c }}
                >
                  {a}
                </span>
              ))}
              <span className="ml-3 whitespace-nowrap text-[12.5px] font-semibold text-ink-2">+120 experts</span>
            </div>
            <ul className="mt-3 hidden space-y-2 sm:block">
              {(
                [
                  ["Cloud architects", 82, "#7c3aed, #2563eb"],
                  ["Data engineers", 64, "#2563eb, #06b6d4"],
                ] as const
              ).map(([label, v, g], i) => (
                <li key={label}>
                  <span className="text-[12px] text-ink-2">{label}</span>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-tint">
                    <div
                      className="h-full origin-left rounded-full"
                      style={{
                        width: `${v}%`,
                        background: `linear-gradient(90deg, ${g})`,
                        animation: `progress 1.4s ${1 + i * 0.12}s var(--ease-out-expo) both`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <div className="absolute right-[6%] top-[4%] hidden sm:block" style={layer(-26)}>
        <div className="fade-up" style={{ ["--d" as string]: "820ms" }}>
          <Chip icon="cloud" label="Cloud" color="#2563eb" delay="0.4s" />
        </div>
      </div>
      <div className="absolute bottom-[30%] -left-4 hidden sm:block" style={layer(28)}>
        <div className="fade-up" style={{ ["--d" as string]: "900ms" }}>
          <Chip icon="data" label="Data & AI" color="#0891b2" delay="1.2s" />
        </div>
      </div>
      <div className="absolute bottom-[8%] left-[4%] hidden sm:block" style={layer(-20)}>
        <div className="fade-up" style={{ ["--d" as string]: "980ms" }}>
          <div
            className="flex items-center gap-2 rounded-full bg-ink py-2 pl-2 pr-4 text-white shadow-[0_20px_40px_-20px_rgb(11_18_32/0.7)]"
            style={{ animation: "float 6s 0.5s ease-in-out infinite" }}
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500">
              <Check size={13} />
            </span>
            <span className="text-[12.5px] font-semibold">Security-first delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ icon, label, color, delay }: { icon: "cloud" | "data"; label: string; color: string; delay: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 shadow-[0_18px_36px_-18px_rgb(11_18_32/0.45)]"
      style={{ animation: `float 7s ${delay} ease-in-out infinite` }}
    >
      <span className="grid h-7 w-7 place-items-center rounded-full text-white" style={{ background: color }}>
        <Icon name={icon} size={15} />
      </span>
      <span className="text-[13px] font-semibold text-ink">{label}</span>
    </div>
  );
}
