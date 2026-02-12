import { Chapa } from '../src';

describe('Refund', () => {
  const chapa = new Chapa({ secretKey: 'test-secret-key' });

  it('should validate required tx_ref', async () => {
    await expect(
      chapa.refund({ tx_ref: '' } as any)
    ).rejects.toThrow();
  });

  it('should accept valid refund options', async () => {
    const options = {
      tx_ref: 'TX-TEST123',
      reason: 'accidental purchase',
      amount: '1000',
      meta: {
        customer_id: '123',
        reference: 'REF123',
      },
    };

    await expect(
      chapa.refund(options)
    ).rejects.toThrow();
  });

  it('should accept refund without optional fields', async () => {
    const options = {
      tx_ref: 'TX-TEST123',
    };

    await expect(
      chapa.refund(options)
    ).rejects.toThrow();
  });
});
