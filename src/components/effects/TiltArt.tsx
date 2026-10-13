"use client";

import { useRef } from "react";

/**
 * Hover-only 3D tilt with a light sheen that is masked to the artwork's own shape.
 * No listeners run unless the pointer is over the artwork.
 */
export function TiltArt({ children, maskSrc }: { children: React.ReactNode; maskSrc: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--rx", `${(0.5 - py) * 14}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * 16}deg`);
      el.style.setProperty("--sx", `${px * 100}%`);
      el.style.setProperty("--sy", `${py * 100}%`);
      el.dataset.hover = "1";
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    delete el.dataset.hover;
  };

  return (
    <div style={{ perspective: "1100px" }} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div
        ref={ref}
        className="tilt-art relative transition-transform duration-500 ease-out-expo data-[hover]:duration-150"
        style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))", transformStyle: "preserve-3d" }}
      >
        {children}
        {/* sheen, clipped to the artwork's silhouette */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [[data-hover]>&]:opacity-100"
          style={{
            background: "radial-gradient(420px circle at var(--sx, 50%) var(--sy, 30%), rgb(255 255 255 / 0.55), transparent 55%)",
            WebkitMaskImage: `url(${maskSrc})`,
            maskImage: `url(${maskSrc})`,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            mixBlendMode: "soft-light",
          }}
        />
      </div>
    </div>
  );
}
