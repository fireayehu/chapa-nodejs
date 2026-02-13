import { AxiosError } from 'axios';

export interface ChapaErrorResponse {
  message: string;
  status?: string;
  data?: unknown;
}

export function isAxiosError(
  error: unknown
): error is AxiosError<ChapaErrorResponse> {
  return (error as AxiosError).isAxiosError === true;
}
