import { site } from "@/lib/site";
import { services } from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { WhatWeOffer } from "@/components/sections/WhatWeOffer";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Trust } from "@/components/sections/Trust";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.legalName,
        alternateName: site.name,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        description: site.description,
        sameAs: site.socials.map((s) => s.href),
        address: site.offices.map((o) => ({
          "@type": "PostalAddress",
          streetAddress: o.lines[0],
          addressLocality: o.lines[1],
          addressCountry: o.country,
        })),
        makesOffer: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.body },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <WhatWeDo />
      <WhatWeOffer />
      <WhoWeServe />
      <CaseStudies />
      <Trust />
      <CtaBand />
    </>
  );
}
