/**
 * Placeholder copy for the site. All text here is original draft copy —
 * edit freely. Slugs are used for future detail pages (e.g. /services/[slug]).
 */

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
  { label: "Solutions", href: "/solutions", mega: "solutions" as const },
  { label: "Industries", href: "/industries", mega: "industries" as const },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const services: {
  slug: string;
  title: string;
  short: string;
  body: string;
  icon: IconName;
}[] = [
  {
    slug: "consulting-transformation",
    title: "Consulting & Transformation",
    short: "Strategy, roadmaps and operating models",
    body: "We shape technology strategy, build transformation roadmaps and redesign operating models so every investment ties back to a measurable business outcome.",
    icon: "consulting",
  },
  {
    slug: "cloud-infrastructure-operations",
    title: "Cloud, Infrastructure & Operations",
    short: "Secure, resilient platforms that scale",
    body: "We plan, migrate and run secure, resilient cloud and hybrid environments built for the workloads your organization cannot afford to lose.",
    icon: "cloud",
  },
  {
    slug: "data-ai-analytics",
    title: "Data, AI & Analytics",
    short: "From raw data to trusted decisions",
    body: "We turn scattered enterprise data into governed platforms, reliable analytics and practical AI that people actually use.",
    icon: "data",
  },
  {
    slug: "application-digital-experience",
    title: "Application & Digital Experience",
    short: "Modern apps people enjoy using",
    body: "We modernize legacy applications and build digital products that are fast, accessible and easy to evolve over the long term.",
    icon: "app",
  },
  {
    slug: "talent-staffing-solutions",
    title: "Talent & Staffing Solutions",
    short: "Vetted experts, deployed fast",
    body: "Contract, contract-to-hire and dedicated teams of vetted technologists — ready to strengthen your delivery in weeks, not months.",
    icon: "talent",
  },
];

export const solutions: {
  slug: string;
  title: string;
  body: string;
  icon: IconName;
  items: string[];
}[] = [
  {
    slug: "digital-operations",
    title: "Digital Operations & Enterprise Transformation",
    body: "Streamline how work gets done — fewer handoffs, better service levels and operations that scale with confidence.",
    icon: "ops",
    items: [
      "IT service & incident management",
      "Workflow & process automation",
      "Application modernization",
      "Service reliability & observability",
      "Experience & performance analytics",
    ],
  },
  {
    slug: "supply-chain-asset-intelligence",
    title: "Supply Chain & Asset Intelligence",
    body: "Bring real-time visibility and resilience to supply chains and asset-heavy operations.",
    icon: "supply",
    items: [
      "Inventory accuracy & control",
      "Logistics & network visibility",
      "Predictive maintenance",
      "Warehouse optimization",
      "Procurement insights",
    ],
  },
  {
    slug: "industry-platforms",
    title: "Industry-Focused Digital Platforms",
    body: "Purpose-built solutions for the realities of regulated and asset-intensive industries.",
    icon: "industry",
    items: [
      "Core industry system integration",
      "Operations & capacity planning",
      "Asset lifecycle management",
      "Regulatory & compliance reporting",
      "Citizen & customer portals",
    ],
  },
  {
    slug: "accelerators",
    title: "Accelerators",
    body: "Reusable frameworks that shorten time-to-value for data, AI and automation programs.",
    icon: "bolt",
    items: [
      "Enterprise data platform blueprints",
      "Executive KPI dashboards",
      "Predictive & prescriptive analytics",
      "AI / ML enablement kits",
      "Intelligent automation starters",
    ],
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
    key: "core",
    label: "Core Enterprise Industries",
    statement:
      "Large enterprises modernizing core systems while keeping regulated, always-on operations running smoothly.",
    sectors: ["Banking & Financial Services", "Insurance", "Healthcare & Life Sciences", "Manufacturing", "Energy & Utilities"],
    art: "grid",
  },
  {
    key: "public",
    label: "Government & Public Sector",
    statement:
      "Public institutions delivering citizen services, national infrastructure and long-term accountability under policy-driven mandates.",
    sectors: [
      "Central, State & Local Government",
      "Public Sector Undertakings",
      "Smart Cities & Urban Development",
      "Public Infrastructure & Transport",
      "Defense & Public Safety",
    ],
    art: "columns",
  },
  {
    key: "commercial",
    label: "Commercial & Growth Industries",
    statement:
      "Fast-moving businesses that need technology and talent to keep pace with customers, competitors and growth targets.",
    sectors: ["Retail & Consumer Goods", "Technology & SaaS", "Media & Telecommunications", "Travel & Hospitality", "Professional Services"],
    art: "waves",
  },
  {
    key: "emerging",
    label: "Emerging & Specialized Sectors",
    statement:
      "Specialized and emerging sectors where deep domain context and niche skills decide the outcome.",
    sectors: ["Real Estate & PropTech", "Education & EdTech", "Logistics & Mobility", "Clean Energy", "Non-profit & NGOs"],
    art: "orbit",
  },
];

export const caseStudies: {
  slug: string;
  industry: string;
  service: string;
  title: string;
  summary: string;
  results: { value: string; label: string }[];
  bars: number[];
}[] = [
  {
    slug: "regional-bank-core-modernization",
    industry: "Banking & Financial Services",
    service: "Application Modernization",
    title: "A regional bank modernizes its lending platform without a day of downtime",
    summary:
      "We re-architected a 15-year-old loan origination system into cloud-ready services, migrating in phases while branches stayed fully operational.",
    results: [
      { value: "62%", label: "faster loan approvals" },
      { value: "0", label: "hours of unplanned downtime" },
      { value: "3.4×", label: "more releases per quarter" },
    ],
    bars: [38, 52, 46, 64, 70, 82, 91],
  },
  {
    slug: "state-agency-cloud-citizen-services",
    industry: "Government & Public Sector",
    service: "Cloud, Infrastructure & Operations",
    title: "A state agency moves citizen services to a secure cloud foundation",
    summary:
      "We designed a compliant landing zone and migrated 40+ citizen-facing applications, adding monitoring that flags issues before residents notice.",
    results: [
      { value: "40+", label: "applications migrated" },
      { value: "99.95%", label: "service availability" },
      { value: "31%", label: "lower hosting cost" },
    ],
    bars: [72, 60, 66, 58, 74, 80, 86],
  },
  {
    slug: "manufacturer-dedicated-engineering-team",
    industry: "Manufacturing",
    service: "Talent & Staffing Solutions",
    title: "A global manufacturer scales a 60-person engineering team in eight weeks",
    summary:
      "We sourced, vetted and onboarded a dedicated data and cloud engineering team, with a delivery lead embedded to keep velocity high from day one.",
    results: [
      { value: "60", label: "engineers onboarded" },
      { value: "8 wks", label: "from brief to full team" },
      { value: "94%", label: "12-month retention" },
    ],
    bars: [20, 34, 48, 61, 75, 88, 96],
  },
];

export const trustGroups = [
  { title: "Technology Partnerships", items: ["Partner logo", "Partner logo"] },
  { title: "Accreditations", items: ["Certification", "Certification", "Certification", "Certification"] },
  { title: "Industry Memberships", items: ["Association", "Association"] },
];
