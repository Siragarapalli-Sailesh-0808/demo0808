import type { Metadata } from "next";
import { site } from "@/lib/site";
import { EmailRequestForm } from "@/components/page/EmailRequestForm";

// Internal page for staff email accounts. Not linked anywhere and hidden from search engines.
export const metadata: Metadata = {
  title: "Staff email requests",
  robots: { index: false, follow: false, nocache: true },
};

export default function EmailRequestPage() {
  const domain = new URL(site.url).hostname.replace(/^www\./, "");
  return (
    <section className="bg-tint pb-24 pt-40 md:pt-48">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">Internal</p>
        <h1 className="mt-4 text-[clamp(2rem,1.5rem+2vw,3rem)] font-semibold leading-[1.1]">Staff email requests</h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          Request a new @{domain} email account for an employee, or a password reset for an existing one. Requests are
          handled during business hours, and the account details are sent to {site.email}.
        </p>
        <div className="mt-10 rounded-lg border border-line bg-white p-6 sm:p-10">
          <EmailRequestForm domain={domain} needsCode={Boolean(process.env.EMAIL_REQUEST_CODE)} sendTo={site.email} />
        </div>
      </div>
    </section>
  );
}
