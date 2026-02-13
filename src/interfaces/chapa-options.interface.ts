export interface ChapaOptions {
  secretKey: string;
  webhookSecret?: string;
  logging?: boolean;
  debug?: boolean;
  retries?: number;
  retryDelay?: number;
  timeout?: number;
}
