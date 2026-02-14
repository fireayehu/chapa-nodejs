import * as CryptoJS from 'crypto-js';
import { verifyWebhookSignature } from '../src/webhook';

describe('verifyWebhookSignature', () => {
  const secret = 'test-secret';
  const payload = { transaction_id: '123', amount: 100 };
  const payloadString = JSON.stringify(payload);
  const signature = CryptoJS.HmacSHA256(payloadString, secret).toString(
    CryptoJS.enc.Hex
  );

  it('should verify valid signature with object payload', () => {
    const result = verifyWebhookSignature(payload, signature, secret);
    expect(result).toBe(true);
  });

  it('should verify valid signature with string payload', () => {
    const result = verifyWebhookSignature(payloadString, signature, secret);
    expect(result).toBe(true);
  });

  it('should return false for tampered payload', () => {
    const tamperedPayload = { ...payload, amount: 200 };
    const result = verifyWebhookSignature(tamperedPayload, signature, secret);
    expect(result).toBe(false);
  });

  it('should return false for wrong secret', () => {
    const wrongSignature = CryptoJS.HmacSHA256(payloadString, 'wrong-secret').toString(
      CryptoJS.enc.Hex
    );
    const result = verifyWebhookSignature(payload, wrongSignature, secret);
    expect(result).toBe(false);
  });
});
