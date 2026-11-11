import type {
  TechCategory,
  SoftSkill,
  EducationEntry,
} from "@/lib/types";

// Static portfolio content: skills, education and profile facts. Projects and
// experience are stored in MySQL (see lib/data/projects.ts and experience.ts).
// Plain module (no "use client" / no store) so Server Components can import it
// directly without shipping the data as hydrated client state.

export const techCategories: TechCategory[] = [
  {
    label: "Frontend and Design",
    items: [
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Figma", icon: "figma" },
    ],
    more: ["Responsive Design", "Web Performance", "SEO", "UI/UX Design", "Unit Testing"],
  },
  {
    label: "Backend and Data",
    items: [
      { name: "Golang", icon: "golang" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "expressjs" },
      { name: "Kafka", icon: "kafka" },
      { name: "MySQL", icon: "mysql" },
      { name: "BigQuery", icon: "bigquery" },
      { name: "Firebase", icon: "firebase" },
      { name: "Supabase", icon: "supabase" },
    ],
    more: ["REST API Design", "Event Driven Architecture"],
  },
  {
    label: "Cloud, Monitoring and Payments",
    items: [
      { name: "Google Cloud", icon: "googlecloud" },
      { name: "Datadog", icon: "datadog" },
      { name: "Kibana", icon: "kibana" },
      { name: "Grafana", icon: "grafana" },
      { name: "Stripe", icon: "stripe" },
      { name: "Xendit", icon: "xendit" },
    ],
    more: ["Scalyr"],
  },
  {
    label: "AI and LLM Applications",
    items: [
      { name: "Claude API", icon: "anthropic" },
      { name: "Claude Code", icon: "claude" },
      { name: "GitHub Copilot", icon: "githubcopilot" },
      { name: "Cursor", icon: "cursor" },
      { name: "MCP", icon: "mcp" },
    ],
    more: [
      "Prompt Engineering",
      "LLM Application Development",
      "Agentic AI (OpenClaw, Hermes Agent)",
      "CRM and WhatsApp Integration (Mekari Qontak)",
    ],
  },
];

/** Topics being learned right now, shown as a short note under the skills. */
export const currentlyBuilding = ["AI Agents", "Structured Outputs", "RAG"];

export const softSkills: SoftSkill[] = [
  {
    title: "Technical leadership",
    evidence:
      "Led teams of 3 at Pergi Ceria Tour and Jet Studio, and raised sprint completion from 2 of 5 planned tasks to all 5.",
  },
  {
    title: "Product management",
    evidence:
      "Wrote 8 PRDs covering user flows, UI mockups and API contracts, and ran research, timelines, UAT and deployment.",
  },
  {
    title: "Mentoring",
    evidence:
      "Mentored 200+ bootcamp students across 10+ batches, averaging 4.75+/5 from learners.",
  },
  {
    title: "Code review and standards",
    evidence:
      "Led code and design reviews at tiket.com and introduced review workflows on distributed teams.",
  },
  {
    title: "Public speaking",
    evidence:
      "Judge and speaker at the Fydemy BitBash Hackathon, speaker at the UIUXINDO Product Design Festival, and host of community tech sharing sessions.",
  },
  {
    title: "Technical documentation",
    evidence:
      "Wrote a 10 page flow specification, PRDs and shared prompting guides that teams used for onboarding and maintenance.",
  },
  {
    title: "Working across teams",
    evidence:
      "Delivered with stakeholders from 7 teams at Kredivo, regional teams in 4 countries, and L&D and class managers at Dibimbing.",
  },
];

export const education: EducationEntry[] = [
  {
    school: "Universitas Sriwijaya",
    degree: "B.S. Computer Science",
    period: "Aug 2018 to Jun 2022",
    note: "GPA 3.74 / 4.00",
  },
];

/** Facts reused across the hero, about preview and about page. All come from the resume. */
export const profileFacts = {
  yearsExperience: "4.5+",
  studentsMentored: "200+",
  countriesServed: "4",
  languages: "Indonesian (native), English (native level)",
};

export const RESUME_HREF = "/M_Daffa_Badran_Thoriq_Resume.pdf";
