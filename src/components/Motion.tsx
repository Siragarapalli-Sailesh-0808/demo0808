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

  // Buttons: click ripple + gentle magnetic pull toward the cursor (desktop)
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current: HTMLElement | null = null;

    const onDown = (e: PointerEvent) => {
      const btn = (e.target as Element | null)?.closest?.<HTMLElement>(".btn");
      if (!btn || reduce) return;
      const r = btn.getBoundingClientRect();
      const dot = document.createElement("span");
      dot.className = "ripple";
      dot.style.left = `${e.clientX - r.left}px`;
      dot.style.top = `${e.clientY - r.top}px`;
      btn.appendChild(dot);
      dot.addEventListener("animationend", () => dot.remove(), { once: true });
    };
    const release = () => {
      if (!current) return;
      current.style.removeProperty("--bx");
      current.style.removeProperty("--by");
      current = null;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const btn = (e.target as Element | null)?.closest?.<HTMLElement>(".btn");
      if (!btn || btn.closest("[data-magnetic]")) return release();
      if (current && current !== btn) release();
      current = btn;
      const r = btn.getBoundingClientRect();
      btn.style.setProperty("--bx", `${(e.clientX - (r.left + r.width / 2)) * 0.18}px`);
      btn.style.setProperty("--by", `${(e.clientY - (r.top + r.height / 2)) * 0.28}px`);
    };

    document.addEventListener("pointerdown", onDown, { passive: true });
    if (fine && !reduce) document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointermove", onMove);
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
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
