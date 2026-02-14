import { HttpException } from './http-exception';
import { z } from 'zod';
import { isAxiosError } from './types/errors';

const resolveAxiosStatus = (code?: string): number => {
  if (!code) {
    return 500;
  }

  if (code === 'ECONNABORTED' || code === 'ETIMEDOUT') {
    return 408;
  }

  if (
    code === 'ENOTFOUND' ||
    code === 'ECONNREFUSED' ||
    code === 'EHOSTUNREACH' ||
    code === 'ENETUNREACH'
  ) {
    return 503;
  }

  return 500;
};

export function handleChapaError(error: unknown): never {
  if (isAxiosError(error)) {
    if (error.response) {
      throw new HttpException(
        error.response.data?.message || 'An error occurred',
        error.response.status
      );
    }

    throw new HttpException(
      error.message || 'Network error',
      resolveAxiosStatus(error.code)
    );
  }

  if (error instanceof z.ZodError) {
    throw new HttpException(error.issues[0].message, 400);
  }

  throw error;
}
