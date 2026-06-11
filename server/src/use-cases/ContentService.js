import { ContentModel, SessionModel, MessageModel } from '../entities/Content.js';
import { projectRepository } from '../repositories/ProjectRepository.js';
import { validateProjectInput } from '../validations/projectValidator.js';
import { randomUUID } from 'crypto';

/* ------------------------------ content ------------------------------ */

/**
 * Get all content
 * @returns {Promise<Object|null>} Content data or null
 */
export async function getContent() {
  const doc = await ContentModel.findOne().lean().select('-__v -createdAt -updatedAt');
  if (!doc) return null;
  return doc;
}

/**
 * Save all content
 * @param {Object} data - Content data to save
 * @returns {Promise<Object>} Saved content
 */
export async function saveContent(data) {
  const doc = await ContentModel.findOneAndUpdate({}, data, {
    upsert: true,
    new: true,
    lean: true,
  });
  return doc;
}

/* ------------------------------ project services ------------------------------ */

/**
 * Get all projects
 * @returns {Promise<Array>} Array of projects
 */
export async function getProjects() {
  return projectRepository.getAll();
}

/**
 * Create a new project
 * @param {unknown} input - Project input data
 * @returns {Promise<Object>} Created project
 */
export async function createProject(input) {
  const validatedProject = validateProjectInput(input);
  return projectRepository.create(validatedProject);
}

/**
 * Update a project by index
 * @param {number} index - Project index
 * @param {unknown} input - Updated project data
 * @returns {Promise<Object|null>} Updated project or null
 */
export async function updateProject(index, input) {
  const validatedProject = validateProjectInput(input);
  return projectRepository.updateByIndex(index, validatedProject);
}

/**
 * Delete a project by index
 * @param {number} index - Project index
 * @returns {Promise<boolean>} True if deleted, false otherwise
 */
export async function deleteProject(index) {
  return projectRepository.deleteByIndex(index);
}

/**
 * Update project image specifically
 * @param {number} index - Project index
 * @param {string|undefined} image - New image data
 * @returns {Promise<boolean>} True if updated, false otherwise
 */
export async function updateProjectImage(index, image) {
  return projectRepository.updateImage(index, image);
}

/* ------------------------------ auth ------------------------------ */

/**
 * Create a new session
 * @param {string} username - Admin username
 * @returns {Promise<string>} Auth token
 */
export async function createSession(username) {
  const token = randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 12); // 12h
  await SessionModel.create({ token, expires });
  return token;
}

/**
 * Validate a session token
 * @param {string} token - Auth token
 * @returns {Promise<boolean>} True if valid, false otherwise
 */
export async function validateSession(token) {
  const session = await SessionModel.findOne({ token }).lean();
  return !!session && new Date(session.expires) > new Date();
}

/**
 * Revoke all sessions (optional)
 * @returns {Promise<void>}
 */
export async function revokeSessions() {
  // optional: revoke all on password change
}

/* ------------------------------ messages ------------------------------ */

/**
 * Create a new contact message
 * @param {Object} input - Message input
 * @param {string} input.name - Sender name
 * @param {string} input.email - Sender email
 * @param {string} input.subject - Message subject
 * @param {string} input.message - Message body
 * @returns {Promise<string>} Message ID
 */
export async function createMessage(input) {
  const doc = await MessageModel.create(input);
  return doc._id.toString();
}

/**
 * Get all contact messages
 * @returns {Promise<Array>} Array of messages
 */
export async function getMessages() {
  const msgs = await MessageModel.find().sort({ createdAt: -1 }).lean();
  return msgs.map((m) => ({
    id: m._id?.toString() ?? '',
    name: m.name,
    email: m.email,
    subject: m.subject ?? '',
    message: m.message,
    read: m.read,
    createdAt: m.createdAt?.toISOString() ?? '',
  }));
}

/**
 * Mark a message as read/unread
 * @param {string} id - Message ID
 * @param {boolean} read - Read status
 * @returns {Promise<boolean>} True if updated, false otherwise
 */
export async function setRead(id, read) {
  const result = await MessageModel.updateOne({ _id: id }, { read });
  return result.modifiedCount > 0;
}

/**
 * Delete a message
 * @param {string} id - Message ID
 * @returns {Promise<boolean>} True if deleted, false otherwise
 */
export async function deleteMessage(id) {
  const result = await MessageModel.deleteOne({ _id: id });
  return result.deletedCount > 0;
}
