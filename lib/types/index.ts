export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface GithubLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  /** Gallery for the project card carousel. Falls back to [{ src: image, alt: title }] when omitted. */
  images?: ProjectImage[];
  tags: string[];
  liveUrl?: string;
  /** Labeled repo links (e.g. a single "Github" entry, or separate FE/BE repos). */
  githubUrl?: GithubLink[];
}

export type EmploymentType =
  | "Full time"
  | "Internship"
  | "Contract"
  | "Part time"
  | "Community";

/** Which section of the experience list an entry belongs to. */
export type ExperienceGroup = "full-time" | "non-full-time";

export interface ExperienceRole {
  title: string;
  period: string;
  highlights: string[];
}

export interface Experience {
  id: string;
  /** Latest title at the company. */
  role: string;
  company: string;
  /** Overall period at the company, for example "Jan 2026 to Present". */
  period: string;
  group: ExperienceGroup;
  employmentType: EmploymentType;
  location?: string;
  /** One line about the company or the product. */
  description: string;
  /** Bullets for single role entries. */
  highlights?: string[];
  /** Per role bullets for companies with more than one role. When set, `highlights` is ignored. */
  roles?: ExperienceRole[];
  tags?: string[];
  current?: boolean;
  url?: string;
}

export interface TechItem {
  name: string;
  icon: string;
  color?: string;
}

export interface TechCategory {
  label: string;
  /** Skills that have a logo. */
  items: TechItem[];
  /** Skills and practices without a logo, shown as plain text chips. */
  more?: string[];
}

export interface SoftSkill {
  title: string;
  /** Where the skill showed up, taken from real work. */
  evidence: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  note?: string;
}

export type NavLink = {
  label: string;
  href: string;
};

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";
