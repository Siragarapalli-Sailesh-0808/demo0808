"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => {
        const lenis = (window as unknown as { __lenis?: { scrollTo(t: number, o?: object): void } }).__lenis;
        if (lenis) lenis.scrollTo(0, { duration: 1.4 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="absolute right-5 top-0 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-navy text-white shadow-lift transition-[translate,background-color] duration-500 ease-out-expo hover:-translate-y-[60%] hover:bg-ink md:right-8"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V5m-6 6 6-6 6 6" />
      </svg>
    </button>
  );
}
