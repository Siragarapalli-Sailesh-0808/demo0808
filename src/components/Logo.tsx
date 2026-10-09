import Link from "next/link";
import { site } from "@/lib/site";

/** Placeholder logo — swap for the real SVG logo when it arrives. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden className="relative grid h-9 w-9 place-items-center rounded-[10px] bg-ink text-[13px] font-bold tracking-tight text-white font-display transition-colors duration-500 group-hover:bg-accent">
        {site.mark}
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-bg transition-colors duration-500 group-hover:bg-ink" />
      </span>
      <span className="font-display text-[17px] font-bold tracking-tight text-ink">{site.name}</span>
    </Link>
  );
}
