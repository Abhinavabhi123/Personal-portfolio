export const profile = {
  name: "Alex Carter",
  role: "Full Stack Developer",
  tagline: "I build scalable, end-to-end web applications — from pixel-perfect interfaces to resilient cloud infrastructure.",
  location: "San Francisco, CA",
  email: "alex.carter@example.com",
  phone: "+1 (415) 555-0192",
  resumeUrl: "#",
  yearsExperience: 7,
  projectsCompleted: 48,
  happyClients: 26,
  openSourceContribs: 320,
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    dribbble: "https://dribbble.com",
  },
  typedRoles: [
    "Full Stack Developer",
    "React & Node.js Expert",
    "Cloud Architect",
    "Open Source Contributor",
  ],
  about: [
    "I'm a full stack developer with 7+ years of experience designing, building, and shipping production-grade web applications. I specialize in the JavaScript/TypeScript ecosystem — React and Next.js on the frontend, Node.js and Go on the backend — backed by PostgreSQL, Redis, and event-driven architectures.",
    "I've led engineering efforts at startups and scale-ups alike: architecting microservices that handle millions of requests per day, mentoring junior developers, and owning features from whiteboard sketch to production deploy. I care deeply about clean code, accessibility, performance budgets, and developer experience.",
  ],
  highlights: [
    "Architected systems serving 2M+ daily active users",
    "Led teams of 4–8 engineers across 3 companies",
    "Cut cloud costs by 40% via infra optimization",
    "Speaker at React Summit & Node Conf",
  ],
};

export type SkillGroup = {
  title: string;
  icon: string;
  skills: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Vue / Nuxt", level: 78 },
      { name: "Redux / Zustand", level: 88 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js / Express", level: 93 },
      { name: "Go", level: 80 },
      { name: "GraphQL / REST", level: 90 },
      { name: "Python / FastAPI", level: 75 },
      { name: "Microservices", level: 85 },
    ],
  },
  {
    title: "Database",
    icon: "🗄️",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "Redis", level: 86 },
      { name: "Prisma / TypeORM", level: 88 },
      { name: "Elasticsearch", level: 72 },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: "☁️",
    skills: [
      { name: "AWS / GCP", level: 85 },
      { name: "Docker / Kubernetes", level: 84 },
      { name: "CI/CD (GitHub Actions)", level: 90 },
      { name: "Terraform", level: 74 },
      { name: "Monitoring (Grafana)", level: 78 },
    ],
  },
];

