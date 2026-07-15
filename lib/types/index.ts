export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
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
  githubUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  highlights?: string[];
  tags?: string[];
  current?: boolean;
}

export interface TechItem {
  name: string;
  icon: string;
  color?: string;
}

export interface TechCategory {
  label: string;
  items: TechItem[];
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
