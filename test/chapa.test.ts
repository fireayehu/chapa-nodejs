import { Chapa } from '../src/chapa';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Chapa', () => {
  let chapa: Chapa;
  const mockAxiosInstance = {
    post: jest.fn(),
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.create = jest.fn().mockReturnValue(mockAxiosInstance);
    chapa = new Chapa({ secretKey: 'test-key' });
  });

  describe('genTxRef', () => {
    it('should generate transaction reference with prefix', async () => {
      const ref = await chapa.genTxRef();
      expect(ref).toMatch(/^TX-[A-Z0-9]{15}$/);
    });

    it('should generate reference without prefix', async () => {
      const ref = await chapa.genTxRef({ removePrefix: true });
      expect(ref).toMatch(/^[A-Z0-9]{15}$/);
      expect(ref).not.toContain('TX-');
    });

    it('should use custom prefix', async () => {
      const ref = await chapa.genTxRef({ prefix: 'CUSTOM' });
      expect(ref).toMatch(/^CUSTOM-[A-Z0-9]{15}$/);
    });

    it('should use custom size', async () => {
      const ref = await chapa.genTxRef({ size: 10, removePrefix: true });
      expect(ref).toHaveLength(10);
    });
  });

  describe('initialize', () => {
    it('should initialize transaction successfully', async () => {
      const mockResponse = {
        data: {
          message: 'Success',
          status: 'success',
          data: { checkout_url: 'https://checkout.chapa.co/123' },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await chapa.initialize({
        currency: 'ETB',
        amount: '100',
        tx_ref: 'TX-123',
      });

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/transaction/initialize',
        expect.any(Object),
        expect.any(Object)
      );
    });

    it('should throw on validation error', async () => {
      await expect(
        chapa.initialize({ currency: 'ETB' } as any)
      ).rejects.toThrow();
    });
  });

  describe('mobileInitialize', () => {
    it('should initialize mobile transaction successfully', async () => {
      const mockResponse = {
        data: {
          message: 'Success',
          status: 'success',
          data: { checkout_url: 'https://checkout.chapa.co/123' },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await chapa.mobileInitialize({
        currency: 'ETB',
        amount: '100',
        tx_ref: 'TX-123',
      });

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('verify', () => {
    it('should verify transaction successfully', async () => {
      const mockResponse = {
        data: {
          message: 'Success',
          status: 'success',
          data: { tx_ref: 'TX-123', status: 'success' },
        },
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await chapa.verify({ tx_ref: 'TX-123' });

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        '/transaction/verify/TX-123',
        expect.any(Object)
      );
    });
  });

  describe('getBanks', () => {
    it('should get banks successfully', async () => {
      const mockResponse = {
        data: {
          message: 'Success',
          data: [{ id: 1, name: 'Test Bank' }],
        },
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await chapa.getBanks();

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        '/banks',
        expect.any(Object)
      );
    });
  });

  describe('getTransactions', () => {
    it('should get all transactions', async () => {
      const mockResponse = {
        data: { message: 'Success', data: { transactions: [] } },
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await chapa.getTransactions();
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getTransactionLogs', () => {
    it('should get transaction logs', async () => {
      const mockResponse = {
        data: { message: 'Success', data: [] },
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await chapa.getTransactionLogs({ ref_id: 'REF-123' });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getTransfers', () => {
    it('should get all transfers', async () => {
      const mockResponse = {
        data: { message: 'Success', data: [] },
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await chapa.getTransfers();
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('verifyTransfer', () => {
    it('should verify transfer', async () => {
      const mockResponse = {
        data: { message: 'Success', data: { status: 'success' } },
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await chapa.verifyTransfer({ tx_ref: 'TX-123' });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('bulkTransfer', () => {
    it('should process bulk transfer', async () => {
      const mockResponse = {
        data: { message: 'Success', status: 'success' },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await chapa.bulkTransfer({
        title: 'Bulk',
        currency: 'ETB',
        bulk_data: [
          {
            account_name: 'John',
            account_number: '123',
            amount: '100',
            reference: 'REF',
            bank_code: 123,
          },
        ],
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('directCharge', () => {
    it('should process direct charge', async () => {
      const mockResponse = {
        data: { message: 'Success', status: 'success' },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await chapa.directCharge({
        mobile: '0911234567',
        currency: 'ETB',
        amount: '100',
        tx_ref: 'TX-123',
        type: 'telebirr',
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('authorizeDirectCharge', () => {
    it('should authorize direct charge', async () => {
      const mockResponse = {
        data: { message: 'Success', trx_ref: 'TRX-123' },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await chapa.authorizeDirectCharge({
        reference: 'REF-123',
        client: 'client-id',
        type: 'telebirr',
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('verifyWebhook', () => {
    it('should verify webhook with valid signature', () => {
      const chapaWithSecret = new Chapa({
        secretKey: 'test-key',
        webhookSecret: 'webhook-secret',
      });

      const payload = { transaction_id: '123' };
      const signature = 'valid-signature';

      const result = chapaWithSecret.verifyWebhook(payload, signature);
      expect(typeof result).toBe('boolean');
    });

    it('should throw error when webhook secret not configured', () => {
      expect(() => chapa.verifyWebhook({}, 'signature')).toThrow(
        'Webhook secret not configured'
      );
    });
  });

  describe('createSubaccount', () => {
    it('should create subaccount successfully', async () => {
      const mockResponse = {
        data: {
          message: 'Success',
          status: 'success',
          data: 'subaccount-id',
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await chapa.createSubaccount({
        business_name: 'Test',
        account_name: 'John',
        bank_code: 123,
        account_number: '1234567890',
        split_type: 'percentage' as any,
        split_value: 0.1,
      });

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('transfer', () => {
    it('should initiate transfer successfully', async () => {
      const mockResponse = {
        data: {
          message: 'Success',
          status: 'success',
          data: 'transfer-id',
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await chapa.transfer({
        account_name: 'John',
        account_number: '1234567890',
        amount: '100',
        currency: 'ETB',
        reference: 'REF-123',
        bank_code: 123,
      });

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('refund', () => {
    it('should process refund successfully', async () => {
      const mockResponse = {
        data: {
          message: 'Success',
          status: 'success',
          data: {},
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await chapa.refund({
        tx_ref: 'TX-123',
        reason: 'Customer request',
      });

      expect(result).toEqual(mockResponse.data);
    });
  });
});
