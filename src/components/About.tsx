import SectionHeading from "./SectionHeading";
import { useReveal } from "../hooks/useReveal";
import { useContent } from "../lib/store";

export default function About() {
  const leftRef = useReveal();
  const rightRef = useReveal();
  const { content } = useContent();
  const { profile, education, certifications } = content;

  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="About Me"
          title="Turning ideas into reliable software"
          subtitle="A snapshot of who I am, what I've done, and what drives me as an engineer."
        />

        <div className="grid items-start gap-12 lg:grid-cols-5">
          {/* code-card */}
          <div ref={leftRef} className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1426] shadow-2xl shadow-black/40">
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-3 font-mono text-xs text-slate-500">developer.ts</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
                <code>
                  <span className="text-violet-400">const</span>{" "}
                  <span className="text-sky-300">developer</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-slate-300">{"{"}</span>
                  {"\n"}  <span className="text-teal-300">name</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-amber-300">'{profile.name}'</span>
                  <span className="text-slate-400">,</span>
                  {"\n"}  <span className="text-teal-300">role</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-amber-300">'Full Stack Dev'</span>
                  <span className="text-slate-400">,</span>
                  {"\n"}  <span className="text-teal-300">location</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-amber-300">'{profile.location}'</span>
                  <span className="text-slate-400">,</span>
                  {"\n"}  <span className="text-teal-300">languages</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-slate-300">[</span>
                  <span className="text-amber-300">'TS'</span>
                  <span className="text-slate-400">,</span>{" "}
                  <span className="text-amber-300">'Node.js'</span>
                  <span className="text-slate-400">,</span>{" "}
                  <span className="text-amber-300">'Express'</span>
                  <span className="text-slate-300">]</span>
                  <span className="text-slate-400">,</span>
                  {"\n"}  <span className="text-teal-300">coffee</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-violet-400">Infinity</span>
                  <span className="text-slate-400">,</span>
                  {"\n"}  <span className="text-sky-300">ship</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-slate-300">()</span>{" "}
                  <span className="text-violet-400">=&gt;</span>{" "}
                  <span className="text-amber-300">'🚀 production'</span>
                  <span className="text-slate-400">,</span>
                  {"\n"}<span className="text-slate-300">{"}"}</span>
                  <span className="text-slate-400">;</span>
                </code>
              </pre>
            </div>

            {/* education + certs */}
            <div className="mt-6 space-y-4">
              {education.map((e) => (
                <div key={e.school} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎓</span>
                    <div>
                      <h4 className="font-semibold text-white">{e.degree}</h4>
                      <p className="text-sm text-teal-300">{e.school}</p>
                      <p className="mt-1 text-xs text-slate-500">{e.period} · {e.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📜</span>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">Certifications</h4>
                    <ul className="space-y-1.5">
                      {certifications.map((c) => (
                        <li key={c.name} className="flex items-baseline gap-2 text-sm text-slate-400">
                          <span className="font-mono text-xs text-teal-400">{c.year}</span>
                          {c.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* bio */}
          <div ref={rightRef} className="lg:col-span-3">
            <h3 className="text-2xl font-bold text-white">
              Full stack developer based in{" "}
              <span className="text-teal-300">{profile.location}</span>
            </h3>
            {profile.about.map((p, i) => (
              <p key={i} className="mt-5 leading-relaxed text-slate-400">
                {p}
              </p>
            ))}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {profile.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition-colors hover:border-teal-400/40"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-400/15 text-teal-300">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-sm text-slate-300">{h}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <p className="text-xs tracking-wide text-slate-500 uppercase">Email</p>
                <p className="mt-1 truncate text-sm font-medium text-teal-300">{profile.email}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <p className="text-xs tracking-wide text-slate-500 uppercase">Phone</p>
                <p className="mt-1 text-sm font-medium text-white">{profile.phone}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <p className="text-xs tracking-wide text-slate-500 uppercase">Freelance</p>
                <p className="mt-1 text-sm font-medium text-emerald-400">Available ✓</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
