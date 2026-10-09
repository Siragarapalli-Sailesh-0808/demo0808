import { Check } from "../Icons";

/** Dark results panel used on service and solution pages. */
export function Outcomes({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="relative isolate overflow-hidden rounded-[32px] bg-ink p-8 text-white md:p-14" data-reveal>
      <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-accent opacity-60 blur-[90px]" />
      <div aria-hidden className="absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-[rgb(91_124_255)] opacity-30 blur-[90px]" />
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="eyebrow !text-white/60">Outcomes</p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.3rem+2vw,2.9rem)] font-bold !text-white">{title}</h2>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
          {items.map((o) => (
            <li key={o} className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent">
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
