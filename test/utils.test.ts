import { withErrorHandling } from '../src/utils';
import { HttpException } from '../src/http-exception';

describe('withErrorHandling', () => {
  it('should return result on success', async () => {
    const result = await withErrorHandling(async () => {
      return 'success';
    });

    expect(result).toBe('success');
  });

  it('should handle errors', async () => {
    await expect(
      withErrorHandling(async () => {
        throw new Error('Test error');
      })
    ).rejects.toThrow('Test error');
  });

  it('should handle HttpException', async () => {
    await expect(
      withErrorHandling(async () => {
        throw new HttpException('Bad request', 400);
      })
    ).rejects.toThrow(HttpException);
  });
});
