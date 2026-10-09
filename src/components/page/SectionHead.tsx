export function SectionHead({
  eyebrow,
  title,
  accent,
  intro,
  center = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`eyebrow ${center ? "justify-center" : ""}`} data-reveal>
        {eyebrow}
      </p>
      <h2 className="h-section mt-4" data-reveal style={{ ["--d" as string]: "60ms" }}>
        {title}
        {accent && (
          <>
            {" "}
            <span className="accent-word">{accent}</span>
          </>
        )}
      </h2>
      {intro && (
        <p className="mt-6 text-[17px] leading-relaxed text-ink-2" data-reveal style={{ ["--d" as string]: "120ms" }}>
          {intro}
        </p>
      )}
    </div>
  );
}
