"use client";

import { useEffect, useRef } from "react";
import type { Step } from "@/lib/content-pages";

/** Vertical process timeline; the accent line fills as you scroll through it. */
export function Steps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  // Light up steps as they pass the middle of the screen (IntersectionObserver, no per-frame scroll work)
  useEffect(() => {
    const el = ref.current;
    const f = fill.current;
    if (!el || !f) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    const update = () => {
      let last = -1;
      items.forEach((it, i) => {
        if (it.hasAttribute("data-on")) last = i;
      });
      f.style.transform = `scaleY(${items.length > 1 ? Math.max(0, last) / (items.length - 1) : 1})`;
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const t = e.target as HTMLElement;
          // on = the step has reached the middle band (or scrolled past it)
          const on = e.isIntersecting || e.boundingClientRect.top < 0;
          t.toggleAttribute("data-on", on);
        }
        update();
      },
      { rootMargin: "0px 0px -45% 0px" },
    );
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute bottom-6 left-[23px] top-6 w-px bg-line-2" />
      <span ref={fill} aria-hidden className="absolute bottom-6 left-[22px] top-6 w-[3px] origin-top rounded-full" style={{ transform: "scaleY(0)", transition: "transform 0.8s cubic-bezier(.16,1,.3,1)", background: "linear-gradient(180deg, #7c3aed, #2563eb, #06b6d4)" }} />
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
