import { Link } from "next-view-transitions";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-44">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-4 text-[clamp(2.2rem,1.6rem+2.4vw,3.4rem)] font-semibold">We couldn&apos;t find that page.</h1>
      <p className="mt-5 max-w-lg text-[17px] text-ink-2">
        It may have moved, or — if you followed a job link — the position may have been filled. Browse our current
        openings or head back to the home page.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/careers" className="btn btn-primary">
          Current openings
        </Link>
        <Link href="/" className="btn btn-ghost">
          Back to home
        </Link>
      </div>
    </section>
  );
}
