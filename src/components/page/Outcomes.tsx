import { Check } from "../Icons";

/** Dark results panel used on service and solution pages. */
export function Outcomes({ title, items }: { title: string; items: string[] }) {
  return (
    <div
      className="relative isolate overflow-hidden rounded-[32px] p-8 text-white md:p-14"
      style={{ background: "linear-gradient(130deg, #1e1b4b 0%, #312e81 45%, #1e3a8a 75%, #164e63 100%)" }}
      data-reveal
    >
      <span aria-hidden className="orb -right-32 -top-32 -z-10 h-[420px] w-[420px]" style={{ ["--orb" as string]: "rgb(139 92 246 / 0.55)" }} />
      <span aria-hidden className="orb -bottom-40 left-1/4 -z-10 h-[400px] w-[400px]" style={{ ["--orb" as string]: "rgb(34 211 238 / 0.35)" }} />
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="eyebrow" style={{ background: "rgb(255 255 255 / 0.12)", color: "#fff", boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.2)" }}>
            Outcomes
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.3rem+2vw,2.9rem)] font-bold !text-white">{title}</h2>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
          {items.map((o) => (
            <li key={o} className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ background: "linear-gradient(135deg, #a78bfa, #22d3ee)" }}>
                <Check size={13} />
              </span>
              <span className="text-[15.5px] font-medium leading-snug">{o}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
