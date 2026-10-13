"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only cursor companion: a soft ring that trails the pointer, grows over
 * clickable things and shows a label for elements with data-cursor="Label".
 * The native cursor stays visible (no usability trade-off). The rAF loop only runs
 * while the ring is catching up, so an idle page costs nothing.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ring.current;
    const lab = label.current;
    if (!el || !lab) return;
    if (!window.matchMedia("(pointer: fine) and (hover: hover)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = -100,
      y = -100,
      tx = -100,
      ty = -100,
      raf = 0;
    const ease = reduce ? 1 : 0.2;

    const tick = () => {
      x += (tx - x) * ease;
      y += (ty - y) * ease;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (el.dataset.on !== "1") {
        x = tx;
        y = ty;
        el.dataset.on = "1";
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const hit = t?.closest?.("[data-cursor], a, button, [role=tab], input, textarea, select, label");
      if (!hit) {
        delete el.dataset.mode;
        return;
      }
      const text = hit.getAttribute("data-cursor");
      if (text) {
        lab.textContent = text;
        el.dataset.mode = "label";
      } else if (hit.matches("input, textarea, select")) {
        el.dataset.mode = "text";
      } else {
        el.dataset.mode = "link";
      }
    };
    const onLeave = () => {
      delete el.dataset.on;
    };
    const onDown = () => (el.dataset.down = "1");
    const onUp = () => delete el.dataset.down;

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={ring} aria-hidden className="cursor-ring">
      <span className="cursor-ring__circle" />
      <span ref={label} className="cursor-ring__label" />
    </div>
  );
}
