/**
 * Global brand + contact settings — every page reads from here.
 * Details taken from the existing mandkstaffing.com website.
 */
export const site = {
  name: "M & K Technovations",
  legalName: "M & K Technovations Inc.",
  shortName: "M & K",
  url: "https://mktechnoinc.com",
  founded: 2013,
  tagline: "IT Staffing, Database & Technology Services",
  description:
    "M & K Technovations delivers the right people, with the right skills, at the right price — IT staff augmentation, 100% US-based database administration, ERP support and managed IT services for enterprises and government agencies since 2013.",
  /** WhatsApp number in international format, digits only. Leave empty to hide the WhatsApp button. */
  whatsapp: "",
  email: "deep@mktechnoinc.com",
  emails: ["deep@mktechnoinc.com"],
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
  jobsSheetUrl:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQuthu4MX40gwKtAguyCcWyIJ6UUZustIqA0q6Kaut2TkFESP487SshfVc_F8zzlFZKCwzDGjoX5R2A/pub?gid=1728877380&single=true&output=csv",
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
  /** Social profiles (shown in the footer and the side rail). Empty = hidden everywhere. */
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/m-k-technovations-inc-b4816569/", icon: "linkedin" },
  ] as { label: string; href: string; icon: string }[],
} as const;

export type Site = typeof site;
