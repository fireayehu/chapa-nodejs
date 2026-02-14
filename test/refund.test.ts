import axios from 'axios';
import { Chapa } from '../src';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
  },
}));

describe('Refund', () => {
  const mockPost = jest.fn();
  let chapa: Chapa;

  beforeEach(() => {
    mockPost.mockReset();
    (axios.create as jest.Mock).mockReturnValue({ post: mockPost });
    chapa = new Chapa({ secretKey: 'test-secret-key' });
  });

  it('should validate required tx_ref', async () => {
    await expect(
      chapa.refund({} as any)
    ).rejects.toThrow();
    expect(mockPost).not.toHaveBeenCalled();
  });

  it('should accept valid refund options and send form body', async () => {
    const options = {
      tx_ref: 'TX-TEST123',
      reason: 'accidental purchase',
      amount: '1000',
      meta: {
        customer_id: '123',
        reference: 'REF123',
      },
    };
    const responseData = {
      message: 'ok',
      status: 'success',
      data: { id: 'refund-1' },
    };
    mockPost.mockResolvedValue({ data: responseData });

    const response = await chapa.refund(options);

    expect(response).toEqual(responseData);
    expect(mockPost).toHaveBeenCalledTimes(1);
    const [url, body, config] = mockPost.mock.calls[0];
    const expectedBody = new URLSearchParams();
    expectedBody.set('reason', options.reason);
    expectedBody.set('amount', options.amount);
    expectedBody.set('meta', JSON.stringify(options.meta));

    expect(url).toBe('/refund/TX-TEST123');
    expect(body).toBeInstanceOf(URLSearchParams);
    expect(body.toString()).toBe(expectedBody.toString());
    expect(config?.headers?.['Content-Type']).toBe(
      'application/x-www-form-urlencoded'
    );
  });

  it('should accept refund without optional fields', async () => {
    const options = {
      tx_ref: 'TX-TEST123',
    };

    const responseData = {
      message: 'ok',
      status: 'success',
      data: { id: 'refund-2' },
    };
    mockPost.mockResolvedValue({ data: responseData });

    const response = await chapa.refund(options);

    expect(response).toEqual(responseData);
    expect(mockPost).toHaveBeenCalledTimes(1);
    const [, body] = mockPost.mock.calls[0];
    expect(body).toBeInstanceOf(URLSearchParams);
    expect(body.toString()).toBe('');
  });
});
