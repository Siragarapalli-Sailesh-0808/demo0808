import { site } from "@/lib/site";
import { services } from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { WhatWeOffer } from "@/components/sections/WhatWeOffer";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { WhyUs } from "@/components/sections/WhyUs";
import { Trust } from "@/components/sections/Trust";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  const address = {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "EmploymentAgency"],
        "@id": `${site.url}/#organization`,
        name: site.legalName,
        alternateName: [site.name, "M&K Technovations", "M and K Staffing"],
        url: site.url,
        logo: `${site.url}/brand/logo.svg`,
        image: `${site.url}/opengraph-image`,
        email: site.email,
        foundingDate: String(site.founded),
        description: site.description,
        address,
        areaServed: "US",
        ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
        makesOffer: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.body, url: `${site.url}/services/${s.slug}` },
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
      <Stats />
      <WhatWeDo />
      <WhatWeOffer />
      <WhoWeServe />
      <WhyUs />
      <Trust />
      <CtaBand />
    </>
  );
}
