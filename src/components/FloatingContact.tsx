import { site } from "@/lib/site";
import { Social } from "./Icons";

const brand: Record<string, string> = {
  linkedin: "#0a66c2",
  x: "#0f1419",
  facebook: "#1877f2",
  instagram: "#e1306c",
  youtube: "#ff0000",
};

/** Social links pinned to the right edge (wide screens) + WhatsApp chat button (all screens). */
export function FloatingContact() {
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi ${site.name}, I'd like to know more about your services.`)}`;
  return (
    <>
      {site.socials.length > 0 && (
      <nav aria-label="Social media" className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 min-[1340px]:block">
        <ul className="flex flex-col gap-1.5">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{ ["--b" as string]: brand[s.icon] ?? "#5b3df5" }}
                className="flex h-11 w-12 items-center justify-center rounded-l-xl bg-white text-[var(--b)] shadow-[0_8px_24px_-12px_rgb(11_18_32/0.35)] ring-1 ring-line transition-[transform,background-color,color] duration-300 ease-out-expo hover:-translate-x-1.5 hover:bg-[var(--b)] hover:text-white"
              >
                <Social name={s.icon} size={19} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      )}

      {site.whatsapp && (
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group fixed bottom-4 left-4 z-40 grid h-[52px] w-[52px] place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_-10px_rgb(37_211_102/0.8)] transition-transform duration-300 hover:scale-105 md:bottom-7 md:left-7 md:h-16 md:w-16"
      >
        <span aria-hidden className="absolute inset-0 rounded-full bg-[#25d366]" style={{ animation: "ping-soft 2.4s ease-out infinite" }} />
        <svg viewBox="0 0 32 32" className="relative h-6 w-6 md:h-8 md:w-8" fill="currentColor" aria-hidden>
          <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.96 12.96 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.62c-2 0-3.95-.54-5.65-1.56l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.4 16c0-5.86 4.77-10.62 10.64-10.62 5.86 0 10.6 4.76 10.6 10.62 0 5.87-4.75 10.62-10.6 10.62Zm5.83-7.95c-.32-.16-1.88-.93-2.17-1.03-.3-.11-.5-.16-.72.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.21-.18-.32-.02-.5.14-.65.15-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.53-.72-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.1 1.88-.77 2.15-1.51.27-.75.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
        </svg>
        <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[13px] font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
          Chat with us
        </span>
      </a>
      )}
    </>
  );
}
