/**
 * Site copy for M & K Technovations — based on the existing mandkstaffing.com content.
 * Slugs drive the detail pages (e.g. /services/[slug]).
 */

import type { Tone } from "./tones";

export type IconName =
  | "consulting"
  | "cloud"
  | "data"
  | "app"
  | "talent"
  | "ops"
  | "supply"
  | "industry"
  | "bolt";

export const nav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", mega: "services" as const },
  { label: "Who We Serve", href: "/industries" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const services: {
  slug: string;
  title: string;
  short: string;
  body: string;
  icon: IconName;
  tone: Tone;
}[] = [
  {
    slug: "it-staffing",
    title: "IT Staffing & Staff Augmentation",
    short: "The right people, right skills, right price",
    body: "Contract, contract-to-hire and direct-hire IT professionals for global enterprises and government agencies — sourced through our network, background-checked and deployed fast.",
    icon: "talent",
    tone: "emerald",
  },
  {
    slug: "database-administration",
    title: "Database Administration (DBA)",
    short: "100% US-based DBA support",
    body: "Full or supplemental remote and on-site DBA services for Oracle, SQL Server, DB2, MySQL and MongoDB — run from our operations center in the Harrisburg, PA area.",
    icon: "data",
    tone: "blue",
  },
  {
    slug: "erp-support",
    title: "ERP Support",
    short: "SAP, Oracle Suite & Microsoft Dynamics",
    body: "Comprehensive, technically advanced support for the enterprise resource planning systems your business runs on.",
    icon: "ops",
    tone: "violet",
  },
  {
    slug: "managed-it-support",
    title: "Managed IT & Tech Support",
    short: "On-site, remote and phone support",
    body: "Networking, security and virus protection, email migration, help desk and repairs for homes and small to mid-sized businesses — without the cost of full-time staff.",
    icon: "cloud",
    tone: "pink",
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    short: "Practical advice since 2013",
    body: "Where M & K began in 2013: experienced consultants who plan, document and deliver technology projects alongside your team.",
    icon: "consulting",
    tone: "amber",
  },
];

/** "How we work with you" — engagement models shown on the home page. */
export const solutions: {
  slug: string;
  href: string;
  title: string;
  body: string;
  icon: IconName;
  tone: Tone;
  items: string[];
}[] = [
  {
    slug: "contract-staffing",
    href: "/services/it-staffing",
    title: "Contract Staffing",
    body: "Skilled IT professionals for short and long-term projects — the right people, deployed quickly.",
    icon: "talent",
    tone: "emerald",
    items: ["Fast response and deployment", "Background-checked consultants", "Project or ongoing assignments", "Flexible duration and scale"],
  },
  {
    slug: "contract-to-hire",
    href: "/services/it-staffing",
    title: "Contract-to-Hire",
    body: "See candidates do the job before you make a permanent offer.",
    icon: "bolt",
    tone: "violet",
    items: ["Evaluate fit on real work", "Lower hiring risk", "Convert when you're ready", "One partner throughout"],
  },
  {
    slug: "direct-hire",
    href: "/services/it-staffing",
    title: "Direct Hire",
    body: "Permanent placements, screened and verified, backed by our total satisfaction guarantee.",
    icon: "consulting",
    tone: "amber",
    items: ["Network-driven sourcing", "Screening and verification", "Compliant, documented process", "Total satisfaction guarantee"],
  },
  {
    slug: "managed-dba",
    href: "/services/database-administration",
    title: "Full or Supplemental DBA",
    body: "A dedicated DBA team that runs your databases end to end — or backs up the team you already have.",
    icon: "data",
    tone: "blue",
    items: ["Primary and secondary senior DBAs", "Daily system and performance checks", "Cover for vacations and training", "Discounted block-of-hours pricing"],
  },
];

export const industryGroups: {
  key: string;
  label: string;
  statement: string;
  sectors: string[];
  art: "grid" | "columns" | "waves" | "orbit";
}[] = [
  {
    key: "enterprise",
    label: "Global Enterprises",
    statement:
      "Large organizations that need specialized IT talent and dependable database support to keep critical systems and projects moving.",
    sectors: ["IT staff augmentation", "Project specialists", "Enterprise database support", "ERP support", "IT consulting"],
    art: "grid",
  },
  {
    key: "government",
    label: "Government Agencies",
    statement:
      "Public-sector teams that need qualified technical staff hired through a compliant, well-documented process.",
    sectors: ["Compliant, documented hiring", "Background checks & verification", "In-house compliance oversight", "Contract & contract-to-hire staff"],
    art: "columns",
  },
  {
    key: "smb",
    label: "Small & Mid-sized Businesses",
    statement:
      "Growing businesses that need reliable IT support without the cost of full-time staff — on-site, remote or by phone.",
    sectors: ["Managed IT services", "Network setup & security", "Help desk outsourcing", "Per-incident or yearly plans"],
    art: "waves",
  },
];

/** Technologies shown in the sliding row on the home page. */
export const trustGroups = [
  { title: "Databases", items: ["Oracle Database", "Microsoft SQL Server", "MySQL", "IBM DB2", "MongoDB"] },
  { title: "Business systems", items: ["SAP", "Oracle E-Business Suite", "Microsoft Dynamics", "Data Warehousing & BI"] },
  { title: "Infrastructure & support", items: ["Windows Networks", "Email Migration", "Security & Virus Protection", "Help Desk"] },
];

/** Strengths shown in the "Why M & K" section (from the company's own materials). */
export const strengths = [
  { title: "Right people, right skills, right price", body: "We match candidates to both the role and your budget — and make sure the fit works for client and candidate alike." },
  { title: "Quick response, fast deployment", body: "A ready pool of pre-qualified professionals means shortlists and starts in days, not months." },
  { title: "Network-driven sourcing", body: "Most great hires come through networks, not job boards — ours is built on long-term relationships with IT professionals." },
  { title: "Background checks & verification", body: "Every candidate goes through our selection process, including background checks and verification." },
  { title: "Compliance you can trust", body: "A written hiring process that follows federal, state and local rules — reviewed by our in-house compliance officer." },
  { title: "Total satisfaction guarantee", body: "If a placement isn't right, we make it right. Long-term relationships matter more to us than one-off placements." },
];

/**
 * Highlights for the scrolling bar at the top of every page.
 * When jobs are listed in src/lib/jobs.ts, the bar shows those openings instead.
 */
export const tickerHighlights = [
  { text: "Join our talent network — send us your résumé", href: "/careers" },
  { text: "100% US-based DBA support for Oracle, SQL Server, DB2 & MySQL", href: "/services/database-administration" },
  { text: "IT staff augmentation for enterprises & government agencies", href: "/services/it-staffing" },
  { text: "ERP support for SAP, Oracle Suite & Microsoft Dynamics", href: "/services/erp-support" },
  { text: "Managed IT support — on-site, remote or by phone", href: "/services/managed-it-support" },
  { text: "Serving clients since 2013 · Harrisburg, PA", href: "/about" },
];

/** Headline facts on the home and About pages. `text` shows as-is; `value` rolls like an odometer. */
export const stats: { value?: number; text?: string; suffix?: string; grouping?: boolean; label: string; tone: Tone }[] = [
  { value: 2013, grouping: false, label: "Serving clients since", tone: "violet" },
  { value: 100, suffix: "%", label: "US-based DBA support", tone: "blue" },
  { value: 5, label: "Database platforms supported", tone: "cyan" },
  { text: "Total", label: "Satisfaction guarantee", tone: "emerald" },
];
