import { Schema, model } from 'mongoose';

/* ------------------------------ sub-schemas ------------------------------ */

const SocialsSchema = new Schema(
  {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    dribbble: { type: String, default: '' },
  },
  { _id: false }
);

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    level: { type: Number, required: true, min: 0, max: 100 },
  },
  { _id: false }
);

const SkillGroupSchema = new Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, default: '🛠️' },
    skills: { type: [SkillSchema], default: [] },
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    tags: { type: [String], default: [] },
    gradient: { type: String, default: 'from-teal-500/30 via-cyan-500/20 to-blue-600/30' },
    emoji: { type: String, default: '🚀' },
    image: { type: String, default: undefined },
    category: { type: String, default: 'General' },
    featured: { type: Boolean, default: false },
    links: {
      demo: { type: String, default: '#' },
      code: { type: String, default: '#' },
    },
  },
  { _id: false }
);

const ExperienceSchema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    period: { type: String, default: '' },
    location: { type: String, default: '' },
    points: { type: [String], default: [] },
    stack: { type: [String], default: [] },
  },
  { _id: false }
);

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    icon: { type: String, default: '🧩' },
  },
  { _id: false }
);

const TestimonialSchema = new Schema(
  {
    quote: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: '' },
    initials: { type: String, default: '' },
  },
  { _id: false }
);

const EducationSchema = new Schema(
  {
    school: { type: String, required: true },
    degree: { type: String, default: '' },
    period: { type: String, default: '' },
    detail: { type: String, default: '' },
  },
  { _id: false }
);

const CertificationSchema = new Schema(
  {
    name: { type: String, required: true },
    year: { type: String, default: '' },
  },
  { _id: false }
);

/* ------------------------------ profile schema ------------------------------ */

const ProfileSchema = new Schema(
  {
    name: { type: String, default: 'Alex Carter' },
    role: { type: String, default: 'Full Stack Developer' },
    tagline: { type: String, default: '' },
    location: { type: String, default: 'San Francisco, CA' },
    email: { type: String, default: 'hello@example.com' },
    phone: { type: String, default: '+1 (415) 555-0192' },
    resumeUrl: { type: String, default: '#' },
    yearsExperience: { type: Number, default: 7 },
    projectsCompleted: { type: Number, default: 48 },
    happyClients: { type: Number, default: 26 },
    openSourceContribs: { type: Number, default: 320 },
    socials: { type: SocialsSchema, default: {} },
    typedRoles: { type: [String], default: [] },
    about: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
  },
  { _id: false }
);

/* ------------------------------ content document ------------------------------ */

const ContentSchema = new Schema(
  {
    profile: { type: ProfileSchema, required: true },
    skillGroups: { type: [SkillGroupSchema], default: [] },
    techStack: { type: [String], default: [] },
    experiences: { type: [ExperienceSchema], default: [] },
    projects: { type: [ProjectSchema], default: [] },
    services: { type: [ServiceSchema], default: [] },
    testimonials: { type: [TestimonialSchema], default: [] },
    education: { type: [EducationSchema], default: [] },
    certifications: { type: [CertificationSchema], default: [] },
  },
  { timestamps: true }
);

export const ContentModel = model('Content', ContentSchema);

/* ------------------------------ message document ------------------------------ */

const MessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: '' },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const MessageModel = model('Message', MessageSchema);

/* ------------------------------ session document ------------------------------ */

const SessionSchema = new Schema({
  token: { type: String, required: true, unique: true },
  expires: { type: Date, required: true },
});

export const SessionModel = model('Session', SessionSchema);
