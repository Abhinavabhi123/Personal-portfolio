import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();
import {
  getContent,
  saveContent,
  validateSession,
  createMessage,
  getMessages,
  setRead,
  deleteMessage,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  updateProjectImage,
} from "../use-cases/ContentService.js";
import {
  errorHandler,
  ValidationError,
  AuthError,
  NotFoundError,
} from "../middlewares/errorHandler.js";
import { sendContactMail } from "../services/email.service.js";

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "admin123";

/**
 * Authentication middleware
 */
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });
  validateSession(token)
    .then((valid) =>
      valid ? next() : res.status(401).json({ error: "Invalid token" }),
    )
    .catch(() => res.status(401).json({ error: "Invalid token" }));
}

export const apiRouter = Router();

/* ------------------------------ health ------------------------------ */

apiRouter.get("/health", (_req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

/* ------------------------------ auth ------------------------------ */

apiRouter.post("/auth/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const { createSession } = await import("../use-cases/ContentService.js");
  const token = await createSession(username);
  res.json({ token, username });
});

/* ------------------------------ content ------------------------------ */

apiRouter.get("/content", async (_req, res) => {
  const content = await getContent();
  res.json({ content });
});

apiRouter.put("/content", requireAuth, async (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const saved = await saveContent(req.body);
  res.json({ ok: true, content: saved });
});

/* ------------------------------ projects ------------------------------ */

apiRouter.get("/projects", async (_req, res) => {
  const projects = await getProjects();
  res.json({ projects });
});

apiRouter.post("/projects", requireAuth, async (req, res, next) => {
  try {
    const project = await createProject(req.body);
    res.status(201).json({ ok: true, project });
  } catch (err) {
    next(err);
  }
});

apiRouter.patch("/projects/:index", requireAuth, async (req, res, next) => {
  try {
    const index = parseInt(req.params.index, 10);
    if (isNaN(index)) throw new ValidationError("Invalid project index");
    const project = await updateProject(index, req.body);
    if (!project) throw new NotFoundError("Project not found");
    res.json({ ok: true, project });
  } catch (err) {
    next(err);
  }
});

apiRouter.delete("/projects/:index", requireAuth, async (req, res, next) => {
  try {
    const index = parseInt(req.params.index, 10);
    if (isNaN(index)) throw new ValidationError("Invalid project index");
    const ok = await deleteProject(index);
    if (!ok) throw new NotFoundError("Project not found");
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

apiRouter.patch(
  "/projects/:index/image",
  requireAuth,
  async (req, res, next) => {
    try {
      const index = parseInt(req.params.index, 10);
      if (isNaN(index)) throw new ValidationError("Invalid project index");
      const { image } = req.body || {};
      const ok = await updateProjectImage(index, image);
      if (!ok) throw new NotFoundError("Project not found");
      res.json({ ok: true });
    } catch (err) {
      next(err);
    }
  },
);

/* ------------------------------ messages ------------------------------ */

apiRouter.post("/messages", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "name, email and message are required" });
    }
    const id = await createMessage({ name, email, subject, message });

    
    res.status(201).json({ ok: true, id });
   try {
      await sendContactMail({
        name,
        email,
        subject,
        message,
      });
    } catch (err) {
      console.error("Email failed:", err);
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
  }
});

apiRouter.get("/messages", requireAuth, async (_req, res) => {
  const messages = await getMessages();
  res.json({ messages });
});

apiRouter.patch("/messages/:id", requireAuth, async (req, res) => {
  const { read } = req.body || {};
  const ok = await setRead(req.params.id, !!read);
  res.json(ok ? { ok: true } : { error: "Not found" });
});

apiRouter.delete("/messages/:id", requireAuth, async (req, res) => {
  const ok = await deleteMessage(req.params.id);
  res.json(ok ? { ok: true } : { error: "Not found" });
});

/* ------------------------------ error handler ------------------------------ */

apiRouter.use(errorHandler);
