import * as CryptoJS from 'crypto-js';

export interface WebhookPayload {
  [key: string]: unknown;
}

const constantTimeEquals = (left: string, right: string): boolean => {
  const leftLength = left.length;
  const rightLength = right.length;
  const maxLength = Math.max(leftLength, rightLength);
  let result = leftLength ^ rightLength;

  for (let index = 0; index < maxLength; index += 1) {
    const leftChar = left.charCodeAt(index) || 0;
    const rightChar = right.charCodeAt(index) || 0;
    result |= leftChar ^ rightChar;
  }

  return result === 0;
};

export function verifyWebhookSignature(
  payload: WebhookPayload | string,
  signature: string,
  secret: string
): boolean {
  const payloadString =
    typeof payload === 'string' ? payload : JSON.stringify(payload);
  const hash = CryptoJS.HmacSHA256(payloadString, secret).toString(
    CryptoJS.enc.Hex
  );
  return constantTimeEquals(hash, signature);
}
