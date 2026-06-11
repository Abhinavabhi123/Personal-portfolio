import { ValidationError } from '../middlewares/errorHandler.js';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

/**
 * Validate project input data
 * @param {unknown} data - Project data to validate
 * @returns {Object} Validated project input
 */
export function validateProjectInput(data) {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Project data is required');
  }

  const project = data;

  if (!project.title || typeof project.title !== 'string' || project.title.trim().length === 0) {
    throw new ValidationError('Project title is required and must be a non-empty string');
  }

  if (!project.links || typeof project.links !== 'object') {
    throw new ValidationError('Project links are required');
  }

  // Image validation if present
  if (project.image) {
    validateImage(project.image);
  }

  return {
    title: String(project.title).slice(0, 200),
    description: String(project.description ?? '').slice(0, 2000),
    tags: Array.isArray(project.tags) ? project.tags.map(String).filter(Boolean).slice(0, 20) : [],
    gradient: String(project.gradient ?? '').slice(0, 500),
    emoji: String(project.emoji ?? '🚀').slice(0, 10),
    image: project.image ? validateImage(project.image) : undefined,
    category: String(project.category ?? '').slice(0, 100),
    featured: Boolean(project.featured),
    links: {
      demo: String((project.links?.demo) ?? '#').slice(0, 500),
      code: String((project.links?.code) ?? '#').slice(0, 500),
    },
  };
}

/**
 * Validate image data
 * @param {unknown} image - Image data (Base64 or URL)
 * @returns {string} Validated image string
 */
function validateImage(image) {
  if (typeof image !== 'string') {
    throw new ValidationError('Image must be a valid data URL or string');
  }

  // If it's a Base64 data URL
  if (image.startsWith('data:')) {
    const sizeInBytes = Buffer.byteLength(image, 'utf8');
    if (sizeInBytes > MAX_IMAGE_SIZE) {
      throw new ValidationError(`Image size exceeds maximum allowed size of ${MAX_IMAGE_SIZE / 1024 / 1024}MB`, {
        maxSize: MAX_IMAGE_SIZE,
        actualSize: sizeInBytes,
      });
    }

    // Validate MIME type in data URL
    const mimeMatch = image.match(/^data:([^;]+)/);
    if (mimeMatch && !ALLOWED_IMAGE_TYPES.includes(mimeMatch[1])) {
      throw new ValidationError('Invalid image type. Allowed types: JPEG, PNG, GIF, WEBP', {
        providedType: mimeMatch[1],
        allowedTypes: ALLOWED_IMAGE_TYPES,
      });
    }

    return image;
  }

  // If it's a URL
  if (image.startsWith('http://') || image.startsWith('https://')) {
    if (image.length > 2000) {
      throw new ValidationError('Image URL is too long (max 2000 characters)');
    }
    return image;
  }

  throw new ValidationError('Image must be a valid data URL or HTTP(S) URL');
}
