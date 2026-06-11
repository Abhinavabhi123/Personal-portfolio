import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { useReveal } from "../hooks/useReveal";
import { useContent } from "../lib/store";

function SkillBar({ name, level, animate }: { name: string; level: number; animate: boolean }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-slate-300">{name}</span>
        <span className="font-mono text-xs text-teal-400">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 shadow-[0_0_12px_rgba(45,212,191,0.4)] transition-all duration-1000 ease-out"
          style={{ width: animate ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const marqueeRef = useReveal();
  const { skillGroups, techStack } = useContent().content;

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="relative py-24">
      <div className="pointer-events-none absolute top-1/4 left-0 h-80 w-80 rounded-full bg-cyan-600/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Skills"
          title="My technical toolbox"
          subtitle="The languages, frameworks, and platforms I use to ship reliable products across the entire stack."
        />

        <div ref={gridRef} className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, gi) => (
            <div
              key={group.title}
              className="reveal visible rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-teal-400/40 hover:shadow-xl hover:shadow-teal-500/5"
              style={{ transitionDelay: `${gi * 80}ms` }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400/20 to-cyan-500/10 text-xl">
                  {group.icon}
                </span>
                <h3 className="text-lg font-bold text-white">{group.title}</h3>
              </div>
              <div className="space-y-4">
                {group.skills.map((s) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} animate={animate} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* tech badges */}
        <div ref={marqueeRef} className="mt-14">
          <p className="mb-5 text-center font-mono text-xs tracking-widest text-slate-500 uppercase">
            // Daily drivers
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-sm text-slate-300 transition-all hover:-translate-y-0.5 hover:border-teal-400/50 hover:text-teal-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
