"use client";

import { useEffect, useRef, useState } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

/**
 * Flowing "liquid light" gradient for the hero.
 *
 * Performance guards:
 *  - renders at ~half resolution (the field is soft, so it upscales invisibly)
 *  - pauses when off-screen or the tab is hidden
 *  - single still frame for reduced-motion users and low-power devices
 *  - waits for the browser to be idle so it never competes with first paint
 */

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
varying vec2 vUv;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
             mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;
  float t = uTime * 0.045;
  vec2 m = (uMouse - 0.5) * 0.35;

  vec2 q = vec2(fbm(p * 1.3 + vec2(0.0, t)), fbm(p * 1.3 + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p * 1.1 + 1.8 * q + m + vec2(1.7, 9.2) + t * 1.4),
                fbm(p * 1.1 + 1.8 * q - m + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.2 + 1.6 * r);

  vec3 bg    = vec3(0.980, 0.980, 0.973);
  vec3 sky   = vec3(0.70, 0.82, 1.00);
  vec3 lilac = vec3(0.82, 0.78, 1.00);
  vec3 aqua  = vec3(0.70, 0.95, 0.96);
  vec3 cobalt= vec3(0.141, 0.325, 1.00);

  vec3 col = mix(sky, lilac, smoothstep(-0.35, 0.45, q.x));
  col = mix(col, aqua, smoothstep(-0.05, 0.55, r.y) * 0.55);
  col = mix(col, cobalt, smoothstep(0.08, 0.62, f) * 0.9);

  // Keep the left (text) side calm and bright, let colour bloom to the right.
  float side = smoothstep(0.18, 0.92, uv.x + (uv.y - 0.5) * 0.3 + f * 0.5);
  float bottom = smoothstep(0.0, 0.38, uv.y);
  float mask = side * bottom;
  col = mix(bg, col, mask);

  gl_FragColor = vec4(col, 1.0);
}`;

export default function HeroShader() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower =
      (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2 || nav.connection?.saveData === true;
    const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    let still = reduce || lowPower;

    let renderer: Renderer | null = null;
    let raf = 0;
    let running = false;
    let visible = true;
    let disposed = false;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const start = () => {
      if (disposed) return;
      try {
        renderer = new Renderer({
          dpr: Math.min(window.devicePixelRatio || 1, 2) * (mobile ? 0.35 : 0.5),
          alpha: false,
          antialias: false,
          depth: false,
          powerPreference: "low-power",
        });
      } catch {
        return; // No WebGL — the CSS gradient underneath stays as the fallback.
      }
      const gl = renderer.gl;
      // No real GPU (software rendering)? Show one still frame instead of animating.
      const dbg = gl.getExtension("WEBGL_debug_renderer_info");
      const gpu = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : "";
      if (/swiftshader|llvmpipe|software|basic render/i.test(gpu)) still = true;
      gl.clearColor(0.98, 0.98, 0.973, 1);
      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.setAttribute("aria-hidden", "true");
      el.appendChild(canvas);

      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 8 },
          uRes: { value: [1, 1] },
          uMouse: { value: [0.5, 0.5] },
        },
      });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      const resize = () => {
        if (!renderer) return;
        const { width, height } = el.getBoundingClientRect();
        renderer.setSize(width, height);
        program.uniforms.uRes.value = [width, height];
        if (!running) renderer.render({ scene: mesh });
      };
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();

      const t0 = performance.now();
      const minDelta = mobile ? 1000 / 30 : 0; // 30fps is plenty for a slow field on phones
      let last = 0;
      const frame = (now: number) => {
        if (!renderer) return;
        if (now - last < minDelta) {
          raf = requestAnimationFrame(frame);
          return;
        }
        last = now;
        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;
        program.uniforms.uTime.value = 8 + (now - t0) / 1000;
        program.uniforms.uMouse.value = [mouse.x, mouse.y];
        renderer.render({ scene: mesh });
        raf = requestAnimationFrame(frame);
      };
      const play = () => {
        if (running || still || !visible || document.hidden) return;
        running = true;
        raf = requestAnimationFrame(frame);
      };
      const pause = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      renderer.render({ scene: mesh });
      setReady(true);

      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible) play();
        else pause();
      });
      io.observe(el);

      const onVis = () => (document.hidden ? pause() : play());
      document.addEventListener("visibilitychange", onVis);

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        mouse.tx = (e.clientX - r.left) / r.width;
        mouse.ty = 1 - (e.clientY - r.top) / r.height;
      };
      if (!still) window.addEventListener("pointermove", onMove, { passive: true });

      play();

      cleanup = () => {
        pause();
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("pointermove", onMove);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        canvas.remove();
        renderer = null;
      };
    };

    let cleanup = () => {};
    const hasIdle = typeof window.requestIdleCallback === "function";
    let handle = 0;
    const schedule = () => {
      handle = hasIdle ? window.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 300);
    };
    // Start only after the page has fully loaded, so it never competes with first paint.
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      disposed = true;
      window.removeEventListener("load", schedule);
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      cleanup();
    };
  }, []);

  return (
    <div
      ref={host}
      aria-hidden
      className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out-expo ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}
