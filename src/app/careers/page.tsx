import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { PageHero } from "@/components/page/PageHero";
import { ArrowRight } from "@/components/Icons";

// Placeholder until the careers content is provided.
export const metadata: Metadata = {
  title: "Careers",
  description: "Join our team of consultants, engineers and talent specialists.",
  alternates: { canonical: "/careers" },
  robots: { index: false, follow: true },
};

export default function CareersPage() {
  return (
    <PageHero
      eyebrow="Careers"
      title={["Build your career ", "with us."]}
      intro="Our careers page is coming soon."
      crumbs={[{ label: "Careers", href: "/careers" }]}
    >
      <Link href="/contact" className="btn btn-primary">
        Get in touch <ArrowRight />
      </Link>
    </PageHero>
  );
}
