import { ContentProvider, useContent } from "./lib/store";
import AdminApp from "./admin/AdminApp";
import HomePage from "./HomePage";
import FullPageLoader from "./components/FullPageLoader";
import { useEffect, useState } from "react";

function isAdminLocation() {
  const path = window.location.pathname.replace(/\/+$/, "").toLowerCase();
  const hash = window.location.hash.toLowerCase();

  return (
    path.endsWith("/admin") ||
    hash.startsWith("#/admin") ||
    hash.startsWith("#admin")
  );
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

function AppContent() {
  const { loading } = useContent();
  const isAdmin = useIsAdminRoute();

  if (loading) {
    return <FullPageLoader />;
  }

  return isAdmin ? <AdminApp /> : <HomePage />;
}

export default function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}
