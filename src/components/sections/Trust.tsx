import { trustGroups } from "@/lib/content";

/** Partner / accreditation logos. Each tile is a placeholder until real logos are supplied. */
export function Trust() {
  return (
    <section aria-labelledby="trust-title" className="relative border-y border-line bg-white py-20 md:py-24">
      <div className="container-x">
        <h2 id="trust-title" className="sr-only">
          Partnerships, accreditations and memberships
        </h2>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {trustGroups.map((g, gi) => (
            <div
              key={g.title}
              data-reveal
              style={{ ["--d" as string]: `${gi * 90}ms` }}
              className={g.items.length > 2 ? "md:col-span-6" : "md:col-span-3"}
            >
              <p className="text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-muted md:text-left">{g.title}</p>
              <ul className={`mt-6 grid gap-3 ${g.items.length > 2 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
                {g.items.map((it, i) => (
                  <li
                    key={i}
                    className="group grid h-20 place-items-center rounded-2xl bg-bg ring-1 ring-line transition-[box-shadow,translate,background-color] duration-500 ease-out-expo hover:-translate-y-1 hover:bg-white hover:shadow-card"
                  >
                    <span className="flex items-center gap-2 text-[13px] font-semibold text-muted/70 grayscale transition-colors duration-500 group-hover:text-accent">
                      <span className="h-5 w-5 rounded-md bg-current opacity-30" />
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
