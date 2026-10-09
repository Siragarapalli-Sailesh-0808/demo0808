/**
 * Placeholder copy for inner pages (Phase 2). Original draft text — edit freely.
 * Keys match the slugs in content.ts.
 */

export type Faq = { q: string; a: string };
export type Feature = { title: string; body: string };
export type Step = { title: string; body: string };

export const serviceDetails: Record<
  string,
  {
    headline: [string, string]; // [plain, accent]
    intro: string;
    offerings: Feature[];
    approach: Step[];
    outcomes: string[];
    models?: Feature[];
    faqs: Faq[];
  }
> = {
  "consulting-transformation": {
    headline: ["Strategy that turns into ", "results."],
    intro:
      "We help leadership teams decide where technology should take the business — then build the roadmap, operating model and governance to get there without disrupting what already works.",
    offerings: [
      { title: "Technology strategy", body: "A clear, prioritized view of where to invest, what to retire and how each move supports business goals." },
      { title: "Transformation roadmaps", body: "Sequenced, realistic plans with milestones, dependencies and budgets your board can sign off." },
      { title: "Operating model design", body: "Team structures, processes and decision rights shaped for faster, more accountable delivery." },
      { title: "Architecture & governance", body: "Target architectures and guardrails that keep teams aligned as the estate evolves." },
      { title: "Vendor & portfolio review", body: "An objective look at platforms, contracts and spend to find savings and reduce risk." },
      { title: "Program leadership", body: "Experienced program and change leads who keep complex initiatives on time and on budget." },
    ],
    approach: [
      { title: "Discover", body: "Interviews, system reviews and data analysis to understand where you really stand today." },
      { title: "Define", body: "Agree on the target state, the business case and the metrics that will prove success." },
      { title: "Plan", body: "Break the journey into funded, low-risk phases with clear owners and checkpoints." },
      { title: "Guide", body: "Stay alongside your teams through delivery, adjusting the plan as reality changes." },
    ],
    outcomes: [
      "A roadmap tied directly to business outcomes",
      "Lower technology spend through portfolio rationalization",
      "Faster, clearer decision-making across IT and the business",
      "Reduced delivery risk on large programs",
    ],
    faqs: [
      { q: "How long does a strategy engagement take?", a: "Most assessments and roadmaps take 6–10 weeks, depending on the size of your estate and how many stakeholders are involved." },
      { q: "Do you also deliver the roadmap you create?", a: "Yes. Many clients keep us on to deliver all or part of the plan, but the roadmap is yours and is written so any capable team can execute it." },
      { q: "Can you work alongside our existing partners?", a: "Absolutely. We regularly coordinate with in-house teams and other vendors, and focus on outcomes rather than ownership." },
    ],
  },
  "cloud-infrastructure-operations": {
    headline: ["Cloud and infrastructure that ", "never blinks."],
    intro:
      "We plan, migrate and run secure cloud, hybrid and on-premise environments for workloads that can't afford downtime — with the monitoring and automation to keep them healthy.",
    offerings: [
      { title: "Cloud strategy & migration", body: "Assessments, landing zones and phased migrations to AWS, Azure or Google Cloud." },
      { title: "Hybrid & private cloud", body: "Consistent operations across data centers and public cloud, without lock-in." },
      { title: "Managed infrastructure", body: "24×7 monitoring, patching and incident response run by certified engineers." },
      { title: "DevOps & platform engineering", body: "CI/CD pipelines, infrastructure-as-code and self-service platforms for faster releases." },
      { title: "Security & compliance", body: "Identity, network security and continuous compliance built into every layer." },
      { title: "Cost optimization (FinOps)", body: "Visibility and guardrails that cut cloud waste without slowing teams down." },
    ],
    approach: [
      { title: "Assess", body: "Map applications, dependencies, risks and costs to decide what moves, when and how." },
      { title: "Build the foundation", body: "Set up secure, compliant landing zones and automation before anything migrates." },
      { title: "Migrate in waves", body: "Move workloads in small, tested batches with rollback plans for every step." },
      { title: "Operate & optimize", body: "Run, monitor and continually tune the environment for performance and cost." },
    ],
    outcomes: [
      "Higher availability for critical services",
      "Lower and more predictable hosting costs",
      "Faster, safer software releases",
      "Security and compliance built in, not bolted on",
    ],
    faqs: [
      { q: "Which cloud providers do you work with?", a: "We work across AWS, Microsoft Azure and Google Cloud, as well as private cloud and on-premise platforms." },
      { q: "Can you take over day-to-day operations?", a: "Yes. Our managed services cover monitoring, incident response, patching and reporting against agreed service levels." },
      { q: "How do you avoid downtime during migration?", a: "We migrate in small waves, test each one in parallel and keep a tested rollback plan until the new environment is proven." },
    ],
  },
  "data-ai-analytics": {
    headline: ["From scattered data to ", "decisions."],
    intro:
      "We build governed data platforms, trustworthy analytics and practical AI that people actually use — so leaders get answers in minutes instead of weeks.",
    offerings: [
      { title: "Data platform engineering", body: "Modern warehouses and lakehouses that bring scattered data into one reliable place." },
      { title: "Data governance & quality", body: "Ownership, cataloging and quality checks so every number can be trusted." },
      { title: "Business intelligence", body: "Executive dashboards and self-service reporting designed around real decisions." },
      { title: "Advanced analytics", body: "Forecasting, optimization and predictive models for operations and finance." },
      { title: "Applied AI & ML", body: "Machine learning and generative AI use cases taken from pilot to production." },
      { title: "MLOps", body: "Pipelines, monitoring and controls that keep models accurate and compliant over time." },
    ],
    approach: [
      { title: "Prioritize", body: "Identify the decisions and use cases that create the most value soonest." },
      { title: "Prepare the data", body: "Integrate, clean and govern the data those use cases depend on." },
      { title: "Build & prove", body: "Deliver a working solution quickly and measure its impact against a baseline." },
      { title: "Scale", body: "Industrialize what works and roll it out across teams and regions." },
    ],
    outcomes: [
      "A single, trusted source of truth",
      "Faster reporting cycles and fewer spreadsheets",
      "AI use cases that reach production, not just pilots",
      "Clear governance that satisfies auditors and regulators",
    ],
    faqs: [
      { q: "We have messy data. Where do we start?", a: "Start with one high-value decision. We fix the data that decision needs first, then expand — value arrives early and the platform grows with it." },
      { q: "Do you build generative AI solutions?", a: "Yes — from document processing and knowledge assistants to agentic workflows, always with security, evaluation and human review designed in." },
      { q: "Which tools do you use?", a: "We are tool-agnostic and work with leading cloud data platforms and BI tools, choosing what fits your existing environment and skills." },
    ],
  },
  "application-digital-experience": {
    headline: ["Applications people ", "enjoy using."],
    intro:
      "We modernize legacy applications and design digital products that are fast, accessible and easy to evolve — for customers, citizens and employees alike.",
    offerings: [
      { title: "Application modernization", body: "Re-platform, re-architect or rebuild legacy systems with minimal disruption." },
      { title: "Custom software development", body: "Web, mobile and API products engineered for scale and long-term maintainability." },
      { title: "UX & product design", body: "Research-led design that makes complex tasks simple and accessible." },
      { title: "Enterprise platforms", body: "Implementation and extension of CRM, ERP and service-management platforms." },
      { title: "Integration & APIs", body: "Clean, secure connections between systems, partners and data sources." },
      { title: "Quality engineering", body: "Automated testing, performance and accessibility checks built into delivery." },
    ],
    approach: [
      { title: "Understand", body: "Research users, map journeys and review the existing code and architecture." },
      { title: "Design", body: "Prototype and test the experience before committing to a build." },
      { title: "Build iteratively", body: "Ship in short cycles so stakeholders see working software every few weeks." },
      { title: "Evolve", body: "Measure usage, gather feedback and keep improving after launch." },
    ],
    outcomes: [
      "Faster, more reliable applications",
      "Higher adoption and satisfaction",
      "Lower maintenance and licensing costs",
      "A codebase your teams can confidently change",
    ],
    faqs: [
      { q: "Should we rebuild or modernize our legacy system?", a: "It depends on the business value, code quality and risk. We assess each application and recommend the lowest-risk path to the outcome you need." },
      { q: "Do you design for accessibility?", a: "Yes. Everything we build targets WCAG 2.1 AA as a minimum, and we test with assistive technologies." },
      { q: "Can you support the application after launch?", a: "We offer ongoing support and enhancement retainers, or a structured handover to your in-house team." },
    ],
  },
  "talent-staffing-solutions": {
    headline: ["The right experts, ", "right when you need them."],
    intro:
      "Contract, contract-to-hire, direct hire and dedicated teams of vetted technologists — sourced quickly, screened rigorously and supported every step of the way.",
    offerings: [
      { title: "Contract staffing", body: "Skilled professionals for short and long-term projects, ready to start in days." },
      { title: "Contract-to-hire", body: "Evaluate talent on the job before making a permanent offer." },
      { title: "Direct hire", body: "Executive and specialist search for permanent roles that are hard to fill." },
      { title: "Dedicated teams", body: "Complete, managed delivery teams that integrate with your processes." },
      { title: "Offshore & nearshore delivery", body: "Cost-effective capacity from our delivery center in Hyderabad, India." },
      { title: "Workforce consulting", body: "Skills planning, vendor consolidation and managed service programs." },
    ],
    approach: [
      { title: "Understand the role", body: "We learn the skills, culture and outcomes you need — not just the job title." },
      { title: "Source & screen", body: "Our recruiters search our network and run technical and background checks." },
      { title: "Present a shortlist", body: "You interview only qualified, interested candidates, usually within days." },
      { title: "Onboard & support", body: "We handle paperwork and onboarding and stay in touch to ensure success." },
    ],
    models: [
      { title: "Contract", body: "Flexible, project-based capacity with no long-term commitment." },
      { title: "Contract-to-hire", body: "A trial period before converting the right people to permanent." },
      { title: "Direct hire", body: "Permanent placements with a replacement guarantee." },
      { title: "Dedicated team", body: "A managed team with its own lead, aligned to your goals." },
    ],
    outcomes: [
      "Qualified shortlists in days, not months",
      "Lower hiring risk with technical vetting",
      "Flexible capacity that scales up or down",
      "One partner for local and offshore talent",
    ],
    faqs: [
      { q: "How quickly can you provide candidates?", a: "For most technology roles we share a qualified shortlist within 3–5 business days." },
      { q: "Which skills do you recruit for?", a: "Cloud, data, AI, software engineering, cybersecurity, ERP/CRM platforms, project management and more." },
      { q: "Do you offer a replacement guarantee?", a: "Yes. If a placement doesn't work out within the agreed period, we find a replacement at no extra cost." },
      { q: "Can you build a full offshore team?", a: "Yes. We build and manage dedicated teams from our India delivery center, with overlapping hours for collaboration." },
    ],
  },
};

