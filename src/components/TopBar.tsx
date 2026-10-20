import { tickerHighlights } from "@/lib/content";

/**
 * Scrolling bar above the header with company highlights (plain text, no links).
 * Pure CSS marquee (transform only), pauses on hover, static for reduced-motion users.
 */
export function TopBar() {
  const dots = ["#22a887", "#3aace8", "#f8b24e"]; // logo green, blue, orange
  return (
    <div className="relative h-10 overflow-hidden text-white" style={{ background: "#0d2b45" }}>
      <div className="container-x flex h-full items-center gap-4">
        <span className="relative z-10 hidden shrink-0 items-center gap-2 rounded-full bg-white/12 py-1 pl-2.5 pr-3 text-[12px] font-semibold ring-1 ring-white/20 sm:flex">
          <span className="h-2 w-2 rounded-full bg-[#22a887]" />
          M &amp; K Technovations Inc.
        </span>

        <div
          className="group relative min-w-0 flex-1 overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
          }}
        >
          <p className="sr-only">{tickerHighlights.join(". ")}</p>
          <div aria-hidden className="ticker flex w-max group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 items-center">
                {tickerHighlights.map((text, i) => (
                  <li key={text} className="flex items-center gap-2.5 whitespace-nowrap px-6 text-[13.5px] font-medium text-white/85">
                    <span className="h-2 w-2 rotate-45 rounded-[2px]" style={{ background: dots[i % dots.length] }} />
                    {text}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
