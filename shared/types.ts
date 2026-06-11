/**
 * Shared types between frontend and backend.
 * Keep this in-sync with src/data/portfolio.ts
 */
export type Socials = {
  github: string;
  linkedin: string;
  twitter: string;
  dribbble: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  yearsExperience: number;
  projectsCompleted: number;
  happyClients: number;
  openSourceContribs: number;
  socials: Socials;
  typedRoles: string[];
  about: string[];
  highlights: string[];
};

export type Skill = { name: string; level: number };
export type SkillGroup = { title: string; icon: string; skills: Skill[] };
export type Project = {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  emoji: string;
  image?: string; // Base64 or URL
  category: string;
  featured?: boolean;
  links: { demo: string; code: string };
};
export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  stack: string[];
};
export type Service = { title: string; description: string; icon: string };
export type Testimonial = { quote: string; name: string; role: string; initials: string };
export type Education = { school: string; degree: string; period: string; detail: string };
export type Certification = { name: string; year: string };

export type ContentData = {
  profile: Profile;
  skillGroups: SkillGroup[];
  techStack: string[];
  experiences: Experience[];
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  education: Education[];
  certifications: Certification[];
};