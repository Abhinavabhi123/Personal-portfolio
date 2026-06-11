import { useEffect, useState } from "react";
import { profile as profileDefaults } from "../data/portfolio";
import { useContent } from "../lib/store";

function useTyped(words: string[], typeSpeed = 70, deleteSpeed = 40, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

const socialIcons: { key: keyof typeof profileDefaults.socials; label: string; path: string }[] = [
  {
    key: "github",
    label: "GitHub",
    path: "M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5A10 10 0 0 0 22 12 10 10 0 0 0 12 2z",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
  },
  {
    key: "twitter",
    label: "Twitter / X",
    path: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z",
  },
];

export default function Hero() {
  const { content } = useContent();
  const { profile } = content;
  const typed = useTyped(profile.typedRoles);

  const stats = [
    { value: `${profile.yearsExperience}+`, label: "Years Experience" },
    { value: `${profile.projectsCompleted}+`, label: "Projects Shipped" },
    { value: `${profile.happyClients}+`, label: "Happy Clients" },
    { value: `${profile.openSourceContribs}+`, label: "OSS Contributions" },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-36">
      {/* background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-teal-500/15 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-cyan-600/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-600/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        {/* left */}
        <div className="text-center lg:text-left" style={{ animation: "fadeUp 0.8s ease both" }}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5 text-sm text-teal-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
            </span>
            Available for full-time & Part-time
          </span>

          <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>

          <p className="mt-4 font-mono text-xl text-slate-300 sm:text-2xl">
            <span className="text-teal-400">&gt;</span> {typed}
            <span className="animate-blink text-teal-400">|</span>
          </p>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#projects"
              className="rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-7 py-3.5 font-semibold text-[#070b16] shadow-lg shadow-teal-500/30 transition-transform hover:scale-105"
            >
              View My Work
            </a>
            <a
              href={profile.resumeUrl}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur transition-colors hover:border-teal-400/50 hover:text-teal-300"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download CV
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
            {socialIcons.map((s) => (
              <a
                key={s.key}
                href={profile.socials[s.key]}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:-translate-y-1 hover:border-teal-400/50 hover:text-teal-300"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* right — portrait */}
        <div className="relative mx-auto w-full max-w-md" style={{ animation: "fadeUp 0.8s 0.2s ease both" }}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-teal-400/40 via-cyan-500/20 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-slate-800/60 to-slate-900/80 shadow-2xl shadow-black/50">
              <img
                src="/images/abhinav-profile.webp"
                alt={profile.name}
                className="h-auto w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b16]/70 via-transparent to-transparent" />
            </div>

            {/* floating badges */}
            <div className="animate-float absolute -top-5 -left-5 rounded-2xl border border-white/10 bg-[#0d1426]/90 px-4 py-3 shadow-xl backdrop-blur">
              <p className="font-mono text-xs text-slate-400">Clean Code</p>
              <p className="text-sm font-bold text-teal-300">{"{ TypeScript }"}</p>
            </div>
            <div className="animate-float absolute -right-4 top-1/3 rounded-2xl border border-white/10 bg-[#0d1426]/90 px-4 py-3 shadow-xl backdrop-blur" style={{ animationDelay: "1.5s" }}>
              <p className="font-mono text-xs text-slate-400">Uptime</p>
              <p className="text-sm font-bold text-cyan-300">99.99% </p>
            </div>
            <div className="animate-float absolute -bottom-5 left-8 rounded-2xl border border-white/10 bg-[#0d1426]/90 px-4 py-3 shadow-xl backdrop-blur" style={{ animationDelay: "0.8s" }}>
              <p className="font-mono text-xs text-slate-400">Experience</p>
              <p className="text-sm font-bold text-white">{profile.yearsExperience}+ Years 🚀</p>
            </div>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="relative mx-auto mt-20 max-w-5xl px-5 sm:px-8" style={{ animation: "fadeUp 0.8s 0.4s ease both" }}>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0a0f1e] px-6 py-7 text-center">
              <p className="bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-3xl font-extrabold text-transparent">
                {s.value}
              </p>
              <p className="mt-1 text-xs tracking-wide text-slate-400 uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
