"use client";

import { useEffect, useRef } from "react";
import type { Step } from "@/lib/content-pages";

/** Vertical process timeline; the accent line fills as you scroll through it. */
export function Steps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const f = fill.current;
    if (!el || !f) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      f.style.transform = "scaleY(1)";
      return;
    }
    let raf = 0;
    let active = false;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      f.style.transform = `scaleY(${p})`;
      el.querySelectorAll<HTMLElement>("[data-step]").forEach((s) => {
        const sr = s.getBoundingClientRect();
        s.toggleAttribute("data-on", sr.top < window.innerHeight * 0.6);
      });
    };
    const onScroll = () => {
      if (active && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      active = e.isIntersecting;
      onScroll();
    });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute bottom-6 left-[23px] top-6 w-px bg-line-2" />
      <span ref={fill} aria-hidden className="absolute bottom-6 left-[22px] top-6 w-[3px] origin-top rounded-full" style={{ transform: "scaleY(0)", background: "linear-gradient(180deg, #7c3aed, #2563eb, #06b6d4)" }} />
      {steps.map((s, i) => (
        <li key={s.title} data-step className="group relative flex gap-6 pb-12 last:pb-0">
          <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white font-display text-[15px] font-bold text-muted ring-1 ring-line-2 transition-[background-color,color,box-shadow] duration-500 group-data-[on]:bg-[#5b3df5] group-data-[on]:text-white group-data-[on]:ring-[#a78bfa] group-data-[on]:shadow-[0_10px_24px_-10px_#5b3df5]">
            {i + 1}
          </span>
          <div className="pt-2.5">
            <h3 className="text-[21px] font-bold">{s.title}</h3>
            <p className="mt-2 max-w-md text-[15.5px] leading-relaxed text-muted">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
