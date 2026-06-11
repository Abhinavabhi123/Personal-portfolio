import { useEffect, useState } from "react";
import {
  useContent,
  fetchMessages,
  setMessageRead,
  deleteMessage,
  type ContactMessage,
  type ContentData,
} from "../lib/store";
import {
  Btn,
  CollectionManager,
  Field,
  inputClass,
  listField,
  textField,
  type FieldDef,
} from "./ui";
import ImageUpload from "./ImageUpload";
import type { Project, Service, SkillGroup, Experience as ExperienceType } from "../data/portfolio";

type SaveFn = (next: ContentData) => void;

type Experience = ExperienceType;

/* --------------------------------- dashboard --------------------------------- */

export function DashboardHome({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { content, backendOnline } = useContent();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    fetchMessages().then((msgs) => setUnread(msgs.filter((m) => !m.read).length));
  }, []);

  const cards = [
    { label: "Projects", value: content.projects.length, tab: "projects", icon: "🗂️" },
    { label: "Skill Groups", value: content.skillGroups.length, tab: "skills", icon: "🛠️" },
    { label: "Experiences", value: content.experiences.length, tab: "experience", icon: "💼" },
    { label: "Services", value: content.services.length, tab: "services", icon: "🧩" },
    { label: "Testimonials", value: content.testimonials.length, tab: "testimonials", icon: "💬" },
    { label: "Unread Messages", value: unread, tab: "messages", icon: "📨" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white">Dashboard</h2>
      <p className="mt-1 text-sm text-slate-500">
        Welcome back, <span className="text-teal-300">{content.profile.name}</span>. Manage every
        section of your portfolio from here.
      </p>

      <div
        className={`mt-6 flex items-center gap-3 rounded-xl border px-5 py-4 text-sm ${
          backendOnline
            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
            : "border-amber-400/30 bg-amber-400/10 text-amber-300"
        }`}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
              backendOnline ? "bg-emerald-400" : "bg-amber-400"
            }`}
          />
          <span
            className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
              backendOnline ? "bg-emerald-400" : "bg-amber-400"
            }`}
          />
        </span>
        {backendOnline ? (
          <span>
            <strong>Express API connected</strong> — changes persist to the backend (server/data/db.json).
          </span>
        ) : (
          <span>
            <strong>Express API offline</strong> — running in demo mode, changes persist to this
            browser (localStorage). Start it with <code className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-xs">node server/index.js</code>
          </span>
        )}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <button
            key={c.label}
            onClick={() => onNavigate(c.tab)}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-all hover:-translate-y-1 hover:border-teal-400/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">{c.icon}</span>
              <span className="bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-3xl font-extrabold text-transparent">
                {c.value}
              </span>
            </div>
            <p className="mt-3 font-semibold text-white group-hover:text-teal-300">{c.label}</p>
            <p className="mt-0.5 text-xs text-slate-500">Click to manage →</p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- profile editor ------------------------------- */

