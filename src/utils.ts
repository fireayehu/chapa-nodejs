import { handleChapaError } from './error-handler';

export async function withErrorHandling<T>(
  operation: () => Promise<T>
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    handleChapaError(error);
  }
}
