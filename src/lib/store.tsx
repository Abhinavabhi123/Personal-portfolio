import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  profile as defaultProfile,
  skillGroups as defaultSkillGroups,
  techStack as defaultTechStack,
  experiences as defaultExperiences,
  projects as defaultProjects,
  services as defaultServices,
  testimonials as defaultTestimonials,
  education as defaultEducation,
  certifications as defaultCertifications,
} from "../data/portfolio";

/* ----------------------------------- types ----------------------------------- */

export type ContentData = {
  profile: typeof defaultProfile;
  skillGroups: typeof defaultSkillGroups;
  techStack: typeof defaultTechStack;
  experiences: typeof defaultExperiences;
  projects: typeof defaultProjects;
  services: typeof defaultServices;
  testimonials: typeof defaultTestimonials;
  education: typeof defaultEducation;
  certifications: typeof defaultCertifications;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export const defaultContent: ContentData = {
  profile: defaultProfile,
  skillGroups: defaultSkillGroups,
  techStack: defaultTechStack,
  experiences: defaultExperiences,
  projects: defaultProjects,
  services: defaultServices,
  testimonials: defaultTestimonials,
  education: defaultEducation,
  certifications: defaultCertifications,
};

/* ------------------------------ api + persistence ------------------------------ */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
const LS_CONTENT = "portfolio_content_v1";
const LS_MESSAGES = "portfolio_messages_v1";
const LS_TOKEN = "portfolio_admin_token";

let apiOnline: boolean | null = null;

async function apiFetch(
  path: string,
  options: RequestInit = {},
  timeoutMs = 2500,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      signal: controller.signal,
    });
    apiOnline = true;
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export async function checkApi(): Promise<boolean> {
  try {
    const res = await apiFetch("/api/health", {}, 1500);
    apiOnline = res.ok;
  } catch {
    apiOnline = false;
  }
  return apiOnline;
}

export function isApiOnline() {
  return apiOnline === true;
}

function getToken() {
  return localStorage.getItem(LS_TOKEN);
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* ----------------------------------- auth ----------------------------------- */

export async function adminLogin(
  username: string,
  password: string,
): Promise<boolean> {
  // Try the Express backend first
  try {
    const res = await apiFetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem(LS_TOKEN, data.token);
      return true;
    }
    if (res.status === 401) return false;
  } catch {
    /* backend offline — fall back to demo credentials */
  }
  if (username === "admin" && password === "admin123") {
    localStorage.setItem(LS_TOKEN, `local-${Date.now()}`);
    return true;
  }
  return false;
}

export function adminLogout() {
  localStorage.removeItem(LS_TOKEN);
}

export function isAuthed() {
  return Boolean(getToken());
}

/* --------------------------------- messages --------------------------------- */

function localMessages(): ContactMessage[] {
  try {
    return JSON.parse(localStorage.getItem(LS_MESSAGES) || "[]");
  } catch {
    return [];
  }
}

function saveLocalMessages(msgs: ContactMessage[]) {
  localStorage.setItem(LS_MESSAGES, JSON.stringify(msgs));
}

export async function submitMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const res = await apiFetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    console.log(res, "res");
    if (res.ok) {
      return res;
    }
  } catch {
    /* offline */
  }
  const msg: ContactMessage = {
    id: crypto.randomUUID(),
    ...input,
    read: false,
    createdAt: new Date().toISOString(),
  };
  saveLocalMessages([msg, ...localMessages()]);
}

export async function fetchMessages(): Promise<ContactMessage[]> {
  try {
    const res = await apiFetch("/api/messages", { headers: authHeaders() });
    if (res.ok) {
      const data = await res.json();
      return data.messages as ContactMessage[];
    }
  } catch {
    /* offline */
  }
  return localMessages();
}

export async function setMessageRead(id: string, read: boolean): Promise<void> {
  try {
    const res = await apiFetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ read }),
    });
    if (res.ok) return;
  } catch {
    /* offline */
  }
  saveLocalMessages(
    localMessages().map((m) => (m.id === id ? { ...m, read } : m)),
  );
}

export async function deleteMessage(id: string): Promise<void> {
  try {
    const res = await apiFetch(`/api/messages/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (res.ok) return;
  } catch {
    /* offline */
  }
  saveLocalMessages(localMessages().filter((m) => m.id !== id));
}

/* ------------------------------- content context ------------------------------- */

type ContentContextValue = {
  content: ContentData;
  saveContent: (next: ContentData) => Promise<void>;
  resetContent: () => Promise<void>;
  backendOnline: boolean | null;
};

const ContentContext = createContext<ContentContextValue>({
  content: defaultContent,
  saveContent: async () => {},
  resetContent: async () => {},
  backendOnline: null,
});

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentData>(() => {
    try {
      const cached = localStorage.getItem(LS_CONTENT);
      if (cached) return { ...defaultContent, ...JSON.parse(cached) };
    } catch {
      /* ignore */
    }
    return defaultContent;
  });
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const online = await checkApi();
      if (cancelled) return;
      setBackendOnline(online);
      if (online) {
        try {
          const res = await apiFetch("/api/content");
          if (res.ok) {
            const data = await res.json();
            if (!cancelled && data.content) {
              setContent({ ...defaultContent, ...data.content });
              localStorage.setItem(LS_CONTENT, JSON.stringify(data.content));
            }
          }
        } catch {
          /* ignore */
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const saveContent = useCallback(async (next: ContentData) => {
    setContent(next);
    localStorage.setItem(LS_CONTENT, JSON.stringify(next));
    try {
      await apiFetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(next),
      });
    } catch {
      /* backend offline — localStorage already updated */
    }
  }, []);

  const resetContent = useCallback(async () => {
    setContent(defaultContent);
    localStorage.removeItem(LS_CONTENT);
    try {
      await apiFetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(defaultContent),
      });
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ content, saveContent, resetContent, backendOnline }),
    [content, saveContent, resetContent, backendOnline],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
