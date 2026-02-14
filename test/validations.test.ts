import {
  validateInitializeOptions,
  validateVerifyOptions,
} from '../src/validations/payment.validation';
import { validateCreateSubaccountOptions } from '../src/validations/create-subaccount.validation';
import { validateDirectChargeOptions } from '../src/validations/direct-charge.validation';
import { validateTransferOptions } from '../src/validations/transfer.validation';
import { validateRefundOptions } from '../src/validations/refund.validation';
import { SplitType } from '../src/enums';
import { z } from 'zod';

describe('Payment Validation', () => {
  describe('validateInitializeOptions', () => {
    it('should validate valid options', () => {
      const options = {
        currency: 'ETB',
        amount: '100',
        tx_ref: 'TX-123',
      };
      expect(() => validateInitializeOptions(options)).not.toThrow();
    });

    it('should validate with optional fields', () => {
      const options = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone_number: '0911234567',
        currency: 'ETB',
        amount: '100',
        tx_ref: 'TX-123',
        callback_url: 'https://example.com/callback',
      };
      expect(() => validateInitializeOptions(options)).not.toThrow();
    });

    it('should throw on invalid email', () => {
      const options = {
        email: 'invalid-email',
        currency: 'ETB',
        amount: '100',
        tx_ref: 'TX-123',
      };
      expect(() => validateInitializeOptions(options)).toThrow(z.ZodError);
    });

    it('should throw on invalid phone number', () => {
      const options = {
        phone_number: '123',
        currency: 'ETB',
        amount: '100',
        tx_ref: 'TX-123',
      };
      expect(() => validateInitializeOptions(options)).toThrow(z.ZodError);
    });

    it('should throw on missing required fields', () => {
      const options = { currency: 'ETB' };
      expect(() => validateInitializeOptions(options as any)).toThrow(z.ZodError);
    });
  });

  describe('validateVerifyOptions', () => {
    it('should validate valid options', () => {
      const options = { tx_ref: 'TX-123' };
      expect(() => validateVerifyOptions(options)).not.toThrow();
    });

    it('should throw on missing tx_ref', () => {
      expect(() => validateVerifyOptions({} as any)).toThrow(z.ZodError);
    });
  });
});

describe('Subaccount Validation', () => {
  it('should validate valid subaccount options', () => {
    const options = {
      business_name: 'Test Business',
      account_name: 'John Doe',
      bank_code: 123,
      account_number: '1234567890',
      split_type: SplitType.PERCENTAGE,
      split_value: 0.1,
    };
    expect(() => validateCreateSubaccountOptions(options)).not.toThrow();
  });

  it('should throw on invalid split type', () => {
    const options = {
      business_name: 'Test Business',
      account_name: 'John Doe',
      bank_code: 123,
      account_number: '1234567890',
      split_type: 'invalid' as any,
      split_value: 0.1,
    };
    expect(() => validateCreateSubaccountOptions(options)).toThrow(z.ZodError);
  });
});

describe('Direct Charge Validation', () => {
  it('should validate valid direct charge options', () => {
    const options = {
      mobile: '0911234567',
      currency: 'ETB',
      amount: '100',
      tx_ref: 'TX-123',
      type: 'telebirr',
    };
    expect(() => validateDirectChargeOptions(options)).not.toThrow();
  });

  it('should throw on invalid mobile number', () => {
    const options = {
      mobile: '123',
      currency: 'ETB',
      amount: '100',
      tx_ref: 'TX-123',
      type: 'telebirr',
    };
    expect(() => validateDirectChargeOptions(options)).toThrow(z.ZodError);
  });
});

describe('Transfer Validation', () => {
  it('should validate valid transfer options', () => {
    const options = {
      account_name: 'John Doe',
      account_number: '1234567890',
      amount: '100',
      currency: 'ETB',
      reference: 'REF-123',
      bank_code: 123,
    };
    expect(() => validateTransferOptions(options)).not.toThrow();
  });

  it('should throw on missing required fields', () => {
    const options = { account_name: 'John Doe' };
    expect(() => validateTransferOptions(options as any)).toThrow(z.ZodError);
  });
});

describe('Refund Validation', () => {
  it('should validate valid refund options', () => {
    const options = {
      tx_ref: 'TX-123',
      reason: 'Customer request',
      amount: '100',
    };
    expect(() => validateRefundOptions(options)).not.toThrow();
  });

  it('should validate with only tx_ref', () => {
    const options = { tx_ref: 'TX-123' };
    expect(() => validateRefundOptions(options)).not.toThrow();
  });

  it('should throw on missing tx_ref', () => {
    expect(() => validateRefundOptions({} as any)).toThrow(z.ZodError);
  });
});
