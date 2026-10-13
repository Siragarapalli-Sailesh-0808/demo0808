import { Link } from "next-view-transitions";
import { site } from "@/lib/site";

/** Placeholder logo — swap for the real SVG logo when it arrives. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden style={{ background: "var(--grad-brand)" }} className="relative grid h-9 w-9 place-items-center rounded-[10px] text-[13px] font-bold tracking-tight text-white font-display shadow-[0_8px_18px_-8px_rgb(79_70_229/0.8)] transition-transform duration-500 group-hover:-rotate-6">
        {site.mark}
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#22d3ee] ring-2 ring-white" />
      </span>
      <span className="font-display text-[17px] font-bold tracking-tight text-ink">{site.name}</span>
    </Link>
  );
}
