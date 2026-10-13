"use client";

import { Link } from "next-view-transitions";
import { useState } from "react";
import { caseStudies } from "@/lib/content";
import { ArrowLeft, ArrowRight, Check } from "../Icons";

export function CaseStudies() {
  const [i, setI] = useState(0);
  const c = caseStudies[i];
  const n = caseStudies.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <section id="case-studies" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal>
            <p className="eyebrow">Case studies</p>
            <h2 className="h-section mt-4">
              Proof in <span className="accent-word">delivery</span>
            </h2>
          </div>
          <div className="flex items-center gap-3" data-reveal style={{ ["--d" as string]: "80ms" }}>
            <span className="mr-2 font-display text-[14px] font-semibold tabular-nums text-muted">
              <span className="text-ink">0{i + 1}</span> / 0{n}
            </span>
            <button type="button" onClick={() => go(-1)} aria-label="Previous case study" className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-line-2 transition-colors duration-300 hover:bg-ink hover:text-white hover:ring-ink">
              <ArrowLeft />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next case study" className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-line-2 transition-colors duration-300 hover:bg-ink hover:text-white hover:ring-ink">
              <ArrowRight />
            </button>
          </div>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-16" data-reveal style={{ ["--d" as string]: "120ms" }}>
          {/* Visual */}
          <div className="relative lg:col-span-6">
            <div aria-hidden className="sd-parallax absolute -left-6 -top-6 h-[70%] w-[75%] rounded-[32px]" style={{ ["--p" as string]: "50px", background: "linear-gradient(135deg, #ddd6fe, #bfdbfe 55%, #a5f3fc)" }} />
            <div key={c.slug} className="wipe-in relative">
              <Dashboard bars={c.bars} title={c.service} />
            </div>
          </div>

          {/* Story */}
          <div key={c.slug + "-copy"} className="lg:col-span-6">
            <div className="fade-up flex flex-wrap gap-2" style={{ ["--d" as string]: "60ms" }}>
              <span className="rounded-full bg-[#f3eeff] px-3 py-1 text-[12.5px] font-semibold text-[#6d28d9]">{c.industry}</span>
              <span className="rounded-full bg-[#e2f8fc] px-3 py-1 text-[12.5px] font-semibold text-[#0e7490]">{c.service}</span>
            </div>
            <h3 className="fade-up mt-5 text-[clamp(1.6rem,1.2rem+1.4vw,2.35rem)] font-bold leading-[1.15]" style={{ ["--d" as string]: "120ms" }}>
              {c.title}
            </h3>
            <p className="fade-up mt-5 text-[16.5px] leading-relaxed text-ink-2" style={{ ["--d" as string]: "180ms" }}>
              {c.summary}
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-8">
              {c.results.map((r, k) => (
                <div key={r.label} className="fade-up" style={{ ["--d" as string]: `${240 + k * 70}ms` }}>
                  <dt className="sr-only">{r.label}</dt>
                  <dd className="font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-bold leading-none tracking-tight text-ink">{r.value}</dd>
                  <dd className="mt-2 text-[13.5px] leading-snug text-muted">{r.label}</dd>
                </div>
              ))}
            </dl>
            <Link href={`/insights/${c.slug}`} className="btn btn-primary fade-up mt-10" style={{ ["--d" as string]: "460ms" }}>
              Read the case study <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A small, code-drawn product screen — no image weight, crisp at any size. */
function Dashboard({ bars, title }: { bars: number[]; title: string }) {
  const max = Math.max(...bars);
  return (
    <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_40px_80px_-40px_rgb(11_18_32/0.35)] ring-1 ring-line">
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
        <span className="ml-3 truncate text-[12.5px] font-medium text-muted">{title} · Outcome report</span>
      </div>
      <div className="grid grid-cols-5">
        <aside className="col-span-1 hidden space-y-2 border-r border-line p-4 sm:block">
          {[1, 0, 0, 0, 0].map((a, k) => (
            <div key={k} className={`h-2.5 rounded-full ${a ? "bg-accent" : "bg-tint"}`} style={{ width: `${90 - k * 10}%` }} />
          ))}
        </aside>
        <div className="col-span-5 p-5 sm:col-span-4 md:p-6">
          <div className="grid grid-cols-3 gap-3">
            {["Throughput", "Availability", "Cost"].map((l, k) => (
              <div key={l} className="rounded-xl bg-tint p-3">
                <div className="text-[11px] font-medium text-muted">{l}</div>
                <div className="mt-1.5 h-2.5 rounded-full bg-ink/80" style={{ width: `${55 + k * 12}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-5 flex h-44 items-end gap-2.5 rounded-xl border border-line p-4">
            {bars.map((b, k) => (
              <div key={k} className="flex h-full flex-1 items-end">
                <div
                  className="w-full origin-bottom rounded-md"
                  style={{
                    background: k === bars.length - 1 ? "linear-gradient(180deg, #7c3aed, #2563eb)" : "linear-gradient(180deg, #e0e7ff, #dbeafe)", height: `${(b / max) * 100}%`, animation: `grow 1s ${0.15 + k * 0.06}s cubic-bezier(.16,1,.3,1) both` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-[12.5px] font-medium text-emerald-700">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-50">
              <Check size={12} />
            </span>
            Targets exceeded this quarter
          </div>
        </div>
      </div>
    </div>
  );
}
