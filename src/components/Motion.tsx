"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Site-wide motion layer:
 *  - Lenis smooth scrolling (skipped when the user prefers reduced motion)
 *  - One shared IntersectionObserver that reveals every [data-reveal] element
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Touch devices already have native momentum scrolling — skip Lenis there to save CPU.
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || touch) return;
    // Frame-rate independent easing; Lenis drives its own rAF loop and idles when nothing moves.
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out: quick start, silky stop
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      anchors: { offset: -80 },
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Pause looping animations in any [data-anim-zone] that is off-screen (saves GPU/CPU while scrolling)
  useEffect(() => {
    const zones = document.querySelectorAll<HTMLElement>("[data-anim-zone]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("anim-off", !e.isIntersecting);
      },
      { rootMargin: "80px 0px" },
    );
    zones.forEach((z) => io.observe(z));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    // Clip-path-masked headings have no visible area until revealed, and Chrome then never reports
    // them as intersecting — so watch their (unclipped) parent and reveal the heading through it.
    const proxyFor = new Map<Element, HTMLElement[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const targets = proxyFor.get(e.target) ?? [e.target as HTMLElement];
            targets.forEach((t) => t.classList.add("is-in"));
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    els.forEach((el) => {
      const watch = el.classList.contains("h-section") && el.parentElement ? el.parentElement : el;
      if (watch !== el) {
        const list = proxyFor.get(watch);
        if (list) list.push(el);
        else proxyFor.set(watch, el.hasAttribute("data-reveal") && watch.hasAttribute("data-reveal") ? [watch, el] : [el]);
      }
      io.observe(watch);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
