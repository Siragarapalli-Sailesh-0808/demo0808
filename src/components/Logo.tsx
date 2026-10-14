import { Link } from "next-view-transitions";
import { site } from "@/lib/site";

/** Official logo (Refined Classic). Vector file with outlined lettering: /public/brand/logo.svg */
export function Logo({
  className = "",
  imgClassName = "h-14 md:h-16",
  variant = "color",
}: {
  className?: string;
  /** Height classes — the width follows the logo's proportions. */
  imgClassName?: string;
  variant?: "color" | "white";
}) {
  return (
    <Link href="/" aria-label={`${site.legalName} — home`} className={`group inline-flex shrink-0 items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={variant === "white" ? "/brand/logo-white.svg" : "/brand/logo.svg"}
        alt={site.legalName}
        width={175}
        height={72}
        className={`w-auto transition-[height,scale] duration-500 ease-out-expo group-hover:scale-[1.02] ${imgClassName}`}
      />
    </Link>
  );
}
