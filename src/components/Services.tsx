import SectionHeading from "./SectionHeading";
import { useReveal } from "../hooks/useReveal";
import { useContent } from "../lib/store";

export default function Services() {
  const ref = useReveal();
  const { services } = useContent().content;
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Services"
          title="What I can do for you"
          subtitle="From greenfield builds to rescuing legacy systems — here's how I help teams and founders ship."
        />

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all hover:-translate-y-1 hover:border-teal-400/40 hover:shadow-xl hover:shadow-teal-500/5"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-teal-400/0 blur-2xl transition-all duration-500 group-hover:bg-teal-400/10" />
              <span className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400/20 to-cyan-500/10 text-2xl">
                {s.icon}
              </span>
              <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-teal-300">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
