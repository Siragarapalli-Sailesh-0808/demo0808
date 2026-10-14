"use client";

import { useEffect, useState } from "react";

/** Sticky in-page navigation that highlights the section in view. */
export function SubNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (vis.length) setActive(vis[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <div className="sticky top-[76px] z-30 border-y border-line bg-bg">
      <nav aria-label="On this page" className="container-x">
        <ul className="-mx-5 flex gap-1 overflow-x-auto px-5 py-3 md:mx-0 md:px-0">
          {items.map((i) => (
            <li key={i.id} className="shrink-0">
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? "true" : undefined}
                className={`block rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-300 ${
                  active === i.id ? "bg-[linear-gradient(100deg,#7c3aed,#2563eb)] text-white shadow-[0_8px_20px_-10px_#4f46e5]" : "text-muted hover:bg-tint hover:text-ink"
                }`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
