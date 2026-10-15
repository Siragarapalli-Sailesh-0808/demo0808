/**
 * Global brand + contact settings — every page reads from here.
 * Details taken from the existing mandkstaffing.com website.
 */
export const site = {
  name: "M & K Technovations",
  legalName: "M & K Technovations Inc.",
  shortName: "M & K",
  url: "https://mandkstaffing.com",
  founded: 2013,
  tagline: "IT Staffing, Database & Technology Services",
  description:
    "M & K Technovations delivers the right people, with the right skills, at the right price — IT staff augmentation, 100% US-based database administration, ERP support and managed IT services for enterprises and government agencies since 2013.",
  phone: "(347) 944-9929",
  phoneHref: "+13479449929",
  /** WhatsApp number in international format, digits only. Leave empty to hide the WhatsApp button. */
  whatsapp: "",
  email: "mandip@mandkstaffing.com",
  emails: ["mandip@mandkstaffing.com", "deep@mandkstaffing.com"],
  address: {
    street: "225 Market Street, Suite #510",
    city: "Harrisburg",
    region: "PA",
    postalCode: "17101",
    country: "US",
  },
  offices: [
    {
      country: "Headquarters — Harrisburg, PA",
      lines: ["225 Market Street, Suite #510", "Harrisburg, PA 17101", "United States"],
    },
  ],
  /**
   * Google Sheet that lists job openings (see src/lib/jobs.ts). Paste the "Publish to web" CSV link here,
   * e.g. https://docs.google.com/spreadsheets/d/e/XXXX/pub?gid=0&single=true&output=csv
   */
  jobsSheetUrl: "",
  /**
   * E-Verify participation badge (footer, home page, careers page).
   * Using the E-Verify logo needs DHS approval (Trademark & Logo Licensing Agreement → uscis.verlogo@uscis.dhs.gov).
   * Replace /public/brand/e-verify.webp with the official file DHS sends.
   * posters: the "Notice of E-Verify Participation" and "Right to Work" posters (English & Spanish) — put the PDFs in
   * /public/posters/ and list them here; they then show on the careers page.
   */
  everify: {
    enabled: true,
    posters: [] as { label: string; href: string }[],
  },
  /** Add real profile URLs here (LinkedIn etc.). Empty = hidden everywhere. */
  socials: [] as { label: string; href: string; icon: string }[],
} as const;

export type Site = typeof site;
