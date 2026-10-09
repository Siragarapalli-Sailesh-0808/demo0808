"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { Check } from "../Icons";

const HeroShader = dynamic(() => import("../HeroShader"), { ssr: false });

export function HeroBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      {/* CSS fallback / first paint — matches the shader palette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 85% 30%, rgb(36 83 255 / 0.35), transparent 60%), radial-gradient(45% 55% at 70% 70%, rgb(178 230 245 / 0.6), transparent 70%), radial-gradient(40% 50% at 95% 85%, rgb(210 200 255 / 0.7), transparent 70%), var(--color-bg)",
        }}
      />
      <HeroShader />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}

const avatars = ["AK", "SR", "MP", "JL"];

export function HeroCards() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--px", x.toFixed(4));
      el.style.setProperty("--py", y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
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
    <div ref={ref} className="absolute inset-0">
      {/* Delivery health */}
      <div className="absolute right-4 top-6 w-[300px]" style={layer(-14)}>
        <div className="fade-up" style={{ ["--d" as string]: "520ms" }}>
          <div className="rounded-2xl bg-white/90 p-5 shadow-[0_30px_60px_-30px_rgb(11_18_32/0.35)] ring-1 ring-white" style={{ animation: "float 7s ease-in-out infinite" }}>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">Program health</span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-semibold text-emerald-700">On track</span>
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-display text-[34px] font-bold leading-none tracking-tight">98.7%</span>
              <span className="pb-1 text-[12.5px] font-medium text-emerald-600">+4.2%</span>
            </div>
            <svg viewBox="0 0 260 64" className="mt-3 h-16 w-full" aria-hidden>
              <defs>
                <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#2453ff" stopOpacity=".22" />
                  <stop offset="1" stopColor="#2453ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 50 C30 46 40 30 70 34 S110 52 140 36 190 14 215 22 245 10 260 6 V64 H0Z" fill="url(#spark)" />
              <path
                d="M0 50 C30 46 40 30 70 34 S110 52 140 36 190 14 215 22 245 10 260 6"
                fill="none"
                stroke="#2453ff"
                strokeWidth="2.2"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
                style={{ animation: "draw 2s 0.9s var(--ease-out-expo) both" }}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Talent bench */}
      <div className="absolute bottom-0 left-0 w-[280px]" style={layer(22)}>
        <div className="fade-up" style={{ ["--d" as string]: "680ms" }}>
          <div className="rounded-2xl bg-white/90 p-5 shadow-[0_30px_60px_-30px_rgb(11_18_32/0.35)] ring-1 ring-white" style={{ animation: "float 8s 1s ease-in-out infinite" }}>
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">Talent ready to deploy</span>
            <div className="mt-3 flex items-center">
              {avatars.map((a, i) => (
                <span
                  key={a}
                  className="-ml-2 grid h-10 w-10 place-items-center rounded-full text-[11.5px] font-bold text-white ring-2 ring-white first:ml-0"
                  style={{ background: ["#2453ff", "#0b1220", "#5b7cff", "#1b40d6"][i] }}
                >
                  {a}
                </span>
              ))}
              <span className="ml-3 whitespace-nowrap text-[13px] font-semibold text-ink-2">+ 120 specialists</span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {[
                ["Cloud architects", 82],
                ["Data engineers", 64],
                ["Site reliability", 48],
              ].map(([label, v], i) => (
                <li key={label as string}>
                  <div className="flex justify-between text-[12.5px] text-ink-2">
                    <span>{label}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-tint">
                    <div
                      className="h-full origin-left rounded-full bg-accent"
                      style={{ width: `${v}%`, animation: `progress 1.4s ${1 + i * 0.12}s var(--ease-out-expo) both` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Security pill */}
      <div className="absolute right-0 top-[52%]" style={layer(-30)}>
        <div className="fade-up" style={{ ["--d" as string]: "820ms" }}>
          <div className="flex items-center gap-2.5 rounded-full bg-ink py-2.5 pl-2.5 pr-5 text-white shadow-[0_20px_40px_-20px_rgb(11_18_32/0.6)]" style={{ animation: "float 6s 0.5s ease-in-out infinite" }}>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent">
              <Check size={14} />
            </span>
            <span className="text-[13.5px] font-semibold">Security-first delivery</span>
          </div>
        </div>
      </div>

    </div>
  );
}
