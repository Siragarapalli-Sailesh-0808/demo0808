import { Link } from "next-view-transitions";
import { openRoles } from "@/lib/content";
import { tones, toneOrder } from "@/lib/tones";
import { ArrowRight } from "./Icons";

/**
 * Scrolling "Now hiring" ticker above the header.
 * Pure CSS marquee (transform only), pauses on hover/focus, static for reduced-motion users.
 */
export function TopBar() {
  const items = openRoles.map((r, i) => ({ r, dot: tones[toneOrder[i % toneOrder.length]].c2 }));
  return (
    <div
      className="relative h-10 overflow-hidden text-white"
      style={{ background: "linear-gradient(90deg, #1e1b4b 0%, #1e3a8a 55%, #0c4a6e 100%)" }}
    >
      <div className="container-x flex h-full items-center gap-4">
        <span className="relative z-10 flex shrink-0 items-center gap-2 rounded-full bg-white/12 py-1 pl-2 pr-3 text-[12px] font-bold uppercase tracking-[0.08em] ring-1 ring-white/20">
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="ticker-dot absolute h-2 w-2 rounded-full bg-emerald-400" style={{ animation: "ping-soft 1.8s ease-out infinite" }} />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Now hiring
        </span>

        <div
          className="group relative min-w-0 flex-1 overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
          }}
        >
          <div className="ticker flex w-max group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                {items.map(({ r, dot }) => (
                  <li key={r} className="flex items-center">
                    <Link
                      href="/careers"
                      tabIndex={copy === 1 ? -1 : undefined}
                      className="flex items-center gap-2 whitespace-nowrap px-5 text-[13.5px] font-semibold text-white/90 transition-colors hover:text-white"
                    >
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: dot, boxShadow: `0 0 0 3px ${dot}33` }} />
                      {r}
                    </Link>
                    <span aria-hidden className="text-white/25">|</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <Link
          href="/careers"
          className="relative z-10 hidden shrink-0 items-center gap-1.5 text-[13px] font-semibold text-white/90 transition-colors hover:text-white md:inline-flex"
        >
          All openings <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
