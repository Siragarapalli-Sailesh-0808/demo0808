/**
 * Inner-page copy. Based on the content of the existing mandkstaffing.com website — edit freely.
 * Keys match the slugs in content.ts.
 */

export type Faq = { q: string; a: string };
export type Feature = { title: string; body: string };
export type Step = { title: string; body: string };

export type ServiceDetail = {
  headline: [string, string]; // [plain, accent]
  intro: string;
  offerings: Feature[];
  /** Optional extra block (e.g. supported database platforms). */
  platforms?: { eyebrow: string; title: string; accent: string; items: Feature[] };
  approach: Step[];
  approachIntro?: string;
  outcomes: string[];
  models?: Feature[];
  modelsHead?: { eyebrow: string; title: string; accent: string; intro?: string };
  faqs: Faq[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "it-staffing": {
    headline: ["The right people, with the right skills, ", "at the right price."],
    intro:
      "IT staff augmentation for enterprises and government agencies — qualified, background-checked technology professionals on contract, contract-to-hire or direct-hire terms.",
    offerings: [
      { title: "IT staff augmentation", body: "Add skilled technologists to your team for a project, a peak period or an ongoing need." },
      { title: "Project specialists", body: "Database, ERP, infrastructure and support specialists for defined pieces of work." },
      { title: "Government staffing", body: "Compliant, well-documented hiring for public-sector teams, overseen by our in-house compliance officer." },
      { title: "Background-checked talent", body: "Every candidate is screened, verified and background-checked before they reach you." },
      { title: "Network-driven sourcing", body: "We recruit through a trusted network of professionals built up since 2013 — not just job boards." },
      { title: "Satisfaction guarantee", body: "We stand behind every placement. If something isn't right, we work with you until it is." },
    ],
    models: [
      { title: "Contract", body: "Flexible, project-based capacity for as long as you need it." },
      { title: "Contract-to-hire", body: "See a professional's work on the job before making a permanent offer." },
      { title: "Direct hire", body: "Permanent placement of the right person straight onto your payroll." },
    ],
    modelsHead: { eyebrow: "Engagement models", title: "Hire the way", accent: "you work" },
    approach: [
      { title: "Understand the role", body: "We learn the skills, environment and outcomes you need — not just the job title." },
      { title: "Source through our network", body: "Our recruiters reach qualified professionals through our network and referrals." },
      { title: "Screen & verify", body: "Technical screening, reference checks and background checks before anyone is presented." },
      { title: "Place & support", body: "We handle onboarding paperwork and stay in touch to make sure the placement succeeds." },
    ],
    outcomes: [
      "Qualified, vetted candidates — not a stack of résumés",
      "Compliant, documented hiring for government work",
      "Flexible capacity that scales up or down",
      "One accountable partner, backed by a satisfaction guarantee",
    ],
    faqs: [
      { q: "What kinds of IT roles do you fill?", a: "Database administrators and developers, ERP specialists, infrastructure and network engineers, help desk and support staff, project specialists and other technology roles." },
      { q: "Do you work with government agencies?", a: "Yes. We staff for government agencies as well as enterprises, with an in-house compliance officer overseeing a documented, compliant hiring process." },
      { q: "Are candidates background-checked?", a: "Yes. Every professional we present is screened and background-checked before they are introduced to you." },
      { q: "Which engagement models do you offer?", a: "Contract, contract-to-hire and direct hire. We'll recommend the model that fits your timeline, budget and long-term plans." },
    ],
  },

  "database-administration": {
    headline: ["Database administration, ", "100% US-based."],
    intro:
      "Remote and on-site DBA support for Oracle, SQL Server, DB2, MySQL and MongoDB — monitoring, maintenance, tuning, upgrades and backups by an experienced, fully US-based team.",
    offerings: [
      { title: "Monitoring & maintenance", body: "Proactive health checks, alerting and routine maintenance to keep databases stable." },
      { title: "Patches & upgrades", body: "Planned, tested patching and version upgrades with minimal disruption." },
      { title: "High availability", body: "Clustering, replication and failover set up and looked after by specialists." },
      { title: "Backup & recovery", body: "Backup strategies that are tested regularly, so recovery works when it matters." },
      { title: "Performance tuning", body: "Query, index and configuration tuning to keep applications fast." },
      { title: "Data warehouse, BI & ETL", body: "Support for data warehouses, reporting and the ETL processes that feed them." },
    ],
    platforms: {
      eyebrow: "Platforms",
      title: "Databases we",
      accent: "support",
      items: [
        { title: "Microsoft SQL Server", body: "SQL Server 2005 through current releases, plus SSIS, SSRS and SSAS — by DBAs averaging around 15 years of experience." },
        { title: "Oracle", body: "Oracle 9i through 12c and later, databases up to 50 TB, and Oracle BI, Fusion Middleware, Hyperion and E-Business Suite." },
        { title: "IBM DB2", body: "DB2 for z/OS and LUW (9.5 to 10.5 and later) administration and support." },
        { title: "MySQL", body: "MySQL 5.1 / 5.6 and later, Percona and MariaDB, including replication setup and support." },
        { title: "MongoDB", body: "Advisory support for MongoDB design, deployment and operations." },
      ],
    },
    models: [
      { title: "Full DBA", body: "We act as your complete database team — proactive monitoring, maintenance and support against agreed hours, with a dedicated DBA team assigned to you." },
      { title: "Supplemental DBA", body: "We back up your in-house DBAs with extra hands and specialist skills. Buy a block of hours for a discount; a dedicated DBA team is assigned either way." },
    ],
    modelsHead: {
      eyebrow: "Contracting options",
      title: "Full or",
      accent: "supplemental",
      intro: "Engagements below the minimum monthly hours are handled as non-proactive support without an SLA.",
    },
    approach: [
      { title: "Preliminary meeting", body: "We learn about your environment, pain points and what good support looks like for you." },
      { title: "Analyze client architecture", body: "Our DBAs review your databases, servers, backups and processes in detail." },
      { title: "Service assessment & contracting", body: "We recommend the right level of support and agree hours, scope and responsibilities." },
      { title: "Start supporting", body: "Your dedicated DBA team takes over monitoring, maintenance and requests." },
      { title: "Review periodically", body: "Regular reviews keep the service aligned with your systems and priorities as they change." },
    ],
    approachIntro: "Our five-step methodology takes you from first conversation to steady, proactive support.",
    outcomes: [
      "Stable, well-maintained databases",
      "Fewer emergencies thanks to proactive monitoring",
      "Experienced DBAs — 100% based in the United States",
      "Predictable cost with block-of-hours pricing",
    ],
    faqs: [
      { q: "Is your DBA team based in the US?", a: "Yes. Our Oracle, SQL Server and MySQL database support is delivered 100% by US-based staff." },
      { q: "What's the difference between Full and Supplemental DBA?", a: "With Full DBA we act as your entire database team. With Supplemental DBA we work alongside your in-house DBAs, adding capacity and specialist skills. A dedicated DBA team is assigned in both cases." },
      { q: "Is there a minimum commitment?", a: "Proactive support with an SLA requires a minimum number of hours per month, and buying a block of hours earns a discount. Below the minimum, we provide non-proactive support without an SLA." },
      { q: "Can you work on-site?", a: "Most support is delivered remotely, and on-site work can be arranged when your project needs it." },
    ],
  },

  "erp-support": {
    headline: ["ERP support for ", "SAP, Oracle and Dynamics."],
    intro:
      "Skilled ERP professionals and support for SAP, the Oracle application suite and Microsoft Dynamics — to keep the systems that run your business running well.",
    offerings: [
      { title: "SAP", body: "Functional and technical SAP professionals for support, enhancements and projects." },
      { title: "Oracle applications", body: "Oracle E-Business Suite, Hyperion and the wider Oracle application suite." },
      { title: "Microsoft Dynamics", body: "Support and specialists for Microsoft Dynamics business applications." },
      { title: "ERP database support", body: "The database administration that ERP platforms depend on, from the same team." },
      { title: "Upgrades & projects", body: "Additional ERP capacity for upgrades, rollouts and integration work." },
      { title: "Ongoing support", body: "Day-to-day help for users and administrators after go-live." },
    ],
    approach: [
      { title: "Understand your landscape", body: "We review your ERP platform, versions, integrations and support needs." },
      { title: "Match the right skills", body: "We provide functional, technical or database specialists for the work at hand." },
      { title: "Deliver & support", body: "Our people work alongside your team on projects or ongoing support." },
      { title: "Review regularly", body: "We check in on progress and adjust staffing as your needs change." },
    ],
    outcomes: [
      "ERP specialists without a long hiring cycle",
      "Database and application support from one partner",
      "Flexible capacity for upgrades and projects",
      "Steady, reliable day-to-day support",
    ],
    faqs: [
      { q: "Which ERP platforms do you support?", a: "SAP, the Oracle application suite (including E-Business Suite and Hyperion) and Microsoft Dynamics." },
      { q: "Can you provide ERP consultants on contract?", a: "Yes. We place ERP professionals on contract, contract-to-hire and direct-hire terms through our IT staffing service." },
      { q: "Do you also support the ERP database?", a: "Yes. Our US-based DBA team supports the Oracle, SQL Server and DB2 databases that ERP systems run on." },
    ],
  },

  "managed-it-support": {
    headline: ["IT support that ", "keeps you working."],
    intro:
      "Managed IT and tech support for growing businesses — networks, security, help desk and migrations, delivered on-site, remotely or by phone, from per-incident help to yearly contracts.",
    offerings: [
      { title: "Help desk outsourcing", body: "A responsive help desk for your staff without hiring an in-house team." },
      { title: "Network setup & integration", body: "Design, set-up and integration of reliable office networks." },
      { title: "Security & virus protection", body: "Protection, clean-up and good security practice across your devices." },
      { title: "Email migration", body: "Smooth moves between email platforms with minimal disruption." },
      { title: "Setup, installation & repair", body: "New equipment set up correctly, plus diagnosis and repair when things go wrong." },
      { title: "Project planning & documentation", body: "Planned IT projects and clear documentation of your environment." },
    ],
    models: [
      { title: "Per incident", body: "Pay only when you need help — ideal for occasional issues." },
      { title: "Block of hours", body: "Pre-purchased support hours at a better rate, used as you need them." },
      { title: "Yearly contract", body: "Ongoing managed support with predictable costs across the year." },
    ],
    modelsHead: { eyebrow: "Support plans", title: "Support that fits", accent: "your budget", intro: "Delivered on-site, remotely or by phone." },
    approach: [
      { title: "Assess", body: "We review your systems, network and current pain points." },
      { title: "Recommend", body: "We suggest practical fixes and the support plan that suits you." },
      { title: "Support", body: "We resolve issues on-site, remotely or by phone as they come up." },
      { title: "Improve", body: "We keep documentation current and suggest improvements over time." },
    ],
    outcomes: [
      "Less downtime and faster fixes",
      "Better-protected devices and data",
      "IT expertise without a full-time hire",
      "Predictable support costs",
    ],
    faqs: [
      { q: "Do you offer on-site support?", a: "Yes. We provide support on-site, remotely and by phone, depending on what the issue needs." },
      { q: "Do I need a contract?", a: "No. You can use us per incident, buy a block of hours, or choose a yearly contract for ongoing managed support." },
      { q: "Can you take over our help desk?", a: "Yes. Help desk outsourcing is one of our core managed services." },
    ],
  },

  "it-consulting": {
    headline: ["Practical IT advice from ", "people who do the work."],
    intro:
      "IT consulting for planning, assessments and projects — from database and infrastructure reviews to IT outsourcing decisions — grounded in hands-on delivery experience.",
    offerings: [
      { title: "IT assessments", body: "An honest review of your systems, databases and processes, with clear recommendations." },
      { title: "Database architecture reviews", body: "Health, performance and resilience reviews by experienced DBAs." },
      { title: "IT outsourcing advice", body: "Help deciding what to keep in-house and what to outsource — and how." },
      { title: "Project planning", body: "Scoped, documented plans for upgrades, migrations and new systems." },
      { title: "Upgrade & migration planning", body: "Low-risk paths for database, platform and email migrations." },
      { title: "Staffing strategy", body: "Advice on the mix of contract, permanent and managed resources you need." },
    ],
    approach: [
      { title: "Listen", body: "We start by understanding your goals, constraints and current environment." },
      { title: "Assess", body: "Our specialists review the systems and processes in question." },
      { title: "Recommend", body: "You get clear, prioritized recommendations you can act on." },
      { title: "Deliver", body: "If you'd like, we provide the people or managed services to carry out the plan." },
    ],
    outcomes: [
      "A clear, prioritized plan",
      "Advice grounded in real delivery experience",
      "Lower risk on upgrades and migrations",
      "The option to have us deliver the plan",
    ],
    faqs: [
      { q: "Can you deliver what you recommend?", a: "Yes. Our staffing, database and managed IT teams can carry out the plan — or your team can, using our documentation." },
      { q: "What areas do you advise on?", a: "Databases, infrastructure, ERP, IT support and outsourcing decisions, and staffing strategy." },
    ],
  },
};

export const industryDetails: Record<string, { challenges: string[]; help: string[] }> = {
  enterprise: {
    challenges: ["Specialist IT skills that are hard to hire quickly", "Critical databases that can't afford downtime", "Projects that need extra hands for a defined period"],
    help: ["Vetted IT professionals on contract, contract-to-hire or direct hire", "100% US-based database administration", "ERP and IT consulting from one accountable partner"],
  },
  government: {
    challenges: ["Strict hiring, documentation and compliance requirements", "Background checks and verification for every hire", "Tight timelines and budgets"],
    help: ["A documented, compliant hiring process", "In-house compliance officer oversight", "Background-checked professionals, ready to start"],
  },
  smb: {
    challenges: ["No in-house IT team", "Security threats and unreliable networks", "Unpredictable IT costs"],
    help: ["Managed IT support on-site, remotely or by phone", "Network, security and help desk services", "Per-incident, block-of-hours or yearly plans"],
  },
};

export const about = {
  intro:
    "M & K Technovations Inc. is an IT staffing and technology services company headquartered in Harrisburg, Pennsylvania, serving enterprises and government agencies since 2013.",
  story: [
    "We were founded in 2013 on a simple promise: the right people, with the right skills, at the right price. Too many organizations were paying for résumés instead of results — we set out to change that with careful screening and honest advice.",
    "Today we help global enterprises, government agencies and growing businesses with IT staff augmentation, 100% US-based database administration, ERP support and managed IT services — all from one accountable partner.",
  ],
  mission: "Deliver the right people, with the right skills, at the right price — every time.",
  vision: "To be the staffing and technology partner our clients trust first for both critical systems and the people who run them.",
  values: [
    { title: "Integrity first", body: "Honest advice and transparent pricing, even when it isn't what people want to hear." },
    { title: "Compliance built in", body: "A documented hiring process with in-house compliance oversight." },
    { title: "Quality talent", body: "Every professional is screened and background-checked before we introduce them." },
    { title: "Satisfaction guaranteed", body: "We stand behind our work and our people." },
  ],
  stats: [
    { value: "2013", label: "Serving clients since" },
    { value: "100%", label: "US-based DBA support" },
    { value: "5", label: "Database platforms supported" },
    { value: "Total", label: "Satisfaction guarantee" },
  ],
  approach: [
    { title: "Listen", body: "We start by understanding your goals, environment and constraints." },
    { title: "Recommend", body: "We suggest the right people, service level or plan for the job." },
    { title: "Deliver", body: "Our professionals and support teams get to work, transparently." },
    { title: "Review", body: "We check in regularly and adjust as your needs change." },
  ],
};

export const contactInterests = [
  "IT Staffing",
  "Database Administration",
  "ERP Support",
  "Managed IT Support",
  "IT Consulting",
  "Job opportunities",
  "Something else",
];