export const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Go", "GraphQL",
  "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS",
  "Tailwind", "Prisma", "Jest", "Cypress", "Kafka", "Terraform",
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "NovaPay Technologies",
    role: "Senior Full Stack Engineer",
    period: "2022 — Present",
    location: "San Francisco, CA",
    points: [
      "Lead a squad of 6 engineers building a payments dashboard used by 120k+ merchants.",
      "Re-architected the API gateway with Go and gRPC, cutting p95 latency from 480ms to 95ms.",
      "Introduced feature-flagged trunk-based development, raising deploy frequency to 15+/day.",
    ],
    stack: ["Next.js", "Go", "PostgreSQL", "Kafka", "AWS"],
  },
  {
    company: "Cloudloom Inc.",
    role: "Full Stack Developer",
    period: "2019 — 2022",
    location: "Remote",
    points: [
      "Built a multi-tenant SaaS analytics platform from zero to $2M ARR with a 3-person team.",
      "Designed an event ingestion pipeline handling 50M events/day with Node.js and Redis Streams.",
      "Implemented role-based access control and SSO (SAML/OIDC) for enterprise customers.",
    ],
    stack: ["React", "Node.js", "Redis", "MongoDB", "Docker"],
  },
  {
    company: "BrightByte Studio",
    role: "Frontend Developer",
    period: "2017 — 2019",
    location: "Austin, TX",
    points: [
      "Delivered 14 client projects ranging from e-commerce storefronts to interactive dashboards.",
      "Championed component-driven development with Storybook, reducing UI bugs by 35%.",
      "Improved Core Web Vitals across client sites, lifting average Lighthouse scores to 95+.",
    ],
    stack: ["React", "Vue", "Sass", "Webpack", "Firebase"],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  emoji: string;
  image?: string; // Base64 or URL
  category: string;
  links: { demo: string; code: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "LedgerFlow",
    description: "Real-time financial analytics SaaS with live dashboards, anomaly detection, and exportable reports. Processes 50M+ events daily through an event-driven pipeline.",
    tags: ["Next.js", "Go", "Kafka", "PostgreSQL", "AWS"],
    gradient: "from-teal-500/30 via-cyan-500/20 to-blue-600/30",
    emoji: "📊",
    image: undefined,
    category: "SaaS",
    links: { demo: "#", code: "#" },
    featured: true,
  },
  {
    title: "ShopSphere",
    description: "Headless e-commerce platform with a custom storefront builder, Stripe billing, inventory sync, and a GraphQL API consumed by web and mobile clients.",
    tags: ["React", "Node.js", "GraphQL", "Stripe", "Redis"],
    gradient: "from-violet-500/30 via-purple-500/20 to-fuchsia-600/30",
    emoji: "🛒",
    image: undefined,
    category: "E-Commerce",
    links: { demo: "#", code: "#" },
    featured: true,
  },
  {
    title: "DevCollab",
    description: "Real-time collaborative code editor with CRDT-based syncing, in-browser execution sandboxes, and voice chat for pair programming sessions.",
    tags: ["TypeScript", "WebSockets", "WebRTC", "Docker"],
    gradient: "from-amber-500/30 via-orange-500/20 to-red-600/30",
    emoji: "👨‍💻",
    image: undefined,
    category: "Developer Tool",
    links: { demo: "#", code: "#" },
    featured: true,
  },
  {
    title: "FitTrack API",
    description: "Open-source fitness tracking REST/GraphQL API with OAuth2, rate limiting, and wearable-device webhook integrations. 1.2k+ GitHub stars.",
    tags: ["Node.js", "Fastify", "PostgreSQL", "OAuth2"],
    gradient: "from-emerald-500/30 via-green-500/20 to-lime-600/30",
    emoji: "💪",
    image: undefined,
    category: "Open Source",
    links: { demo: "#", code: "#" },
  },
  {
    title: "Nimbus Deploy",
    description: "CLI + dashboard for one-command preview deployments to Kubernetes, with automatic SSL, rollbacks, and per-branch environments.",
    tags: ["Go", "Kubernetes", "React", "Terraform"],
    gradient: "from-sky-500/30 via-blue-500/20 to-indigo-600/30",
    emoji: "🚀",
    image: undefined,
    category: "DevOps",
    links: { demo: "#", code: "#" },
  },
  {
    title: "Chatterbox AI",
    description: "Customer-support chatbot platform with RAG over company docs, live-agent handoff, and an analytics console for conversation insights.",
    tags: ["Next.js", "Python", "OpenAI", "Pinecone"],
    gradient: "from-rose-500/30 via-pink-500/20 to-purple-600/30",
    emoji: "🤖",
    image: undefined,
    category: "AI / ML",
    links: { demo: "#", code: "#" },
  },
];

export type Service = {
  title: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  {
    title: "Full Stack Development",
    description: "End-to-end web application development — from database schema and API design to responsive, accessible user interfaces.",
    icon: "🧩",
  },
  {
    title: "API Design & Integration",
    description: "Robust REST and GraphQL APIs with authentication, rate limiting, documentation, and third-party service integrations.",
    icon: "🔌",
  },
  {
    title: "Cloud Architecture",
    description: "Scalable, cost-efficient infrastructure on AWS/GCP with Docker, Kubernetes, CI/CD pipelines, and infrastructure as code.",
    icon: "☁️",
  },
  {
    title: "Performance Optimization",
    description: "Audits and fixes for slow apps — Core Web Vitals, query tuning, caching strategies, and bundle-size reduction.",
    icon: "⚡",
  },
  {
    title: "Technical Leadership",
    description: "Team mentoring, code reviews, architecture decision records, and engineering process improvements that ship faster.",
    icon: "🧭",
  },
  {
    title: "MVP for Startups",
    description: "Lean, production-ready MVPs built in weeks — validated architecture that scales when your user base does.",
    icon: "🌱",
  },
];

export const testimonials = [
  {
    quote: "Alex rebuilt our entire platform in four months. Latency dropped 80%, and our team finally has an architecture we can build on for years.",
    name: "Sarah Mitchell",
    role: "CTO, NovaPay Technologies",
    initials: "SM",
  },
  {
    quote: "Rare combination of deep technical skill and product sense. Alex doesn't just write code — he asks the right questions and ships the right thing.",
    name: "David Okafor",
    role: "Founder, Cloudloom Inc.",
    initials: "DO",
  },
  {
    quote: "The best engineer I've worked with in 15 years. Clear communication, immaculate code reviews, and an absolute force multiplier for the team.",
    name: "Priya Raghavan",
    role: "VP Engineering, BrightByte",
    initials: "PR",
  },
];

export const education = [
  {
    school: "University of California, Berkeley",
    degree: "B.S. Computer Science",
    period: "2013 — 2017",
    detail: "Graduated with honors. Focus on distributed systems & HCI.",
  },
];

export const certifications = [
  { name: "AWS Certified Solutions Architect — Professional", year: "2023" },
  { name: "Certified Kubernetes Application Developer (CKAD)", year: "2022" },
  { name: "Google Cloud Professional Developer", year: "2021" },
];
