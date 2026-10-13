"use client";

import { useEffect, useRef } from "react";

/**
 * Field of soft dots; moving the cursor sends ripples through it like touching water.
 * Draws only while a ripple is alive — when nothing moves, the canvas costs nothing.
 * An occasional ambient ripple keeps it alive while the band is on screen.
 */
export function RippleDots() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const GAP = 24;
    let W = 0,
      H = 0,
      dpr = 1;
    type Ripple = { x: number; y: number; t0: number };
    const ripples: Ripple[] = [];
    const LIFE = 2200; // ms
    const SPEED = 0.42; // px per ms

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      for (let i = ripples.length - 1; i >= 0; i--) if (now - ripples[i].t0 > LIFE) ripples.splice(i, 1);
      for (let y = GAP / 2; y < H; y += GAP) {
        for (let x = GAP / 2; x < W; x += GAP) {
          let glow = 0;
          for (const rp of ripples) {
            const age = now - rp.t0;
            const radius = age * SPEED;
            const d = Math.hypot(x - rp.x, y - rp.y);
            const band = Math.abs(d - radius);
            if (band < 40) glow += (1 - band / 40) * (1 - age / LIFE);
          }
          glow = Math.min(1, glow);
          const a = 0.16 + glow * 0.7;
          const s = 1.2 + glow * 2.2;
          ctx.fillStyle = `rgba(255,255,255,${a})`;
          ctx.beginPath();
          ctx.arc(x, y, s, 0, 6.2832);
          ctx.fill();
        }
      }
    };

    let raf = 0;
    let running = false;
    const loop = (now: number) => {
      draw(now);
      if (ripples.length) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const kick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    let visible = false;
    let lastSpawn = 0;
    const onMove = (e: PointerEvent) => {
      if (!visible || reduce) return;
      const now = performance.now();
      if (now - lastSpawn < 140) return;
      lastSpawn = now;
      const r = canvas.getBoundingClientRect();
      ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t0: now });
      if (ripples.length > 6) ripples.shift();
      kick();
    };

    let ambient = 0;
    const scheduleAmbient = () => {
      window.clearTimeout(ambient);
      if (!visible || reduce) return;
      ambient = window.setTimeout(() => {
        ripples.push({ x: W * (0.2 + Math.random() * 0.6), y: H * (0.25 + Math.random() * 0.5), t0: performance.now() });
        kick();
        scheduleAmbient();
      }, 3200);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) scheduleAmbient();
      else window.clearTimeout(ambient);
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const host = canvas.parentElement;
    host?.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(ambient);
      io.disconnect();
      ro.disconnect();
      host?.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />;
}
