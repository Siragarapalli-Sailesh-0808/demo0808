import { trustGroups } from "@/lib/content";

/**
 * Partners, accreditations and memberships as an endless, slow marquee.
 * Pure CSS (transform only); pauses on hover; tiles go from grey to colour.
 * Each tile is a placeholder until the real logos are supplied.
 */
const tileColors = ["#7c3aed", "#2563eb", "#0891b2", "#db2777", "#059669", "#d97706"];

export function Trust() {
  const tiles = trustGroups.flatMap((g) => g.items.map((label) => ({ label, group: g.title })));
  return (
    <section aria-labelledby="trust-title" data-anim-zone className="relative border-y border-line bg-white py-16 md:py-20">
      <div className="container-x">
        <h2 id="trust-title" className="sr-only">
          Partnerships, accreditations and memberships
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
                const c = tileColors[i % tileColors.length];
                return (
                  <li
                    key={i}
                    title={t.group}
                    style={{ ["--tc" as string]: c }}
                    className="logo-tile grid h-20 w-48 shrink-0 place-items-center rounded-2xl bg-bg ring-1 ring-line"
                  >
                    <span className="flex items-center gap-2.5 text-[14px] font-semibold">
                      <span className="logo-mark h-7 w-7 rounded-lg" />
                      {t.label}
                    </span>
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
