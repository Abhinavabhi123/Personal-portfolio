import { useEffect, useState } from "react";
import { ContentProvider } from "./lib/store";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Services from "./components/Services";
// import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminApp from "./admin/AdminApp";

/**
 * Routing — the admin dashboard is reachable via BOTH:
 *  - path:  "/admin"   (e.g. https://yoursite.com/admin)
 *  - hash:  "#/admin"  (works even on static hosts without SPA fallback)
 * Everything else (e.g. "#about") -> public portfolio with anchor scrolling.
 */
function isAdminLocation() {
  const path = window.location.pathname.replace(/\/+$/, "").toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return path.endsWith("/admin") || hash.startsWith("#/admin") || hash.startsWith("#admin");
}

function useIsAdminRoute() {
  const [isAdmin, setIsAdmin] = useState(isAdminLocation());
  useEffect(() => {
    const onChange = () => setIsAdmin(isAdminLocation());
    window.addEventListener("hashchange", onChange);
    window.addEventListener("popstate", onChange);
    return () => {
      window.removeEventListener("hashchange", onChange);
      window.removeEventListener("popstate", onChange);
    };
  }, []);
  return isAdmin;
}

function PublicSite() {
  return (
    <div className="min-h-screen bg-[#070b16] text-slate-200 antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        {/* <Testimonials /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const isAdmin = useIsAdminRoute();

  return (
    <ContentProvider>
      {isAdmin ? <AdminApp /> : <PublicSite />}
    </ContentProvider>
  );
}
