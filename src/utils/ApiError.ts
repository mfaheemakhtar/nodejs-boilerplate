type ApiErrorParams = {
  error?: Record<string, any>;
  isOperational?: boolean;
  meta?: Record<string, any>;
  stack?: string;
};

class ApiError extends Error {
  private error;
  private isOperational;
  private meta;
  private statusCode;

  constructor(statusCode: number, message: string, params: ApiErrorParams = {}) {
    super(message);

    const { error, meta, isOperational = true, stack = '' } = params;

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (error) {
      this.error = error;
    }

    if (meta) {
      this.meta = meta;
    }

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
