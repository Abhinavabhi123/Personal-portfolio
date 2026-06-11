import { useState } from "react";
import { adminLogin, adminLogout, isAuthed, useContent } from "../lib/store";
import { Btn, Field, inputClass, SavedToast } from "./ui";
import {
  DashboardHome,
  EducationManager,
  ExperienceManager,
  MessagesInbox,
  ProfileEditor,
  ProjectsManager,
  ServicesManager,
  SkillsManager,
  TestimonialsManager,
} from "./sections";

/* ----------------------------------- login ----------------------------------- */

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const { backendOnline } = useContent();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const ok = await adminLogin(username, password);
    setBusy(false);
    if (ok) onLogin();
    else setError("Invalid username or password.");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-teal-500/15 blur-[120px]" />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-cyan-600/15 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-600 font-mono text-lg font-bold text-[#070b16] shadow-lg shadow-teal-500/30">
            {"</>"}
          </span>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to manage your portfolio content</p>
        </div>

        <form
          onSubmit={submit}
          className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur"
        >
          <Field label="Username">
            <input
              className={inputClass}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoFocus
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </Field>

          {error && (
            <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-sm text-red-300">
              {error}
            </p>
          )}

          <Btn type="submit" disabled={busy} className="w-full py-3">
            {busy ? "Signing in…" : "Sign In"}
          </Btn>

          {/* <div className="rounded-lg border border-white/5 bg-black/20 px-4 py-3 text-center font-mono text-xs text-slate-500">
            demo credentials — user: <span className="text-teal-300">admin</span> · pass:{" "}
            <span className="text-teal-300">admin123</span>
            <br />
            <span className={backendOnline ? "text-emerald-400" : "text-amber-400"}>
              {backendOnline ? "● Express API connected" : "● API offline — demo mode (localStorage)"}
            </span>
          </div> */}
        </form>

        <p className="mt-6 text-center">
          <a href="/#home" className="text-sm text-slate-500 transition-colors hover:text-teal-300">
            ← Back to website
          </a>
        </p>
      </div>
    </div>
  );
}

/* ----------------------------------- layout ----------------------------------- */

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "profile", label: "Profile & Hero", icon: "👤" },
  { id: "skills", label: "Skills", icon: "🛠️" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "projects", label: "Projects", icon: "🗂️" },
  { id: "services", label: "Services", icon: "🧩" },
  { id: "testimonials", label: "Testimonials", icon: "💬" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "messages", label: "Messages", icon: "📨" },
];

export default function AdminApp() {
  const [authed, setAuthed] = useState(isAuthed());
  const [tab, setTab] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const { backendOnline } = useContent();

  const flashSaved = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2200);
  };

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const renderTab = () => {
    switch (tab) {
      case "profile":
        return <ProfileEditor onSaved={flashSaved} />;
      case "skills":
        return <SkillsManager onSaved={flashSaved} />;
      case "experience":
        return <ExperienceManager onSaved={flashSaved} />;
      case "projects":
        return <ProjectsManager onSaved={flashSaved} />;
      case "services":
        return <ServicesManager onSaved={flashSaved} />;
      case "testimonials":
        return <TestimonialsManager onSaved={flashSaved} />;
      case "education":
        return <EducationManager onSaved={flashSaved} />;
      case "messages":
        return <MessagesInbox />;
      default:
        return <DashboardHome onNavigate={setTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#070b16]">
      {/* sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/5 bg-[#090e1c] transition-transform lg:static lg:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-white/5 px-6 font-mono font-bold text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-cyan-600 text-xs text-[#070b16]">
            {"</>"}
          </span>
          Admin<span className="text-teal-400">Panel</span>
        </div>

        <nav className="space-y-1 p-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setMenuOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                tab === t.id
                  ? "bg-teal-400/10 text-teal-300"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full space-y-2 border-t border-white/5 p-4">
          <a
            href="/#home"
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            🌐 View Website
          </a>
          <button
            onClick={() => {
              adminLogout();
              setAuthed(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-red-300/80 transition-colors hover:bg-red-400/10 hover:text-red-300"
          >
            🚪 Log Out
          </button>
        </div>
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setMenuOpen(false)} />
      )}

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/5 bg-[#070b16]/90 px-5 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
              aria-label="Open menu"
            >
              ☰
            </button>
            <h1 className="font-semibold text-white capitalize">
              {tabs.find((t) => t.id === tab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium sm:flex ${
                backendOnline
                  ? "bg-emerald-400/10 text-emerald-300"
                  : "bg-amber-400/10 text-amber-300"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${backendOnline ? "bg-emerald-400" : "bg-amber-400"}`} />
              {backendOnline ? "Express API" : "Demo Mode"}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 text-sm font-bold text-[#070b16]">
              A
            </span>
          </div>
        </header>

        <main className="flex-1 px-5 py-8 lg:px-8">
          <div className="mx-auto max-w-5xl">{renderTab()}</div>
        </main>
      </div>

      <SavedToast show={savedToast} />
    </div>
  );
}
