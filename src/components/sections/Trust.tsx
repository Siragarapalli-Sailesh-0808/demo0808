import { trustGroups } from "@/lib/content";

/**
 * Partners, accreditations and memberships as an endless, slow marquee.
 * Pure CSS (transform only); pauses on hover; tiles go from grey to colour.
 * Each tile is a placeholder until the real logos are supplied.
 */
const tileColors = ["#0d2b45", "#0f6fa8", "#0f8c6f", "#0d2b45", "#0f6fa8", "#c27510"];

export function Trust() {
  const tiles = trustGroups.flatMap((g) => g.items.map((label) => ({ label, group: g.title })));
  return (
    <section aria-labelledby="trust-title" data-anim-zone className="relative border-y border-line bg-white py-16 md:py-20">
      <div className="container-x">
        <h2 id="trust-title" className="sr-only">
          Technologies we support
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center" data-reveal>
          {trustGroups.map((g, i) => (
            <li key={g.title} className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-muted">
              <span className="h-2 w-2 rounded-full" style={{ background: tileColors[i * 2] }} />
              {g.title}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="group relative mt-10 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <div className="marquee flex w-max group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4 pr-4">
              {[...tiles, ...tiles].map((t, i) => {
                return (
                  <li
                    key={i}
                    title={t.group}
                    className="grid h-16 min-w-40 shrink-0 place-items-center rounded-md bg-white px-7 ring-1 ring-line"
                  >
                    <span className="text-[14.5px] font-semibold text-ink-2">{t.label}</span>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
