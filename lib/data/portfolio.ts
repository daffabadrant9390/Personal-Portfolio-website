import type { Project, Experience, TechCategory } from "@/lib/types";

// Static portfolio content. Plain module (no "use client" / no store) so it can
// be imported directly by Server Components without shipping the data as
// hydrated client state.

export const projects: Project[] = [
  {
    id: "1",
    title: "Tiket.com - Accommodation Platform",
    category: "Frontend",
    description:
      "Rebuilt hotel & homes accommodation pages and post-purchase flows for one of Indonesia's largest OTAs, cutting LCP/CLS under 2s and lifting page performance & SEO scores by 80% while sustaining 90%+ unit test coverage in production.",
    image: "/portfolio-images/tiket/tiket-1.jpg",
    images: [
      {
        src: "/portfolio-images/tiket/tiket-1.jpg",
        alt: "Tiket.com Home Page for all products and services",
        caption: "Home Page for Hotels, Homes, Flights, and other services",
      },
      {
        src: "/portfolio-images/tiket/tiket-2.jpg",
        alt: "Tiket.com Accommodation Search Page with List of Hotels and Homes",
        caption: "Tiket.com Accommodation Search Page with List of Hotels and Homes",
      },
      {
        src: "/portfolio-images/tiket/tiket-3.jpg",
        alt: "Tiket.com Accommodation Hotel Detail Page with all Hotel Information and Booking Options",
        caption: "Accommodation Hotel Detail Page with all Hotel Information and Booking Options",
      },
      {
        src: "/portfolio-images/tiket/tiket-4.jpg",
        alt: "Tiket.com Accommodation Map Nearby POI for Hotels and Homes",
        caption: "Accommodation Map Nearby POI for Hotels and Homes",
      },
      {
        src: "/portfolio-images/tiket/tiket-5.jpg",
        alt: "Tiket.com Hotel Room Selection Section with all Room Options and Prices",
        caption: "Hotel Room Selection Section with all Room Options and Prices",
      },
      {
        src: "/portfolio-images/tiket/tiket-6.jpg",
        alt: "Tiket.com Hotel SEO Page List for all Cheap Hotels in Jakarta",
        caption: "Hotel SEO Page List for all Cheap Hotels in Jakarta",
      },
      {
        src: "/portfolio-images/tiket/tiket-7.jpg",
        alt: "Tiket.com Hotel SEO Most Favorite Hotels Page for Jakarta",
        caption: "Hotel SEO Most Favorite Hotels Page for Jakarta",
      },
    ],
    tags: ["Next.js", "TypeScript", "React.js", "Node.js", "Babel & Webpack", "GraphQL", "Figma", "Storybook", "SwaggerAPI", "WebView", "SEO", "Lighthouse"],
    githubUrl: [],
    liveUrl: "https://www.tiket.com/hotel",
  },
  {
    id: "2",
    title: "Prism - AI Trading Chart Assistant",
    category: "Full-Stack",
    description:
      "Architected a Chrome Extension AI assistant for real-time trading chart analysis, integrating Claude LLM to deliver 2x faster market analysis. Owned full-stack product engineering — auth, Stripe payments, and PostHog analytics — as lead engineer for a 3-person team, cutting delivery time by 30%.",
    image:
      "/portfolio-images/prism/prism-1.jpg",
    images: [
      { src: "/portfolio-images/prism/prism-1.jpg", alt: "Prism AI trading assistant dashboard overview" },
      { src: "/portfolio-images/prism/prism-2.jpg", alt: "Prism trading chart analysis view" },
      { src: "/portfolio-images/prism/prism-3.jpg", alt: "Prism onboarding and payments flow" },
    ],
    tags: ["Claude AI", "React.js", "TypeScript", "Firebase", "Supabase", "Stripe, wix.js", "PostHog", "Tailwind CSS", "Chrome Extension"],
    githubUrl: [
      { label: "FE", url: "https://github.com/helloprismai/prism-extension" },
      { label: "BE", url: "https://github.com/helloprismai/Prism-Server-Side" },
    ],
    liveUrl: "",
  },
  {
    id: "3",
    title: "Pergi Ceria - Tour, Travel & Event Bookings",
    category: "Full-Stack",
    description:
      "Built an end-to-end OTA-style booking platform for tours, travel, and live events (tennis, padel, and more) — from SEO landing pages and search to checkout, spanning both B2C self-service and dashboard-driven manual orders. Engineered RBAC with super-admin approval workflows, a dynamic CMS for content teams, Xendit payment integration, and automated e-ticket/receipt delivery via email, backed by Golang/Gin services and Redis-cached, observability-instrumented infrastructure. Continuously own UI/UX refinement, PageSpeed performance monitoring, and SEO/SEM strategy to drive organic and paid growth.",
    image:
      "/portfolio-images/pergi-ceria/pct-1.jpg",
    images: [
      { src: "/portfolio-images/pergi-ceria/pct-1.jpg", alt: "Pergi Ceria tour and event booking landing page" },
      { src: "/portfolio-images/pergi-ceria/pct-2.jpg", alt: "Pergi Ceria tour detail and initial booking flow page" },
      { src: "/portfolio-images/pergi-ceria/pct-3.jpg", alt: "Pergi Ceria tour detail, itinerary, and booking information (departure options, pricing, and counter passenger)" },
      { src: "/portfolio-images/pergi-ceria/pct-4.jpg", alt: "Pergi Ceria Awaiting Payment Page" },
      { src: "/portfolio-images/pergi-ceria/pct-5.jpg", alt: "Order List Information Page (filtered by status)" },
      { src: "/portfolio-images/pergi-ceria/pct-6.jpg", alt: "Pergi Ceria Email After Payment Success" },
      { src: "/portfolio-images/pergi-ceria/pct-7.jpg", alt: "Pergi Ceria Dashboard to handle tours, reports, transaction histories and manual orders management" },
    ],
    tags: [
      "Next.js",
      "Golang",
      "TypeScript",
      "Claude AI",
      "Xendit",
      "Redis",
      "MySQL",
      "Cloudflare R2",
      "Tailwind CSS",
      "Shadcn UI",
      "Resend",
      "Node.js",
      "SEO",
      "PageSpeed",
    ],
    githubUrl: [],
    liveUrl: "",
  },
  {
    id: "4",
    title: "TokoNeo — Game Voucher Marketplace Engine",
    category: "Full-Stack",
    description:
      "Engineered a white-label game voucher marketplace engine now powering 4 live storefronts, integrating third-party provider catalogs across 20+ active games — from landing and SEO pages to a streamlined buy flow where users pick a game, choose a voucher amount, and pay through our in-house payment gateway. Built a dashboard with daily reporting and transaction history, RBAC, and a dynamic CMS for content teams, while sustaining 90%+ unit test coverage (FE & BE), 90+ green PageSpeed scores on mobile & desktop, and full observability across logs, latency, and server health.",
    image:
      "/portfolio-images/tokoneo/tokoneo-landing.jpg",
    images: [
      { src: "/portfolio-images/tokoneo/tokoneo-landing.jpg", alt: "Tokoneo landing page banner" },
      { src: "/portfolio-images/tokoneo/tokoneo-1.jpg", alt: "TokoNeo Landing Page" },
      { src: "/portfolio-images/tokoneo/tokoneo-2.jpg", alt: "TokoNeo Dashboard Reports and CMS Contents" },
      { src: "/portfolio-images/tokoneo/tokoneo-3.jpg", alt: "TokoNeo Voucher Game Detail Page" },
      { src: "/portfolio-images/tokoneo/tokoneo-4.jpg", alt: "SEO Section for Specific Voucher Game" },
      { src: "/portfolio-images/tokoneo/tokoneo-5.jpg", alt: "SEO Section in Landing Page - 1" },
      { src: "/portfolio-images/tokoneo/tokoneo-6.jpg", alt: "SEO Section in Landing Page - 2" },
    ],
    tags: [
      "Laravel",
      "FrankenPHP",
      "Tailwind CSS",
      "Redis",
      "Google Analytics",
      "Cloudflare",
      "Cloudflare R2",
      "Laravel Blade",
    ],
    githubUrl: [],
    liveUrl: "https://www.tokoneo.id/",
  },
  // {
  //   id: "5",
  //   title: "Analytics Dashboard",
  //   category: "Frontend",
  //   description:
  //     "Real-time business intelligence dashboard with custom reporting and WebSocket updates.",
  //   image:
  //     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  //   images: [
  //     { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80", alt: "Analytics Dashboard overview charts" },
  //     { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&sat=-100", alt: "Analytics Dashboard custom report builder" },
  //     { src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80", alt: "Analytics Dashboard real-time updates view" },
  //   ],
  //   tags: ["Vue.js", "D3.js", "WebSocket"],
  //   githubUrl: [{ label: "Github", url: "#" }],
  //   liveUrl: "#",
  // },
  // {
  //   id: "6",
  //   title: "DevOps Pipeline",
  //   category: "DevOps",
  //   description:
  //     "Automated CI/CD infrastructure with containerization, monitoring, and cloud deployment.",
  //   image:
  //     "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&q=80",
  //   images: [
  //     { src: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=900&q=80", alt: "DevOps Pipeline CI/CD dashboard" },
  //     { src: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=900&q=80&sat=-100", alt: "DevOps Pipeline container monitoring view" },
  //     { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80", alt: "DevOps Pipeline deployment logs" },
  //   ],
  //   tags: ["Docker", "K8s", "Terraform"],
  //   githubUrl: [{ label: "Github", url: "#" }],
  //   liveUrl: "#",
  // },
];

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Mid Full-Stack Engineer",
    company: "Kredivo Group",
    period: "Jan 2026 – Present",
    location: "Jakarta, Indonesia",
    description:
      "Leading full-stack development of internal collections platforms, driving multi-region rollouts across 4 countries and end-to-end ownership of system design, dashboards, and delivery.",
    highlights: [
      "Led full-stack revamp of internal collections platform (Viper) to Golang and Next.js, overhauling UI/UX and RBAC mechanisms while maintaining 90%+ code coverage across FE and BE",
      "Architected multi-region BigQuery dashboards across 4 countries (Indonesia, Thailand, Philippines, Vietnam), enabling each regional unit to independently track and improve collections performance at 100% business operability",
      "Took full end-to-end ownership across multiple projects — driving system design, ERD, API contracts, backend logic, and dashboard UI — ensuring on-time delivery and 100% quality compliance",
      "Accelerated delivery by 70%+ through pragmatic tooling, adopting Google Apps Script, Cloud Run, BigQuery Scheduled Queries, and AppSheet to ship stakeholder requests on time",
      "Owned delivery of Agent Onboarding Journey Tracking platform integrating 7 stakeholder teams (HR, L&D, Trainer, TL, QC, Area & Regional Manager) into a single cross-platform system",
    ],
    tags: ["Golang", "Next.js", "TypeScript", "BigQuery", "Google Cloud Run", "RBAC", "Multi-Region"],
    current: true,
  },
  {
    id: "2",
    role: "Lead Software Engineer (Full-Stack & AI)",
    company: "Jet Studio – Prism",
    period: "Aug 2025 – Mar 2026",
    location: "Vancouver, BC, Canada",
    description:
      "Led full-stack and AI engineering for a live trading product, building a Chrome Extension AI assistant, integrating LLM models, and owning end-to-end product engineering across auth, payments, and analytics.",
    highlights: [
      "Architected a Chrome Extension AI assistant for real-time trading chart analysis using React.js, TypeScript, Tailwind CSS, Firebase, Supabase, and Express.js — delivering 100% improvement in trading decision experience",
      "Integrated Claude AI (LLM) models into a live trading product, enabling 2x faster and more accurate market analysis through intelligent AI-assisted workflows",
      "Owned full product engineering across auth, payments, and analytics — implementing Google Auth, Stripe, and PostHog for a seamless onboarding-to-payment journey with end-to-end user tracking",
      "Led a 3-person engineering team, establishing workflows, code standards, and sprint planning that improved delivery speed by 30% with 100% milestone completion",
    ],
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Firebase", "Supabase", "Express.js", "Claude AI", "Stripe"],
    current: false,
  },
  {
    id: "3",
    role: "Software Engineer (Frontend)",
    company: "Tiket.com",
    period: "Mar 2022 – Dec 2025",
    location: "Jakarta, Indonesia",
    description:
      "Built and maintained high-performance accommodation pages, achieving 80% improvement in page performance and SEO scores while sustaining Lighthouse scores above 90% in production.",
    highlights: [
      "Rebuilt responsive accommodation pages (hotel & homes) using Next.js and TypeScript, achieving 80% improvement in page performance and SEO scores with LCP and CLS consistently under 2 seconds",
      "Engineered post-purchase pages with WebView and Iframe integration, delivering a unified codebase across web, Android, and iOS — improving development and deployment effectiveness by 100%",
      "Produced 3 technical improvement documents and a 10-page Pre/Post purchase flow documentation, enabling seamless knowledge transfer and long-term maintainability",
      "Drove code and design review processes sustaining 90%+ unit test coverage, assisting the tech lead on sprint planning to ensure 100% smooth delivery cadence",
      "Proactively owned continuous page performance monitoring, keeping LCP and CLS green under 2 seconds and Lighthouse Performance & Accessibility scores above 90%",
    ],
    tags: ["Next.js", "TypeScript", "React.js", "WebView", "Iframe", "SEO", "Lighthouse", "Unit Testing"],
    current: false,
  },
  {
    id: "4",
    role: "Full-Stack Web Development Bootcamp Mentor",
    company: "Dibimbing.id",
    period: "Jan 2025 – Feb 2026",
    location: "Jakarta, Indonesia",
    description:
      "Mentored 100+ students across 5 batches in full-stack web development, achieving 4.8/5 satisfaction scores across comprehension, performance, and class interactivity.",
    highlights: [
      "Mentored 100+ students across 5 batches (FE21, FE22, FE23, GO03, GO04) covering HTML, CSS, Figma, JavaScript, TypeScript, React.js, and Golang — achieving 4.8/5 satisfaction scores",
      "Designed assignments (4–5 questions/session) with 85%+ of students scoring above 85, demonstrating strong instructional effectiveness across all technical topics",
      "Collaborated with 3 L&D members and 5 Class Managers to ensure sessions remained structured, interactive, and accessible without overwhelming students on complex materials",
    ],
    tags: ["React.js", "TypeScript", "Golang", "JavaScript", "HTML/CSS", "Figma", "Mentoring"],
    current: false,
  },
  {
    id: "5",
    role: "Software Engineer (Full-Stack) Intern",
    company: "PT. Telkom Indonesia Tbk",
    period: "Dec 2020 – Apr 2021",
    location: "Palembang, Indonesia",
    description:
      "Independently built a full-stack network problem reporting dashboard from the ground up as a sole contributor, delivering a production-ready platform within the internship period.",
    highlights: [
      "Independently built a full-stack network problem reporting dashboard using JavaScript and CodeIgniter 3, delivering a production-ready platform as a sole contributor within the internship period",
      "Improved submission effectiveness by 100% by enabling field teams to file reports from mobile devices, eliminating manual processes and accelerating incident response",
      "Led a 3-person team across the full project lifecycle, demonstrating early leadership ownership beyond internship scope",
    ],
    tags: ["JavaScript", "CodeIgniter 3", "PHP", "MySQL", "Full-Stack"],
    current: false,
  },
];