export const solutionDetails: Record<
  string,
  { headline: [string, string]; intro: string; capabilities: Feature[]; outcomes: string[]; services: string[] }
> = {
  "digital-operations": {
    headline: ["Operations that run ", "smoother every day."],
    intro:
      "We streamline how work flows across IT and the business — fewer handoffs, better service levels and operations that scale without adding headcount.",
    capabilities: [
      { title: "IT service & incident management", body: "Modern service desks and incident processes that restore services faster." },
      { title: "Workflow & process automation", body: "Automate repetitive approvals, requests and handoffs end to end." },
      { title: "Application modernization", body: "Retire fragile legacy tools that slow operations down." },
      { title: "Service reliability & observability", body: "See problems early with unified monitoring and alerting." },
      { title: "Experience & performance analytics", body: "Measure what employees and customers actually experience." },
    ],
    outcomes: ["Faster incident resolution", "Fewer manual tasks", "Better service-level performance", "Clear operational visibility"],
    services: ["consulting-transformation", "cloud-infrastructure-operations", "application-digital-experience"],
  },
  "supply-chain-asset-intelligence": {
    headline: ["Supply chains with ", "full visibility."],
    intro:
      "We bring real-time visibility, accuracy and resilience to supply chains and asset-heavy operations — so you can plan with confidence and react before disruption hits.",
    capabilities: [
      { title: "Inventory accuracy & control", body: "Know what you have, where it is and what you need next." },
      { title: "Logistics & network visibility", body: "Track shipments and network performance in one view." },
      { title: "Predictive maintenance", body: "Use sensor and maintenance data to fix assets before they fail." },
      { title: "Warehouse optimization", body: "Improve layout, picking and labor planning with data." },
      { title: "Procurement insights", body: "Spot savings and supplier risk across your spend." },
    ],
    outcomes: ["Lower inventory carrying costs", "Less unplanned downtime", "Faster, more reliable deliveries", "Earlier warning of supply risk"],
    services: ["data-ai-analytics", "cloud-infrastructure-operations", "consulting-transformation"],
  },
  "industry-platforms": {
    headline: ["Platforms built for ", "your industry."],
    intro:
      "Purpose-built solutions for the realities of regulated and asset-intensive industries — integrating core systems, simplifying compliance and serving customers and citizens better.",
    capabilities: [
      { title: "Core industry system integration", body: "Connect core banking, insurance, healthcare or government systems cleanly." },
      { title: "Operations & capacity planning", body: "Plan resources and capacity against real demand." },
      { title: "Asset lifecycle management", body: "Track assets from acquisition through maintenance to retirement." },
      { title: "Regulatory & compliance reporting", body: "Automate the evidence and reports regulators ask for." },
      { title: "Citizen & customer portals", body: "Secure, accessible self-service experiences." },
    ],
    outcomes: ["Simpler, auditable compliance", "Connected core systems", "Better self-service experiences", "Lower cost to serve"],
    services: ["application-digital-experience", "data-ai-analytics", "consulting-transformation"],
  },
  accelerators: {
    headline: ["Get to value ", "faster."],
    intro:
      "Proven, reusable frameworks for data, AI and automation programs — so you start from a working foundation instead of a blank page.",
    capabilities: [
      { title: "Enterprise data platform blueprints", body: "Ready-made architecture and pipelines for modern data platforms." },
      { title: "Executive KPI dashboards", body: "Pre-built metric models and dashboards you can tailor in weeks." },
      { title: "Predictive & prescriptive analytics", body: "Reusable model templates for forecasting and optimization." },
      { title: "AI / ML enablement kits", body: "Secure patterns for deploying and governing AI use cases." },
      { title: "Intelligent automation starters", body: "Process automation templates for common back-office tasks." },
    ],
    outcomes: ["Weeks saved on every program", "Lower delivery risk", "Proven, secure patterns", "Consistent quality across teams"],
    services: ["data-ai-analytics", "cloud-infrastructure-operations", "talent-staffing-solutions"],
  },
};