export function ProfileEditor({ onSaved }: { onSaved: () => void }) {
  const { content, saveContent, resetContent } = useContent();
  const [p, setP] = useState(content.profile);
  const [techStack, setTechStack] = useState(content.techStack.join(", "));

  useEffect(() => {
    setP(content.profile);
    setTechStack(content.techStack.join(", "));
  }, [content]);

  const set = (key: string, value: unknown) => setP((prev) => ({ ...prev, [key]: value }));

  const save = () => {
    saveContent({
      ...content,
      profile: p,
      techStack: techStack.split(",").map((s) => s.trim()).filter(Boolean),
    });
    onSaved();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Profile & Hero</h2>
          <p className="mt-1 text-sm text-slate-500">
            Identity, hero section, stats, socials, and about content.
          </p>
        </div>
        <div className="flex gap-3">
          <Btn
            variant="danger"
            onClick={() => {
              if (confirm("Reset ALL site content to the original defaults?")) {
                resetContent();
                onSaved();
              }
            }}
          >
            Reset All Content
          </Btn>
          <Btn onClick={save}>Save Profile</Btn>
        </div>
      </div>

      <div className="space-y-8">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-4 font-semibold text-teal-300">Identity</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name">
              <input className={inputClass} value={p.name} onChange={(e) => set("name", e.target.value)} />
            </Field>
            <Field label="Role Title">
              <input className={inputClass} value={p.role} onChange={(e) => set("role", e.target.value)} />
            </Field>
            <Field label="Location">
              <input className={inputClass} value={p.location} onChange={(e) => set("location", e.target.value)} />
            </Field>
            <Field label="Email">
              <input className={inputClass} value={p.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <Field label="Phone">
              <input className={inputClass} value={p.phone} onChange={(e) => set("phone", e.target.value)} />
            </Field>
            <Field label="Resume URL">
              <input className={inputClass} value={p.resumeUrl} onChange={(e) => set("resumeUrl", e.target.value)} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Tagline" hint="shown under your name in the hero">
              <textarea
                rows={2}
                className={`${inputClass} resize-y`}
                value={p.tagline}
                onChange={(e) => set("tagline", e.target.value)}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Typed Roles" hint="one per line — animated in the hero">
              <textarea
                rows={4}
                className={`${inputClass} resize-y`}
                value={p.typedRoles.join("\n")}
                onChange={(e) => set("typedRoles", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
              />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-4 font-semibold text-teal-300">Hero Stats</h3>
          <div className="grid gap-4 sm:grid-cols-4">
            <Field label="Years Exp.">
              <input type="number" className={inputClass} value={p.yearsExperience} onChange={(e) => set("yearsExperience", Number(e.target.value) || 0)} />
            </Field>
            <Field label="Projects">
              <input type="number" className={inputClass} value={p.projectsCompleted} onChange={(e) => set("projectsCompleted", Number(e.target.value) || 0)} />
            </Field>
            <Field label="Clients">
              <input type="number" className={inputClass} value={p.happyClients} onChange={(e) => set("happyClients", Number(e.target.value) || 0)} />
            </Field>
            <Field label="OSS Contribs">
              <input type="number" className={inputClass} value={p.openSourceContribs} onChange={(e) => set("openSourceContribs", Number(e.target.value) || 0)} />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-4 font-semibold text-teal-300">About Section</h3>
          <Field label="Bio Paragraphs" hint="separate paragraphs with a blank line">
            <textarea
              rows={7}
              className={`${inputClass} resize-y`}
              value={p.about.join("\n\n")}
              onChange={(e) => set("about", e.target.value.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean))}
            />
          </Field>
          <div className="mt-4">
            <Field label="Career Highlights" hint="one per line">
              <textarea
                rows={4}
                className={`${inputClass} resize-y`}
                value={p.highlights.join("\n")}
                onChange={(e) => set("highlights", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
              />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-4 font-semibold text-teal-300">Social Links</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {(Object.keys(p.socials) as (keyof typeof p.socials)[]).map((key) => (
              <Field key={key} label={key}>
                <input
                  className={inputClass}
                  value={p.socials[key]}
                  onChange={(e) => set("socials", { ...p.socials, [key]: e.target.value })}
                />
              </Field>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-4 font-semibold text-teal-300">Tech Stack Badges</h3>
          <Field label="Technologies" hint="comma separated — shown under Skills">
            <textarea rows={3} className={`${inputClass} resize-y`} value={techStack} onChange={(e) => setTechStack(e.target.value)} />
          </Field>
        </section>

        <div className="flex justify-end cursor-pointer">
          <Btn onClick={save}>Save Profile</Btn>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- collection managers ----------------------------- */

export function ProjectsManager({ onSaved }: { onSaved: () => void }) {
  const { content, saveContent } = useContent();
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState<Project | null>(null);

  const save = () => {
    if (draft == null || editing == null) return;
    const next = editing === -1 ? [...content.projects, draft] : content.projects.map((it, i) => (i === editing ? draft : it));
    saveContent({ ...content, projects: next });
    setEditing(null);
    setDraft(null);
    onSaved();
  };

  const startEdit = (index: number) => {
    setEditing(index);
    setDraft(index === -1 ? { title: "", description: "", tags: [], gradient: "from-teal-500/30 via-cyan-500/20 to-blue-600/30", emoji: "🚀", category: "SaaS", links: { demo: "#", code: "#" }, featured: false } : content.projects[index]);
  };

  const remove = (index: number) => {
    if (!confirm("Delete this project?")) return;
    saveContent({ ...content, projects: content.projects.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Projects</h2>
          <p className="mt-1 text-sm text-slate-500">Portfolio projects shown in the Featured Projects section.</p>
        </div>
        <Btn onClick={() => startEdit(-1)}>+ Add New</Btn>
      </div>

      <div className="space-y-3">
        {content.projects.map((project, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-teal-400/30">
            <div className="flex flex-col gap-1">
              <button onClick={() => { const next = [...content.projects]; [next[i], next[i - 1]] = [next[i - 1], next[i]]; saveContent({ ...content, projects: next }); }} disabled={i === 0} className="text-slate-600 hover:text-teal-300 disabled:opacity-30">▲</button>
              <button onClick={() => { const next = [...content.projects]; [next[i], next[i + 1]] = [next[i + 1], next[i]]; saveContent({ ...content, projects: next }); }} disabled={i === content.projects.length - 1} className="text-slate-600 hover:text-teal-300 disabled:opacity-30">▼</button>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">{project.emoji} {project.title}</p>
              <p className="truncate text-sm text-slate-500">{project.category} · {project.tags.join(", ")}</p>
            </div>
            <Btn variant="ghost" onClick={() => startEdit(i)}>Edit</Btn>
            <Btn variant="danger" onClick={() => remove(i)}>Delete</Btn>
          </div>
        ))}
        {content.projects.length === 0 && (
          <p className="rounded-xl border border-dashed border-white/10 py-10 text-center text-sm text-slate-500">
            No projects yet. Click "Add New" to create one.
          </p>
        )}
      </div>

      {/* edit modal */}
      {editing !== null && draft != null && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0c1322] p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editing === -1 ? "Add Project" : "Edit Project"}
              </h3>
              <button onClick={() => setEditing(null)} className="text-2xl leading-none text-slate-500 hover:text-white">×</button>
            </div>
            <div className="max-h-[70vh] space-y-4 overflow-y-auto">
              <div>
                <Field label="Project Title">
                  <input className={inputClass} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Category">
                  <input className={inputClass} value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} />
                </Field>
                <Field label="Emoji Icon">
                  <input className={inputClass} value={draft.emoji} onChange={(e) => setDraft({ ...draft, emoji: e.target.value })} placeholder="🚀" />
                </Field>
              </div>
              <Field label="Description">
                <textarea rows={4} className={`${inputClass} resize-y`} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
              </Field>
              <Field label="Tech Tags (comma-separated)">
                <input className={inputClass} value={draft.tags.join(", ")} onChange={(e) => setDraft({ ...draft, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Featured (yes/no)">
                  <input className={inputClass} value={draft.featured ? "yes" : "no"} onChange={(e) => setDraft({ ...draft, featured: /^(y|true|1)/i.test(e.target.value.trim()) })} />
                </Field>
              </div>
              <Field label="Live Demo URL">
                <input className={inputClass} value={draft.links.demo} onChange={(e) => setDraft({ ...draft, links: { ...draft.links, demo: e.target.value } })} />
              </Field>
              <Field label="Source Code URL">
                <input className={inputClass} value={draft.links.code} onChange={(e) => setDraft({ ...draft, links: { ...draft.links, code: e.target.value } })} />
              </Field>
              <Field label="Card Gradient">
                <input className={inputClass} value={draft.gradient} onChange={(e) => setDraft({ ...draft, gradient: e.target.value })} placeholder="from-teal-500/30 via-cyan-500/20 to-blue-600/30" />
              </Field>
              <ImageUpload value={draft.image} onChange={(img) => setDraft({ ...draft, image: img })} label="Project Image" />
            </div>
            <div className="mt-7 flex justify-end gap-3 border-t border-white/10 pt-6">
              <Btn variant="ghost" onClick={() => setEditing(null)}>Cancel</Btn>
              <Btn onClick={save}>{editing === -1 ? "Add Project" : "Save Changes"}</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SkillsManager({ onSaved }: { onSaved: () => void }) {
  const { content, saveContent } = useContent();
  const save: SaveFn = (next) => {
    saveContent(next);
    onSaved();
  };

  const fields: FieldDef<SkillGroup>[] = [
    textField<SkillGroup>("title", "Group Title"),
    textField<SkillGroup>("icon", "Emoji Icon"),
    {
      key: "skills",
      label: "Skills",
      type: "textarea",
      hint: "one per line as: Name | level (0–100)",
      span: 2,
      format: (g) => g.skills.map((s) => `${s.name} | ${s.level}`).join("\n"),
      apply: (g, v) => ({
        ...g,
        skills: v
          .split("\n")
          .map((line) => {
            const [name, level] = line.split("|").map((s) => s.trim());
            return name ? { name, level: Math.min(100, Math.max(0, Number(level) || 0)) } : null;
          })
          .filter((s): s is { name: string; level: number } => s !== null),
      }),
    },
  ];

  return (
    <CollectionManager<SkillGroup>
      title="Skill Groups"
      description="Categorized skills with proficiency bars."
      items={content.skillGroups}
      fields={fields}
      itemTitle={(g) => `${g.icon} ${g.title}`}
      itemSubtitle={(g) => g.skills.map((s) => s.name).join(", ")}
      blank={() => ({ title: "", icon: "🛠️", skills: [] })}
      onSave={(skillGroups) => save({ ...content, skillGroups })}
    />
  );
}

export function ExperienceManager({ onSaved }: { onSaved: () => void }) {
  const { content, saveContent } = useContent();
  const save: SaveFn = (next) => {
    saveContent(next);
    onSaved();
  };

  const fields: FieldDef<Experience>[] = [
    textField<Experience>("role", "Role / Job Title"),
    textField<Experience>("company", "Company"),
    textField<Experience>("period", "Period", { hint: "e.g. 2022 — Present" }),
    textField<Experience>("location", "Location"),
    listField<Experience>("points", "Achievements", "lines"),
    listField<Experience>("stack", "Tech Stack", "comma", { span: 2 }),
  ];

  return (
    <CollectionManager<Experience>
      title="Experience"
      description="Work history shown on the career timeline."
      items={content.experiences}
      fields={fields}
      itemTitle={(e) => `${e.role} @ ${e.company}`}
      itemSubtitle={(e) => `${e.period} · ${e.location}`}
      blank={() => ({ company: "", role: "", period: "", location: "", points: [], stack: [] })}
      onSave={(experiences) => save({ ...content, experiences })}
    />
  );
}

export function ServicesManager({ onSaved }: { onSaved: () => void }) {
  const { content, saveContent } = useContent();
  const save: SaveFn = (next) => {
    saveContent(next);
    onSaved();
  };

  const fields: FieldDef<Service>[] = [
    textField<Service>("title", "Service Title"),
    textField<Service>("icon", "Emoji Icon"),
    {
      key: "description",
      label: "Description",
      type: "textarea",
      format: (s) => s.description,
      apply: (s, v) => ({ ...s, description: v }),
    },
  ];

  return (
    <CollectionManager<Service>
      title="Services"
      description="Offerings shown in the 'What I can do for you' section."
      items={content.services}
      fields={fields}
      itemTitle={(s) => `${s.icon} ${s.title}`}
      itemSubtitle={(s) => s.description}
      blank={() => ({ title: "", icon: "🧩", description: "" })}
      onSave={(services) => save({ ...content, services })}
    />
  );
}

type Testimonial = ContentData["testimonials"][number];
type Education = ContentData["education"][number];
type Certification = ContentData["certifications"][number];

export function TestimonialsManager({ onSaved }: { onSaved: () => void }) {
  const { content, saveContent } = useContent();
  const save: SaveFn = (next) => {
    saveContent(next);
    onSaved();
  };

  const fields: FieldDef<Testimonial>[] = [
    textField<Testimonial>("name", "Name"),
    textField<Testimonial>("role", "Role / Company"),
    textField<Testimonial>("initials", "Initials", { hint: "for the avatar, e.g. SM" }),
    {
      key: "quote",
      label: "Quote",
      type: "textarea",
      format: (t) => t.quote,
      apply: (t, v) => ({ ...t, quote: v }),
    },
  ];

  return (
    <CollectionManager<Testimonial>
      title="Testimonials"
      description="Client and colleague reviews."
      items={content.testimonials}
      fields={fields}
      itemTitle={(t) => t.name}
      itemSubtitle={(t) => t.role}
      blank={() => ({ quote: "", name: "", role: "", initials: "" })}
      onSave={(testimonials) => save({ ...content, testimonials })}
    />
  );
}

export function EducationManager({ onSaved }: { onSaved: () => void }) {
  const { content, saveContent } = useContent();
  const save: SaveFn = (next) => {
    saveContent(next);
    onSaved();
  };

  const eduFields: FieldDef<Education>[] = [
    textField<Education>("school", "School / University"),
    textField<Education>("degree", "Degree"),
    textField<Education>("period", "Period"),
    textField<Education>("detail", "Details", { span: 2 }),
  ];

  const certFields: FieldDef<Certification>[] = [
    textField<Certification>("name", "Certification Name"),
    textField<Certification>("year", "Year"),
  ];

  return (
    <div className="space-y-12">
      <CollectionManager<Education>
        title="Education"
        description="Degrees shown in the About section."
        items={content.education}
        fields={eduFields}
        itemTitle={(e) => e.degree}
        itemSubtitle={(e) => `${e.school} · ${e.period}`}
        blank={() => ({ school: "", degree: "", period: "", detail: "" })}
        onSave={(education) => save({ ...content, education })}
      />
      <CollectionManager<Certification>
        title="Certifications"
        description="Professional certifications shown in the About section."
        items={content.certifications}
        fields={certFields}
        itemTitle={(c) => c.name}
        itemSubtitle={(c) => c.year}
        blank={() => ({ name: "", year: String(new Date().getFullYear()) })}
        onSave={(certifications) => save({ ...content, certifications })}
      />
    </div>
  );
}

/* --------------------------------- messages --------------------------------- */

export function MessagesInbox() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  const load = () =>
    fetchMessages().then((msgs) => {
      setMessages(msgs);
      setLoading(false);
    });

  useEffect(() => {
    load();
  }, []);

  const toggleRead = async (m: ContactMessage) => {
    await setMessageRead(m.id, !m.read);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await deleteMessage(id);
    load();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Messages</h2>
        <p className="mt-1 text-sm text-slate-500">
          Submissions from the contact form. {messages.filter((m) => !m.read).length} unread.
        </p>
      </div>

      {loading ? (
        <p className="py-10 text-center text-sm text-slate-500">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/10 py-14 text-center text-sm text-slate-500">
          📭 No messages yet. Submissions from the site's contact form will appear here.
        </p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-xl border px-5 py-4 transition-colors ${
                m.read ? "border-white/10 bg-white/[0.02]" : "border-teal-400/30 bg-teal-400/[0.05]"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3">
                {!m.read && <span className="h-2 w-2 shrink-0 rounded-full bg-teal-400" />}
                <button
                  onClick={() => setOpenId(openId === m.id ? null : m.id)}
                  className="min-w-0 flex-1 text-left"
                >
                  <p className="truncate font-semibold text-white">
                    {m.subject || "(no subject)"}
                  </p>
                  <p className="truncate text-sm text-slate-500">
                    {m.name} · {m.email} · {new Date(m.createdAt).toLocaleString()}
                  </p>
                </button>
                <Btn variant="ghost" onClick={() => toggleRead(m)}>
                  {m.read ? "Mark Unread" : "Mark Read"}
                </Btn>
                <Btn variant="danger" onClick={() => remove(m.id)}>
                  Delete
                </Btn>
              </div>
              {openId === m.id && (
                <p className="mt-4 rounded-lg bg-black/20 p-4 text-sm leading-relaxed whitespace-pre-wrap text-slate-300">
                  {m.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
