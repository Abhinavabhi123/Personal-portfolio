
import { ContentModel } from '../entities/Content.js';

/**
 * Repository layer for project-related database operations.
 * Handles all database interactions for projects.
 */
export class ProjectRepository {
  /**
   * Get all projects from the content document
   * @returns {Promise<Array>} Array of projects
   */
  async getAll() {
    const doc = await ContentModel.findOne().lean().select('projects');
    return doc?.projects ?? [];
  }

  /**
   * Get a single project by index
   * @param {number} index - Project index
   * @returns {Promise<Object|null>} Project or null
   */
  async getByIndex(index) {
    const doc = await ContentModel.findOne().lean().select('projects');
    if (!doc || !doc.projects || index < 0 || index >= doc.projects.length) {
      return null;
    }
    return doc.projects[index];
  }

  /**
   * Update a project at a specific index
   * @param {number} index - Project index
   * @param {Object} project - Updated project data
   * @returns {Promise<Object|null>} Updated project or null
   */
  async updateByIndex(index, project) {
    const projects = await this.getAll();
    if (index < 0 || index >= projects.length) {
      return null;
    }

    projects[index] = project;
    const updated = await ContentModel.findOneAndUpdate({}, { projects }, { new: true, lean: true });
    return updated?.projects?.[index] ?? null;
  }

  /**
   * Add a new project
   * @param {Object} project - New project data
   * @returns {Promise<Object>} Created project
   */
  async create(project) {
    const projects = await this.getAll();
    projects.push(project);
    await ContentModel.findOneAndUpdate({}, { projects }, { upsert: true });
    return project;
  }

  /**
   * Remove a project by index
   * @param {number} index - Project index
   * @returns {Promise<boolean>} True if deleted, false otherwise
   */
  async deleteByIndex(index) {
    const projects = await this.getAll();
    if (index < 0 || index >= projects.length) {
      return false;
    }
    projects.splice(index, 1);
    await ContentModel.findOneAndUpdate({}, { projects }, { new: true });
    return true;
  }

  /**
   * Update project image (handles deletion too)
   * @param {number} index - Project index
   * @param {string|undefined} image - New image data
   * @returns {Promise<boolean>} True if updated, false otherwise
   */
  async updateImage(index, image) {
    const project = await this.getByIndex(index);
    if (!project) return false;

    project.image = image;
    const updated = await this.updateByIndex(index, project);
    return !!updated;
  }

  /**
   * Replace all projects
   * @param {Array} projects - New projects array
   * @returns {Promise<void>}
   */
  async replaceAll(projects) {
    await ContentModel.findOneAndUpdate({}, { projects }, { upsert: true });
  }
}

export const projectRepository = new ProjectRepository();