export const industryDetails: Record<string, { challenges: string[]; help: string[] }> = {
  core: {
    challenges: ["Aging core systems that are risky to change", "Strict regulatory and audit requirements", "Pressure to cut cost while improving service"],
    help: ["Phased core modernization with zero-downtime cutovers", "Compliance and audit evidence built into delivery", "Data and AI that improve decisions and efficiency"],
  },
  public: {
    challenges: ["Policy-driven deadlines and public accountability", "Legacy systems serving millions of citizens", "Tight budgets and procurement rules"],
    help: ["Secure, compliant cloud foundations for public services", "Accessible digital services for every citizen", "Transparent delivery with clear reporting"],
  },
  commercial: {
    challenges: ["Fast-changing customer expectations", "Scaling technology and teams quickly", "Competing on digital experience"],
    help: ["Modern digital products and platforms", "Flexible talent to scale delivery up or down", "Analytics that reveal what customers want"],
  },
  emerging: {
    challenges: ["Niche skills that are hard to hire", "Evolving regulation and business models", "Limited in-house technology capacity"],
    help: ["Specialist talent sourced quickly", "Right-sized solutions that grow with you", "Practical guidance from domain experts"],
  },
};

export const about = {
  intro:
    "We are a technology consulting and talent company helping enterprises and public institutions modernize, operate and grow — with offices in the United States and India.",
  story: [
    "We started with a simple belief: great technology outcomes come from the right strategy and the right people working together. Too often, organizations had to choose between a consultancy that advised and a staffing firm that supplied. We decided to do both, properly.",
    "Today we bring consulting, engineering and talent under one roof. Our teams design and deliver mission-critical systems, and our recruiters place the specialists who keep them running — across the United States and from our delivery center in Hyderabad.",
  ],
  mission: "Help organizations build technology that lasts — through honest advice, excellent engineering and exceptional people.",
  vision: "To be the partner enterprises trust most for both the technology they run and the talent that runs it.",
  values: [
    { title: "Integrity first", body: "We give honest advice, even when it isn't what people want to hear." },
    { title: "Outcomes over output", body: "We measure success by your results, not our hours." },
    { title: "People make it work", body: "We invest in the growth, wellbeing and fit of every person we place." },
    { title: "Security by default", body: "We treat your data and systems with the care they deserve." },
  ],
  stats: [
    { value: "15+", label: "years of delivery" },
    { value: "200+", label: "clients served" },
    { value: "2,500+", label: "professionals placed" },
    { value: "2", label: "countries, one team" },
  ],
  leaders: [
    { name: "Leader Name", role: "Founder & CEO" },
    { name: "Leader Name", role: "Chief Operating Officer" },
    { name: "Leader Name", role: "Head of Consulting" },
    { name: "Leader Name", role: "Head of Talent Solutions" },
  ],
  approach: [
    { title: "Listen", body: "We start by understanding your goals, constraints and people." },
    { title: "Advise", body: "We recommend the simplest path to a measurable outcome." },
    { title: "Deliver", body: "Engineers and specialists execute with discipline and transparency." },
    { title: "Sustain", body: "We support, improve and hand over so results last." },
  ],
};

export const contactInterests = [
  "Consulting & Transformation",
  "Cloud, Infrastructure & Operations",
  "Data, AI & Analytics",
  "Application & Digital Experience",
  "Talent & Staffing Solutions",
  "Something else",
];
