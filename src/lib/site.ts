/**
 * Global brand + contact settings.
 * Replace the placeholder values below once the final company name,
 * logo and contact details are confirmed — every page reads from here.
 */
export const site = {
  name: "Your Company",
  legalName: "Your Company Group Inc.",
  /** Two-letter mark used in the placeholder logo until the real logo arrives. */
  mark: "YC",
  url: "https://www.example.com",
  tagline: "IT Consulting & Talent Solutions",
  description:
    "We design, modernize and run mission-critical technology for enterprises and public institutions — and provide the expert talent that keeps it moving.",
  phone: "+1 (000) 000-0000",
  /** WhatsApp number in international format, digits only (country code first). */
  whatsapp: "910000000000",
  email: "hello@example.com",
  offices: [
    {
      country: "USA",
      lines: ["0000 Business Park Drive, Suite 000", "City, Texas 00000", "United States"],
    },
    {
      country: "India",
      lines: ["Office No. 000, Tower Name", "Madhapur, Hyderabad", "Telangana 500000"],
    },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "X", href: "https://x.com/", icon: "x" },
    { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
  ],
} as const;

export type Site = typeof site;
