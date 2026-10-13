"use client";

import { Link } from "next-view-transitions";
import { useRef } from "react";

/** A link that leans gently toward the cursor. Pointer-only; touch and keyboard behave normally. */
export function MagneticLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span data-magnetic className="inline-block p-4 -m-4" onPointerMove={move} onPointerLeave={leave}>
      <Link ref={ref} href={href} className={className}>
        {children}
      </Link>
    </span>
  );
}
