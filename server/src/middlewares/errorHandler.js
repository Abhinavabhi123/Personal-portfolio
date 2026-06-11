/**
 * Centralized error handling middleware
 */

export function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  console.error(`[${statusCode}] ${message}`, err.details || '');

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { details: err.details }),
  });
}

export class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.statusCode = 400;
    this.details = details;
    this.name = 'ValidationError';
  }
}

export class AuthError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.statusCode = 401;
    this.name = 'AuthError';
  }
}

export class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.statusCode = 404;
    this.name = 'NotFoundError';
  }
}
