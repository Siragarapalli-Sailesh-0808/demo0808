import { Link } from "next-view-transitions";
import { site } from "@/lib/site";

/** Official logo (Refined Classic). Vector file with outlined lettering: /public/brand/logo.svg */
export function Logo({ className = "", variant = "color" }: { className?: string; variant?: "color" | "white" }) {
  return (
    <Link href="/" aria-label={`${site.legalName} — home`} className={`group inline-flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={variant === "white" ? "/brand/logo-white.svg" : "/brand/logo.svg"}
        alt={site.legalName}
        width={146}
        height={60}
        className="h-11 w-auto transition-transform duration-500 ease-out-expo group-hover:scale-[1.02] md:h-12"
      />
    </Link>
  );
}
