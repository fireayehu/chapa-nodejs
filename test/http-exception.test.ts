import { HttpException } from '../src/http-exception';

describe('HttpException', () => {
  it('should create exception with message and status', () => {
    const exception = new HttpException('Test error', 400);

    expect(exception.message).toBe('Test error');
    expect(exception.status).toBe(400);
    expect(exception.name).toBe('HttpException');
  });

  it('should be instance of Error', () => {
    const exception = new HttpException('Test error', 500);

    expect(exception).toBeInstanceOf(Error);
    expect(exception).toBeInstanceOf(HttpException);
  });

  it('should have different status codes', () => {
    const badRequest = new HttpException('Bad request', 400);
    const unauthorized = new HttpException('Unauthorized', 401);
    const serverError = new HttpException('Server error', 500);

    expect(badRequest.status).toBe(400);
    expect(unauthorized.status).toBe(401);
    expect(serverError.status).toBe(500);
  });
});
