import { handleChapaError } from '../src/error-handler';
import { HttpException } from '../src/http-exception';
import { z } from 'zod';
import { AxiosError } from 'axios';

describe('handleChapaError', () => {
  it('should handle axios error with response', () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        status: 400,
        data: { message: 'Bad request' },
      },
    } as AxiosError;

    expect(() => handleChapaError(axiosError)).toThrow(HttpException);
    expect(() => handleChapaError(axiosError)).toThrow('Bad request');
  });

  it('should handle axios error without message', () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        status: 500,
        data: {},
      },
    } as AxiosError;

    expect(() => handleChapaError(axiosError)).toThrow('An error occurred');
  });

  it('should handle axios error without response', () => {
    const axiosError = {
      isAxiosError: true,
      message: 'Network Error',
      code: 'ECONNREFUSED',
    } as AxiosError;

    expect(() => handleChapaError(axiosError)).toThrow(HttpException);
    expect(() => handleChapaError(axiosError)).toThrow('Network Error');
  });

  it('should handle zod validation error', () => {
    const schema = z.object({ email: z.string().email() });
    
    try {
      schema.parse({ email: 'invalid' });
    } catch (error) {
      expect(() => handleChapaError(error)).toThrow(HttpException);
    }
  });

  it('should rethrow unknown errors', () => {
    const error = new Error('Unknown error');
    expect(() => handleChapaError(error)).toThrow('Unknown error');
  });
});
