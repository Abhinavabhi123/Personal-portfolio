import { useMemo, useState } from "react";
import SectionHeading from "./SectionHeading";
import { useReveal } from "../hooks/useReveal";
import { useContent } from "../lib/store";

export default function Projects() {
  const gridRef = useReveal();
  const { projects } = useContent().content;
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative py-24">
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Portfolio"
          title="Featured projects"
          subtitle="A selection of products I've designed, built, and shipped — from SaaS platforms to open-source tools."
        />

        {/* filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active === c
                  ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-[#070b16] shadow-lg shadow-teal-500/25"
                  : "border border-white/10 bg-white/[0.03] text-slate-300 hover:border-teal-400/40 hover:text-teal-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-1.5 hover:border-teal-400/40 hover:shadow-2xl hover:shadow-teal-500/10"
            >
              {/* visual header */}
              <div className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                      }}
                    />
                    <span className="relative text-6xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
                      {p.emoji}
                    </span>
                  </>
                )}
                {p.featured && (
                  <span className="absolute top-3 right-3 rounded-full bg-[#070b16]/70 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur">
                    ★ Featured
                  </span>
                )}
                <span className="absolute bottom-3 left-3 rounded-full bg-[#070b16]/70 px-3 py-1 font-mono text-xs text-teal-300 backdrop-blur">
                  {p.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-teal-300">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4">
                  <a href={p.links.demo} className="flex items-center gap-1.5 text-sm font-semibold text-teal-300 transition-colors hover:text-teal-200">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                    Live Demo
                  </a>
                  <a href={p.links.code} className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition-colors hover:text-white">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                    </svg>
                    Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