export const techCategories: TechCategory[] = [
  {
    label: "Languages",
    items: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Python", icon: "python" },
      { name: "Golang", icon: "golang" },
      { name: "PHP", icon: "php" },
      { name: "Dart", icon: "dart" },
      { name: "Flutter", icon: "flutter" },
    ],
  },
  {
    label: "Frameworks & Libraries",
    items: [
      { name: "React.js", icon: "reactjs" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Express.js", icon: "expressjs" },
      { name: "Nest.js", icon: "nestjs" },
      { name: "Laravel", icon: "laravel" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
    ],
  },
  {
    label: "Databases & Backend Services",
    items: [
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Firebase", icon: "firebase" },
      { name: "Supabase", icon: "supabase" },
      { name: "GraphQL", icon: "graphql" },
    ],
  },
  {
    label: "Payments",
    items: [
      { name: "Stripe", icon: "stripe" },
      { name: "Xendit", icon: "xendit" },
    ],
  },
  {
    label: "Cloud & Infrastructure",
    items: [
      { name: "Cloudflare", icon: "cloudflare" },
      { name: "Cloudflare R2", icon: "cloudflarer2" },
      { name: "AWS SES", icon: "awsses" },
      { name: "Docker", icon: "docker" },
      { name: "Grafana", icon: "grafana" },
      { name: "Kibana", icon: "kibana" },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { name: "Claude Code", icon: "claudecode" },
      { name: "Gemini", icon: "gemini" },
      { name: "Perplexity", icon: "perplexity" },
      { name: "Loveable", icon: "loveable" },
      { name: "Emergent", icon: "emergent" },
    ],
  },
  {
    label: "Developer & Productivity Tools",
    items: [
      { name: "VS Code", icon: "vscode" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Figma", icon: "figma" },
      { name: "Postman", icon: "postman" },
      { name: "DBeaver", icon: "dbeaver" },
      { name: "Babel", icon: "babel" },
      { name: "Webpack", icon: "webpack" },
      { name: "Swagger API", icon: "swaggerapi" },
      { name: "Confluence", icon: "confluence" },
      { name: "Resend", icon: "resend" },
      { name: "PostHog", icon: "posthog" },
      { name: "WebView", icon: "webview" },
      { name: "WIX.js", icon: "wixjs" },
    ],
  },
];
