"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive waves background (hero).
 * Flowing noise-driven lines that bend away from the cursor with spring physics.
 *
 * Kept deliberately light: 2D canvas (no WebGL), ≤1.5× pixel density, 30fps cap,
 * starts after the page has loaded, pauses off-screen / in hidden tabs,
 * static single frame for "reduce motion", fewer lines and no pointer work on phones.
 */

// --- compact 2D simplex noise -------------------------------------------------
const perm = new Uint8Array(512);
{
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = 1337;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
}
const G = [1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 0, 1, 0, -1];
const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;
function noise(x: number, y: number) {
  const s = (x + y) * F2;
  const i = Math.floor(x + s);
  const j = Math.floor(y + s);
  const t = (i + j) * G2;
  const x0 = x - (i - t);
  const y0 = y - (j - t);
  const i1 = x0 > y0 ? 1 : 0;
  const j1 = 1 - i1;
  const x1 = x0 - i1 + G2;
  const y1 = y0 - j1 + G2;
  const x2 = x0 - 1 + 2 * G2;
  const y2 = y0 - 1 + 2 * G2;
  const ii = i & 255;
  const jj = j & 255;
  let n = 0;
  let t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 > 0) {
    const g = (perm[ii + perm[jj]] & 7) * 2;
    t0 *= t0;
    n += t0 * t0 * (G[g] * x0 + G[g + 1] * y0);
  }
  let t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 > 0) {
    const g = (perm[ii + i1 + perm[jj + j1]] & 7) * 2;
    t1 *= t1;
    n += t1 * t1 * (G[g] * x1 + G[g + 1] * y1);
  }
  let t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 > 0) {
    const g = (perm[ii + 1 + perm[jj + 1]] & 7) * 2;
    t2 *= t2;
    n += t2 * t2 * (G[g] * x2 + G[g + 1] * y2);
  }
  return 70 * n; // ≈ -1..1
}

export function Waves({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let W = 0,
      H = 0,
      rows = 0,
      cols = 0,
      gapY = small ? 34 : 22,
      gapX = small ? 22 : 16;
    let offset = new Float32Array(0); // vertical displacement from the cursor
    let vel = new Float32Array(0);
    let grad: CanvasGradient | null = null;
    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999, speed: 0, active: false };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rows = Math.ceil(H / gapY) + 2;
      cols = Math.ceil(W / gapX) + 2;
      offset = new Float32Array(rows * cols);
      vel = new Float32Array(rows * cols);
      grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, "rgba(124,58,237,0.05)");
      grad.addColorStop(0.45, "rgba(124,58,237,0.24)");
      grad.addColorStop(0.75, "rgba(79,70,229,0.36)");
      grad.addColorStop(1, "rgba(6,182,212,0.42)");
    };

    let t = 0;
    const draw = (step: number) => {
      t += step;
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = grad!;
      const R = 170;
      const R2 = R * R;
      const push = 1.8 + Math.min(mouse.speed, 40) * 0.16;
      for (let r = 0; r < rows; r++) {
        const baseY = (r - 1) * gapY;
        // fade lines at the very top and bottom of the hero
        const v = baseY / H;
        ctx.globalAlpha = Math.max(0, Math.min(1, v * 3)) * Math.max(0, Math.min(1, (1 - v) * 2.2));
        if (ctx.globalAlpha < 0.02) continue;
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const x = (c - 1) * gapX;
          const k = r * cols + c;
          const n = noise(x * 0.0016 + t * 0.06, baseY * 0.0045 - t * 0.04);
          let y = baseY + n * 38;
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y + offset[k] - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < R2) {
              const f = 1 - Math.sqrt(d2) / R;
              vel[k] += (dy >= 0 ? 1 : -1) * f * f * push;
            }
          }
          // spring back
          vel[k] += -offset[k] * 0.045;
          vel[k] *= 0.86;
          offset[k] += vel[k];
          y += offset[k];
          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      mouse.speed *= 0.9;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduce) {
      draw(0);
      return () => ro.disconnect();
    }

    let raf = 0;
    let running = false;
    let visible = true;
    let last = 0;
    const frameMs = small ? 1000 / 24 : 1000 / 30;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < frameMs) return;
      const dt = Math.min(0.1, (now - last) / 1000 || 0.033);
      last = now;
      draw(dt);
    };
    const play = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) play();
      else pause();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVis);

    const onMove = (e: PointerEvent) => {
      if (!running) return;
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (mouse.px > -9000) mouse.speed = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.active = mouse.y > -R_MARGIN && mouse.y < r.height + R_MARGIN;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.px = mouse.py = -9999;
    };
    const R_MARGIN = 200;
    if (finePointer && !small) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    // Start once the page has finished loading and the browser is idle.
    draw(0);
    let idle = 0;
    let delay = 0;
    const start = () => {
      // phones: wait a little longer so the first seconds stay fully responsive
      delay = window.setTimeout(
        () => {
          idle = (window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200)))(play) as number;
        },
        small ? 2500 : 0,
      );
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("load", start);
      window.clearTimeout(delay);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
