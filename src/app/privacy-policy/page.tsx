import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/page/LegalPage";

// Template policy — have it reviewed by your legal counsel before relying on it.
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses and protects personal information.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 13, 2026" href="/privacy-policy">
      <p>
        {site.legalName} (&ldquo;{site.shortName}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what personal information we
        collect through {site.url.replace("https://", "")}, how we use it and the choices you have.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you give us</strong> — for example your name, email address, phone number, company and message when you contact us, and your résumé
          and career details when you apply for a job.
        </li>
        <li>
          <strong>Technical information</strong> — basic data your browser sends automatically, such as IP address, browser type and pages visited, which our
          hosting provider may record in server logs for security and performance.
        </li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To respond to enquiries and provide our services.</li>
        <li>To consider you for current and future job opportunities, including sharing your profile with clients for roles you agree to be put forward for.</li>
        <li>To keep the website secure and working properly.</li>
        <li>To meet legal, regulatory and contractual obligations.</li>
      </ul>
      <p>We do not sell your personal information.</p>
      <h2>Sharing</h2>
      <p>
        We share information only with service providers that help us run our business (such as website hosting and email delivery), with clients when you
        apply for or agree to be considered for a role, or when required by law.
      </p>
      <h2>Cookies</h2>
      <p>This website does not use advertising or tracking cookies. Your browser may store small preferences needed for the site to work.</p>
      <h2>How long we keep it</h2>
      <p>We keep personal information only as long as needed for the purposes above or as required by law, then delete or anonymize it.</p>
      <h2>Your choices</h2>
      <p>
        You can ask us to access, correct or delete your personal information, or to stop contacting you, by emailing{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <h2>Security</h2>
      <p>We use reasonable technical and organizational measures to protect your information. No method of transmission over the internet is completely secure.</p>
      <h2>Contact us</h2>
      <p>
        {site.legalName}, {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode} · {site.phone} ·{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </LegalPage>
  );
}
