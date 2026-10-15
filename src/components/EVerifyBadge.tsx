import { site } from "@/lib/site";

/** "E-Verify participating employer" badge. Hidden when site.everify.enabled is false. */
export function EVerifyBadge({ variant = "compact", className = "" }: { variant?: "compact" | "strip"; className?: string }) {
  if (!site.everify.enabled) return null;
  const logo = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/e-verify.webp" alt="E-Verify" width={774} height={196} loading="lazy" className="h-auto w-[132px] md:w-[148px]" />
  );

  if (variant === "strip") {
    return (
      <div className={`flex flex-col items-start gap-5 rounded-lg bg-white p-6 ring-1 ring-line sm:flex-row sm:items-center sm:gap-8 md:p-7 ${className}`}>
        <span className="shrink-0 rounded-lg bg-white px-4 py-3 ring-1 ring-line">{logo}</span>
        <div>
          <p className="font-display text-[18px] font-semibold text-ink">E-Verify® participating employer</p>
          <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted">
            {site.legalName} participates in E-Verify, confirming the U.S. work authorization of every new hire with the Department of Homeland
            Security and the Social Security Administration.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-4 rounded-lg bg-white px-4 py-3 ring-1 ring-line ${className}`}>
      {logo}
      <span className="text-[12.5px] font-semibold leading-snug text-ink-2">
        Participating
        <br />
        employer
      </span>
    </div>
  );
}
