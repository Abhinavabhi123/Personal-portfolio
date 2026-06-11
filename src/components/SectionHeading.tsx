import { useReveal } from "../hooks/useReveal";

type Props = {
  kicker: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ kicker, title, subtitle }: Props) {
  const ref = useReveal();
  return (
    <div ref={ref} className="mx-auto mb-14 max-w-2xl text-center">
      <span className="mb-3 inline-block rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1 font-mono text-xs tracking-widest text-teal-300 uppercase">
        {kicker}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-slate-400">{subtitle}</p>}
    </div>
  );
}
