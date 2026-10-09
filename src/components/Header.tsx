"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { nav, services, solutions, industryGroups } from "@/lib/content";
import { Logo } from "./Logo";
import { ArrowRight, Icon } from "./Icons";

type Mega = "services" | "solutions" | "industries";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<Mega | null>(null);
  const [mobile, setMobile] = useState(false);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, o: 0 });
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimer = useRef<number | undefined>(undefined);

  const activeIndex = nav.findIndex((n) => pathname === n.href || pathname.startsWith(n.href + "/"));

  // Shrink + border once the page scrolls
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const moveTo = useCallback((i: number) => {
    const el = linkRefs.current[i];
    if (!el) return setIndicator((s) => ({ ...s, o: 0 }));
    setIndicator({ x: el.offsetLeft, w: el.offsetWidth, o: 1 });
  }, []);

  const rest = useCallback(() => {
    if (activeIndex >= 0) moveTo(activeIndex);
    else setIndicator((s) => ({ ...s, o: 0 }));
  }, [activeIndex, moveTo]);

  useLayoutEffect(() => {
    rest();
  }, [rest]);

  // Close menus on route change
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    document.documentElement.style.overflow = mobile ? "hidden" : "";
    if (mobile) lenis?.stop();
    else lenis?.start();
  }, [mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = (m?: Mega) => {
    window.clearTimeout(closeTimer.current);
    setOpen(m ?? null);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative transition-[background-color,box-shadow,height] duration-500 ease-out-expo ${
          scrolled || open ? "bg-white/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div
          className={`container-x flex items-center justify-between transition-[height] duration-500 ease-out-expo ${
            scrolled ? "h-[68px]" : "h-[84px]"
          }`}
        >
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block" onMouseLeave={() => { rest(); scheduleClose(); }}>
            <ul className="relative flex items-center gap-1">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    ref={(el) => {
                      linkRefs.current[i] = el;
                    }}
                    href={item.href}
                    aria-current={i === activeIndex ? "page" : undefined}
                    aria-expanded={item.mega ? open === item.mega : undefined}
                    onMouseEnter={() => {
                      moveTo(i);
                      openMega(item.mega);
                    }}
                    onFocus={() => {
                      moveTo(i);
                      openMega(item.mega);
                    }}
                    className={`relative block px-4 py-2 text-[15px] font-medium transition-colors duration-300 ${
                      i === activeIndex || open === item.mega ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-0.5 left-0 h-[1.5px] rounded-full bg-ink transition-[transform,width,opacity] duration-500 ease-out-expo"
                style={{
                  width: Math.max(indicator.w - 32, 0),
                  transform: `translateX(${indicator.x + 16}px)`,
                  opacity: indicator.o,
                }}
              />
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn btn-primary hidden h-11 px-5 text-[14px] md:inline-flex">
              Get in touch <ArrowRight />
            </Link>
            <button
              type="button"
              className="relative grid h-11 w-11 place-items-center rounded-full ring-1 ring-line-2 lg:hidden"
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              onClick={() => setMobile((v) => !v)}
            >
              <span className={`absolute h-[1.5px] w-5 bg-ink transition-[rotate,translate] duration-500 ease-out-expo ${mobile ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-[1.5px] w-5 bg-ink transition-[rotate,translate] duration-500 ease-out-expo ${mobile ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <div
          className={`absolute inset-x-0 top-full hidden lg:block transition-[opacity,translate,visibility] duration-500 ease-out-expo ${
            open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
          }`}
          onMouseEnter={() => openMega(open ?? undefined)}
          onMouseLeave={() => {
            rest();
            scheduleClose();
          }}
        >
          <div className="border-t border-line bg-white shadow-[0_24px_48px_-24px_rgb(11_18_32/0.18)]">
            <div className="container-x py-8">{open && <MegaPanel which={open} />}</div>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        data-lenis-prevent
        className={`fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto bg-white transition-[opacity,visibility] duration-500 ease-out-expo lg:hidden ${
          mobile ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-x py-6">
          <ul className="divide-y divide-line">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={`transition-[opacity,translate] duration-700 ease-out-expo ${mobile ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                style={{ transitionDelay: mobile ? `${60 + i * 40}ms` : "0ms" }}
              >
                <Link href={item.href} className="flex items-center justify-between py-5 font-display text-2xl font-semibold tracking-tight">
                  {item.label}
                  <ArrowRight size={20} className="text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn-primary mt-8 w-full">
            Get in touch <ArrowRight />
          </Link>
        </nav>
      </div>
    </header>
  );
}

function MegaPanel({ which }: { which: Mega }) {
  if (which === "industries") {
    return (
      <div className="grid grid-cols-4 gap-8">
        {industryGroups.map((g) => (
          <div key={g.key}>
            <Link href={`/industries#${g.key}`} className="font-display text-[15px] font-semibold text-ink hover:text-accent">
              {g.label}
            </Link>
            <ul className="mt-3 space-y-2">
              {g.sectors.map((s) => (
                <li key={s} className="text-[14px] text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  const list =
    which === "services"
      ? services.map((s) => ({ href: `/services/${s.slug}`, title: s.title, sub: s.short, icon: s.icon }))
      : solutions.map((s) => ({ href: `/solutions/${s.slug}`, title: s.title, sub: s.items.slice(0, 2).join(" · "), icon: s.icon }));

  return (
    <div className="grid grid-cols-12 gap-8">
      <ul className="col-span-8 grid grid-cols-2 gap-2">
        {list.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group flex gap-4 rounded-2xl p-4 transition-colors duration-300 hover:bg-tint">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <Icon name={l.icon} size={20} />
              </span>
              <span>
                <span className="block font-display text-[15px] font-semibold text-ink">{l.title}</span>
                <span className="mt-0.5 block text-[13.5px] leading-snug text-muted">{l.sub}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={which === "services" ? "/services" : "/solutions"}
        className="group relative col-span-4 flex flex-col justify-end overflow-hidden rounded-2xl bg-ink p-6 text-white"
      >
        <span
          aria-hidden
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent opacity-70 blur-3xl transition-transform duration-700 ease-out-expo group-hover:scale-125"
        />
        <span className="relative text-[12px] font-semibold uppercase tracking-[0.08em] text-white/60">
          {which === "services" ? "Services" : "Solutions"}
        </span>
        <span className="relative mt-2 font-display text-xl font-semibold leading-tight">
          {which === "services" ? "End-to-end capability, engaged your way." : "Built for complex, regulated operations."}
        </span>
        <span className="relative mt-4 inline-flex items-center gap-2 text-[14px] font-semibold">
          Explore all <ArrowRight />
        </span>
      </Link>
    </div>
  );
}
