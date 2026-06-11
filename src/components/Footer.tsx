import { useContent } from "../lib/store";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const { profile } = useContent().content;
  return (
    <footer className="border-t border-white/5 bg-[#060a14]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <a
            href="#home"
            className="flex items-center gap-2 font-mono text-lg font-bold text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-cyan-600 text-sm text-[#070b16]">
              {"</>"}
            </span>
            <span>
              abhinav<span className="text-teal-400">.dev</span>
            </span>
          </a>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-slate-400 transition-colors hover:text-teal-300"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {Object.entries(profile.socials).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={key}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-xs font-bold text-slate-400 uppercase transition-colors hover:border-teal-400/50 hover:text-teal-300"
              >
                {key.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-center sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          {/* <p className="font-mono text-xs text-slate-600">
            Built with <span className="text-teal-400">React</span> + <span className="text-cyan-400">Express.js</span> · Powered by ☕ ·{" "}
            <a href="#/admin" className="text-slate-500 underline decoration-dotted underline-offset-2 transition-colors hover:text-teal-300">
              Admin
            </a>
          </p> */}
        </div>
      </div>
    </footer>
  );
}
