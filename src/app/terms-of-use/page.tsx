import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/page/LegalPage";

// Template terms — have them reviewed by your legal counsel before relying on them.
export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using the ${site.legalName} website.`,
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="October 13, 2026" href="/terms-of-use">
      <p>
        By using this website you agree to these terms. If you do not agree, please do not use the site.
      </p>
      <h2>About this website</h2>
      <p>
        This website is operated by {site.legalName} Its content is provided for general information about our services and job opportunities. It does not
        form an offer or a contract; services are provided under separate written agreements.
      </p>
      <h2>Job postings</h2>
      <p>Job openings may change or be filled at any time. Submitting an application does not guarantee an interview or employment.</p>
      <h2>Acceptable use</h2>
      <ul>
        <li>Do not misuse the site, attempt to gain unauthorized access, or interfere with its operation.</li>
        <li>Do not submit false, misleading or harmful information or files.</li>
      </ul>
      <h2>Intellectual property</h2>
      <p>
        The site&apos;s content, including the {site.legalName} name and logo, belongs to us or our licensors and may not be copied or reused without permission.
        Third-party product names are trademarks of their respective owners and are used only to describe the technologies we support.
      </p>
      <h2>Disclaimer and liability</h2>
      <p>
        The site is provided &ldquo;as is&rdquo;. To the extent permitted by law, we make no warranties about it and are not liable for any loss arising from its use.
      </p>
      <h2>Privacy</h2>
      <p>
        Our <Link href="/privacy-policy">Privacy Policy</Link> explains how we handle personal information.
      </p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Commonwealth of Pennsylvania, USA.</p>
      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
