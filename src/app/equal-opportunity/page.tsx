import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/page/LegalPage";

// Template statement — have it reviewed by your legal counsel before relying on it.
export const metadata: Metadata = {
  title: "Equal Opportunity Employer",
  description: `${site.legalName} is an equal opportunity employer.`,
  alternates: { canonical: "/equal-opportunity" },
};

export default function EeoPage() {
  return (
    <LegalPage title="Equal Opportunity Employer" updated="October 13, 2026" href="/equal-opportunity">
      <p>
        {site.legalName} is an equal opportunity employer. We make employment decisions based on qualifications, merit and business need, and we do not
        discriminate on the basis of race, color, religion, sex (including pregnancy), sexual orientation, gender identity, national origin, age, disability,
        genetic information, veteran status, or any other status protected by federal, state or local law.
      </p>
      <p>This applies to every aspect of employment, including recruiting, hiring, placement, compensation, training, promotion and termination.</p>
      <h2>Reasonable accommodation</h2>
      <p>
        If you need a reasonable accommodation to apply for a position or take part in the hiring process, please contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone}.
      </p>
    </LegalPage>
  );
}
