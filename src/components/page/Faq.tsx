"use client";

import { useState } from "react";
import type { Faq as FaqItem } from "@/lib/content-pages";

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <li key={f.q}>
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(on ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-[18px] font-semibold tracking-tight text-ink transition-colors hover:text-accent md:text-[20px]"
              >
                {f.q}
                <span
                  aria-hidden
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 transition-[rotate,background-color,color] duration-500 ease-out-expo ${
                    on ? "rotate-45 bg-navy text-white ring-transparent" : "ring-line-2"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div id={`faq-${i}`} className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-3xl pb-7 text-[16px] leading-relaxed text-ink-2">{f.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
