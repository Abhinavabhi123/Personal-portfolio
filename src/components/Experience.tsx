import SectionHeading from "./SectionHeading";
import type { Experience as ExperienceType } from "../data/portfolio";
import { useReveal } from "../hooks/useReveal";
import { useContent } from "../lib/store";

function TimelineItem({ exp, index }: { exp: ExperienceType; index: number }) {
  const ref = useReveal();
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`relative md:flex ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
      {/* dot */}
      <span className="absolute top-7 left-[11px] z-10 flex h-4 w-4 items-center justify-center md:left-1/2 md:-translate-x-1/2">
        <span className="absolute h-4 w-4 animate-ping rounded-full bg-teal-400/40" style={{ animationDuration: "3s" }} />
        <span className="relative h-3 w-3 rounded-full border-2 border-[#070b16] bg-teal-400" />
      </span>

      <div className={`ml-10 md:ml-0 md:w-[calc(50%-2.5rem)] ${isLeft ? "" : ""}`}>
        <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-teal-400/40 hover:shadow-xl hover:shadow-teal-500/5">
          <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-white">{exp.role}</h3>
            <span className="rounded-full bg-teal-400/10 px-3 py-1 font-mono text-xs text-teal-300">
              {exp.period}
            </span>
          </div>
          <p className="text-sm font-medium text-cyan-300">
            {exp.company} <span className="text-slate-500">· {exp.location}</span>
          </p>
          <ul className="mt-4 space-y-2">
            {exp.points.map((p, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-400">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400/70" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {exp.stack.map((t) => (
              <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-400">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { experiences } = useContent().content;
  return (
    <section id="experience" className="relative py-24">
      <div className="pointer-events-none absolute top-1/3 right-0 h-80 w-80 rounded-full bg-teal-600/10 blur-[120px]" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="Career"
          title="Work experience"
          subtitle="Seven years of shipping production software across fintech, SaaS, and agency work."
        />

        <div className="relative space-y-10">
          {/* vertical line */}
          <span className="absolute top-2 bottom-2 left-[18px] w-px bg-gradient-to-b from-teal-400/60 via-white/15 to-transparent md:left-1/2" />
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
