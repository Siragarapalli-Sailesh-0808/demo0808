"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { nav, services, solutions, capabilities } from "@/lib/content";
import { Logo } from "./Logo";
import { ArrowRight, Icon } from "./Icons";
import { TopBar, type TickerJob } from "./TopBar";
import { toneVars } from "@/lib/tones";

type Mega = "solutions" | "capabilities";

export function Header({ jobs = [] }: { jobs?: TickerJob[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<Mega | null>(null);
  const [mobile, setMobile] = useState(false);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, o: 0 });
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const bar = useRef<HTMLSpanElement>(null);
  const scrolledRef = useRef(false);
  const closeTimer = useRef<number | undefined>(undefined);

  const activeIndex = nav.findIndex((n) => {
    const base = n.href.split("#")[0];
    if (pathname === n.href) return true;
    if (base !== "/services" && base !== "" && pathname.startsWith(base + "/")) return true;
    if (n.href === "/services" && pathname.startsWith("/services")) return true;
    return false;
  });

  // Shrink, tuck the ticker away and update the progress line — one rAF per frame, transform only
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const next = y > 8;
        if (next !== scrolledRef.current) {
          scrolledRef.current = next;
          setScrolled(next);
        }
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
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
    <header
      data-scrolled={scrolled}
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo ${scrolled ? "-translate-y-10" : "translate-y-0"}`}
    >
      <TopBar jobs={jobs} />
      <div
        className={`relative transition-[background-color,box-shadow] duration-500 ease-out-expo ${
          scrolled || open || mobile ? "bg-white shadow-[0_1px_0_var(--color-line),0_10px_30px_-20px_rgb(11_18_32/0.25)]" : "bg-transparent"
        }`}
      >
        {/* reading progress */}
        <span
          ref={bar}
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left"
          style={{ background: "var(--color-brand-blue)", transform: "scaleX(0)" }}
        />
        <div
          className={`container-x flex items-center justify-between transition-[height] duration-500 ease-out-expo ${
            scrolled ? "h-[76px]" : "h-[96px]"
          }`}
        >
          <Logo imgClassName={scrolled ? "h-14" : "h-14 lg:h-[72px]"} />

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
                    className={`relative flex items-center gap-1 px-4 py-2 text-[15px] font-medium transition-colors duration-300 ${
                      item.highlight
                        ? "font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                        : i === activeIndex || open === item.mega
                          ? "text-accent"
                          : "text-ink-2 hover:text-accent"
                    }`}
                  >
                    {item.label}
                    {item.mega && (
                      <svg
                        aria-hidden
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        className={`transition-transform duration-300 ${open === item.mega ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    )}
                  </Link>
                </li>
              ))}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-[transform,width,opacity] duration-500 ease-out-expo"
                style={{
                  background: "var(--color-accent)",
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

      {/* Mobile sheet (positioned under the nav bar; the header itself is transformed) */}
      <div
        data-lenis-prevent
        className={`absolute inset-x-0 top-full ${scrolled ? "h-[calc(100dvh-76px)]" : "h-[calc(100dvh-136px)]"} overflow-y-auto bg-white transition-[opacity,visibility] duration-500 ease-out-expo lg:hidden ${
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
  if (which === "solutions") {
    return (
      <div className="grid grid-cols-12 gap-8">
        <ul className="col-span-8 grid grid-cols-2 gap-2">
          {solutions.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.href}
                style={toneVars(item.tone)}
                className="group flex gap-4 rounded-lg p-4 transition-colors duration-300 hover:bg-[var(--cs)]"
              >
                <span className="tone-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:-rotate-6">
                  <Icon name={item.icon} size={20} />
                </span>
                <span>
                  <span className="block font-display text-[15px] font-semibold text-ink group-hover:text-accent">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-[13.5px] leading-snug text-muted">{item.body}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/services"
          className="group relative col-span-4 flex flex-col justify-end overflow-hidden rounded-lg p-6 text-white"
          style={{ background: "var(--color-navy)" }}
        >
          <span
            aria-hidden
            className="orb -right-20 -top-20 h-64 w-64 transition-transform duration-700 ease-out-expo group-hover:scale-125"
            style={{ ["--orb" as string]: "rgb(255 255 255 / 0.35)" }}
          />
          <span className="relative text-[12px] font-semibold uppercase tracking-[0.08em] text-white/60">
            Workforce Solutions
          </span>
          <span className="relative mt-2 font-display text-xl font-semibold leading-tight">
            Flexible staffing and database support models tailored to your business.
          </span>
          <span className="relative mt-4 inline-flex items-center gap-2 text-[14px] font-semibold">
            Explore solutions <ArrowRight />
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-8">
      <ul className="col-span-8 grid grid-cols-2 gap-2">
        {capabilities.map((c) => (
          <li key={c.slug}>
            <Link
              href={c.href}
              style={toneVars(c.tone)}
              className="group flex gap-4 rounded-lg p-4 transition-colors duration-300 hover:bg-[var(--cs)]"
            >
              <span className="tone-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:-rotate-6">
                <Icon name={c.icon} size={20} />
              </span>
              <span>
                <span className="block font-display text-[15px] font-semibold text-ink group-hover:text-accent">
                  {c.title}
                </span>
                <span className="mt-0.5 block text-[13.5px] leading-snug text-muted">{c.body}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/services"
        className="group relative col-span-4 flex flex-col justify-end overflow-hidden rounded-lg p-6 text-white"
        style={{ background: "var(--color-navy)" }}
      >
        <span
          aria-hidden
          className="orb -right-20 -top-20 h-64 w-64 transition-transform duration-700 ease-out-expo group-hover:scale-125"
          style={{ ["--orb" as string]: "rgb(255 255 255 / 0.35)" }}
        />
        <span className="relative text-[12px] font-semibold uppercase tracking-[0.08em] text-white/60">
          Core Capabilities
        </span>
        <span className="relative mt-2 font-display text-xl font-semibold leading-tight">
          100% US-based DBA, ERP support, IT staffing and managed services.
        </span>
        <span className="relative mt-4 inline-flex items-center gap-2 text-[14px] font-semibold">
          View all capabilities <ArrowRight />
        </span>
      </Link>
    </div>
  );
}
