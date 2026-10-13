import { Link } from "next-view-transitions";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-44">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-extrabold">
        This page is <span className="accent-word">on its way.</span>
      </h1>
      <p className="mt-5 max-w-lg text-[17px] text-ink-2">
        We&apos;re still building this part of the site. In the meantime, head back home or get in touch.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn btn-primary">Back to home</Link>
        <Link href="/contact" className="btn btn-ghost">Contact us</Link>
      </div>
    </section>
  );
}
