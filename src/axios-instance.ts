import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

const BASE_URL = 'https://api.chapa.co/v1';
const DEFAULT_TIMEOUT = 30000;
const REDACTED_VALUE = '[REDACTED]';
const SENSITIVE_KEYS = new Set([
  'authorization',
  'secret',
  'secret_key',
  'secretkey',
  'token',
  'api_key',
  'apikey',
  'password',
  'client_secret',
  'access_token',
  'refresh_token',
]);

type RetryConfig = InternalAxiosRequestConfig & { __retryCount?: number };

const sanitizeHeaders = (headers: Record<string, unknown> | undefined) => {
  if (!headers) {
    return headers;
  }
  const sanitized: Record<string, unknown> = {};
  Object.entries(headers).forEach(([key, value]) => {
    const normalizedKey = key.toLowerCase();
    sanitized[key] = SENSITIVE_KEYS.has(normalizedKey) ? REDACTED_VALUE : value;
  });
  return sanitized;
};

const sanitizeData = (value: unknown): unknown => {
  if (value instanceof URLSearchParams) {
    const sanitizedParams = new URLSearchParams();
    value.forEach((paramValue, key) => {
      const normalizedKey = key.toLowerCase();
      sanitizedParams.set(
        key,
        SENSITIVE_KEYS.has(normalizedKey) ? REDACTED_VALUE : paramValue
      );
    });
    return sanitizedParams.toString();
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeData);
  }
  if (value && typeof value === 'object') {
    const sanitized: Record<string, unknown> = {};
    Object.entries(value as Record<string, unknown>).forEach(
      ([key, nestedValue]) => {
        const normalizedKey = key.toLowerCase();
        sanitized[key] = SENSITIVE_KEYS.has(normalizedKey)
          ? REDACTED_VALUE
          : sanitizeData(nestedValue);
      }
    );
    return sanitized;
  }
  return value;
};

export function createAxiosInstance(
  secretKey: string,
  logging = false,
  debug = false,
  retries = 0,
  retryDelay = 1000,
  timeout = DEFAULT_TIMEOUT
): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: timeout,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secretKey}`,
    },
  });

  if (logging || debug) {
    instance.interceptors.request.use(
      (config) => {
        if (debug) {
          console.log('[Chapa Debug] Request Config:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            baseURL: config.baseURL,
            headers: sanitizeHeaders(config.headers as Record<string, unknown>),
            params: config.params,
            data: sanitizeData(config.data),
            timeout: config.timeout,
          });
        } else {
          console.log('[Chapa Request]', {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: sanitizeData(config.data),
          });
        }
        return config;
      },
      (error) => {
        console.error('[Chapa Request Error]', error);
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        if (debug) {
          console.log('[Chapa Debug] Response:', {
            status: response.status,
            statusText: response.statusText,
            headers: sanitizeHeaders(
              response.headers as Record<string, unknown>
            ),
            data: sanitizeData(response.data),
          });
        } else {
          console.log('[Chapa Response]', {
            status: response.status,
            data: sanitizeData(response.data),
          });
        }
        return response;
      },
      (error) => {
        if (debug) {
          console.error('[Chapa Debug] Error:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            statusText: error.response?.statusText,
            headers: sanitizeHeaders(
              error.response?.headers as Record<string, unknown> | undefined
            ),
            data: sanitizeData(error.response?.data),
            config: {
              method: error.config?.method,
              url: error.config?.url,
              baseURL: error.config?.baseURL,
            },
          });
        } else {
          console.error('[Chapa Response Error]', {
            status: error.response?.status,
            data: sanitizeData(error.response?.data),
          });
        }
        return Promise.reject(error);
      }
    );
  }

  if (retries > 0) {
    instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const config = error.config as RetryConfig | undefined;

        if (!config || !config.headers) {
          return Promise.reject(error);
        }

        config.__retryCount = config.__retryCount || 0;

        const shouldRetry =
          config.__retryCount < retries &&
          (!error.response ||
            error.response.status >= 500 ||
            error.code === 'ECONNABORTED');

        if (shouldRetry) {
          config.__retryCount += 1;
          const backoffDelay =
            retryDelay * Math.pow(2, config.__retryCount - 1);
          if (debug) {
            console.log(
              `[Chapa Debug] Retrying request (${config.__retryCount}/${retries}) after ${backoffDelay}ms`
            );
          }
          await new Promise((resolve) => setTimeout(resolve, backoffDelay));
          return instance(config);
        }

        return Promise.reject(error);
      }
    );
  }

  return instance;
}
