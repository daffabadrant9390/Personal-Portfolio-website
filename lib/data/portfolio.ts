import type { Project, Experience, TechCategory } from "@/lib/types";

// Static portfolio content. Plain module (no "use client" / no store) so it can
// be imported directly by Server Components without shipping the data as
// hydrated client state.

export const projects: Project[] = [
  {
    id: "1",
    title: "Tiket.com — Accommodation Platform",
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
    tags: ["Next.js", "TypeScript", "React.js", "WebView", "SEO", "Lighthouse"],
    githubUrl: "",
    liveUrl: "#",
  },
  {
    id: "2",
    title: "EdTech CMS",
    category: "Full-Stack",
    description:
      "Content management system for online learning platforms with real-time collaboration tools.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=900&q=80", alt: "EdTech CMS dashboard overview" },
      { src: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=900&q=80&sat=-100", alt: "EdTech CMS content editor" },
      { src: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=900&q=80", alt: "EdTech CMS collaboration view" },
    ],
    tags: ["Next.js", "Prisma", "Redis"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "3",
    title: "Genetic Engine",
    category: "AI/ML",
    description:
      "AI-powered data processing pipeline for bioinformatics research and genomic analysis.",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80", alt: "Genetic Engine pipeline visualization" },
      { src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80&sat=-100", alt: "Genetic Engine data processing view" },
      { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80", alt: "Genetic Engine analysis results" },
    ],
    tags: ["Python", "FastAPI", "ML"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "4",
    title: "E-Commerce Platform",
    category: "Full-Stack",
    description:
      "Full-stack multi-vendor marketplace with real-time inventory and Stripe integration.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80", alt: "E-Commerce Platform storefront" },
      { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&sat=-100", alt: "E-Commerce Platform vendor dashboard" },
      { src: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=900&q=80", alt: "E-Commerce Platform checkout flow" },
    ],
    tags: ["React", "GraphQL", "Stripe"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "5",
    title: "Analytics Dashboard",
    category: "Frontend",
    description:
      "Real-time business intelligence dashboard with custom reporting and WebSocket updates.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80", alt: "Analytics Dashboard overview charts" },
      { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&sat=-100", alt: "Analytics Dashboard custom report builder" },
      { src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80", alt: "Analytics Dashboard real-time updates view" },
    ],
    tags: ["Vue.js", "D3.js", "WebSocket"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "6",
    title: "DevOps Pipeline",
    category: "DevOps",
    description:
      "Automated CI/CD infrastructure with containerization, monitoring, and cloud deployment.",
    image:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=900&q=80", alt: "DevOps Pipeline CI/CD dashboard" },
      { src: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=900&q=80&sat=-100", alt: "DevOps Pipeline container monitoring view" },
      { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80", alt: "DevOps Pipeline deployment logs" },
    ],
    tags: ["Docker", "K8s", "Terraform"],
    githubUrl: "#",
    liveUrl: "#",
  },
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
    label: "Tech Stack",
    items: [
      { name: "React JS", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Node.JS", icon: "nodejs" },
      { name: "Python", icon: "python" },
    ],
  },
  {
    label: "Framework",
    items: [
      { name: "Next.js", icon: "nextjs" },
      { name: "Nest.js", icon: "nestjs" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "GraphQL", icon: "graphql" },
    ],
  },
  {
    label: "Development Tools",
    items: [
      { name: "VS Code", icon: "vscode" },
      { name: "Figma", icon: "figma" },
      { name: "Git", icon: "git" },
      { name: "Docker", icon: "docker" },
    ],
  },
];
