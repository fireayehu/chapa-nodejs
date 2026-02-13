import { AxiosInstance } from 'axios';
import { customAlphabet } from 'nanoid';
import { alphanumeric } from 'nanoid-dictionary';
import { createAxiosInstance } from './axios-instance';
import { ChapaUrls } from './enums';
import { withErrorHandling } from './utils';
import { verifyWebhookSignature, WebhookPayload } from './webhook';
import {
  AuthorizeDirectChargeOptions,
  AuthorizeDirectChargeResponse,
  BulkTransferOptions,
  BulkTransferResponse,
  ChapaOptions,
  CreateSubaccountOptions,
  CreateSubaccountResponse,
  DirectChargeOptions,
  DirectChargeResponse,
  GenTxRefOptions,
  GetBanksResponse,
  GetTransactionLogsOptions,
  GetTransactionLogsResponse,
  GetTransactionsResponse,
  GetTransfersResponse,
  InitializeOptions,
  InitializeResponse,
  RefundOptions,
  RefundResponse,
  TransferOptions,
  TransferResponse,
  VerifyOptions,
  VerifyResponse,
  VerifyTransferOptions,
  VerifyTransferResponse,
} from './interfaces';
import {
  validateAuthorizeDirectChargeOptions,
  validateBulkTransferOptions,
  validateCreateSubaccountOptions,
  validateDirectChargeOptions,
  validateGetTransactionLogsOptions,
  validateInitializeOptions,
  validateRefundOptions,
  validateTransferOptions,
  validateVerifyOptions,
  validateVerifyTransferOptions,
} from './validations';

interface IChapa {
  initialize(options: InitializeOptions): Promise<InitializeResponse>;
  mobileInitialize(options: InitializeOptions): Promise<InitializeResponse>;
  verify(options: VerifyOptions): Promise<VerifyResponse>;
  genTxRef(genTxRefOptions?: GenTxRefOptions): Promise<string>;
  getBanks(): Promise<GetBanksResponse>;
  createSubaccount(
    options: CreateSubaccountOptions
  ): Promise<CreateSubaccountResponse>;
  getTransactions(): Promise<GetTransactionsResponse>;
  getTransactionLogs(
    options: GetTransactionLogsOptions
  ): Promise<GetTransactionLogsResponse>;
  transfer(options: TransferOptions): Promise<TransferResponse>;
  bulkTransfer(options: BulkTransferOptions): Promise<BulkTransferResponse>;
  verifyTransfer(
    options: VerifyTransferOptions
  ): Promise<VerifyTransferResponse>;
  getTransfers(): Promise<GetTransfersResponse>;
  directCharge(options: DirectChargeOptions): Promise<DirectChargeResponse>;
  authorizeDirectCharge(
    options: AuthorizeDirectChargeOptions
  ): Promise<AuthorizeDirectChargeResponse>;
  refund(options: RefundOptions): Promise<RefundResponse>;
  verifyWebhook(payload: WebhookPayload | string, signature: string): boolean;
}

export class Chapa implements IChapa {
  private axiosInstance: AxiosInstance;
  private webhookSecret?: string;

  constructor(chapaOptions: ChapaOptions) {
    this.axiosInstance = createAxiosInstance(
      chapaOptions.secretKey,
      chapaOptions.logging,
      chapaOptions.debug,
      chapaOptions.retries,
      chapaOptions.retryDelay
    );
    this.webhookSecret = chapaOptions.webhookSecret;
  }

  async initialize(options: InitializeOptions): Promise<InitializeResponse> {
    return withErrorHandling(async () => {
      validateInitializeOptions(options);
      const response = await this.axiosInstance.post<InitializeResponse>(
        ChapaUrls.INITIALIZE,
        options
      );
      return response.data;
    });
  }

  async mobileInitialize(
    options: InitializeOptions
  ): Promise<InitializeResponse> {
    return withErrorHandling(async () => {
      validateInitializeOptions(options);
      const response = await this.axiosInstance.post<InitializeResponse>(
        ChapaUrls.MOBILE_INITIALIZE,
        options
      );
      return response.data;
    });
  }

  async verify(options: VerifyOptions): Promise<VerifyResponse> {
    return withErrorHandling(async () => {
      validateVerifyOptions(options);
      const response = await this.axiosInstance.get<VerifyResponse>(
        `${ChapaUrls.VERIFY}/${options.tx_ref}`
      );
      return response.data;
    });
  }

  async genTxRef(options?: GenTxRefOptions): Promise<string> {
    const { removePrefix = false, prefix = 'TX', size = 15 } = options || {};

    const nanoid = customAlphabet(alphanumeric, size);
    const reference = nanoid();

    if (removePrefix) {
      return reference.toUpperCase();
    }
    return `${prefix}-${reference.toUpperCase()}`;
  }

  async getBanks(): Promise<GetBanksResponse> {
    return withErrorHandling(async () => {
      const banks = await this.axiosInstance.get<GetBanksResponse>(
        ChapaUrls.BANK
      );
      return banks.data;
    });
  }

  async createSubaccount(
    options: CreateSubaccountOptions
  ): Promise<CreateSubaccountResponse> {
    return withErrorHandling(async () => {
      validateCreateSubaccountOptions(options);
      const response = await this.axiosInstance.post<CreateSubaccountResponse>(
        ChapaUrls.SUBACCOUNT,
        options
      );
      return response.data;
    });
  }

  async getTransactions(): Promise<GetTransactionsResponse> {
    return withErrorHandling(async () => {
      const response = await this.axiosInstance.get<GetTransactionsResponse>(
        ChapaUrls.TRANSACTION
      );
      return response.data;
    });
  }

  async getTransactionLogs(
    options: GetTransactionLogsOptions
  ): Promise<GetTransactionLogsResponse> {
    return withErrorHandling(async () => {
      validateGetTransactionLogsOptions(options);
      const response = await this.axiosInstance.get<GetTransactionLogsResponse>(
        `${ChapaUrls.TRANSACTION_LOG}/${options.ref_id}`
      );
      return response.data;
    });
  }

  async transfer(options: TransferOptions): Promise<TransferResponse> {
    return withErrorHandling(async () => {
      validateTransferOptions(options);
      const response = await this.axiosInstance.post<TransferResponse>(
        ChapaUrls.TRANSFER,
        options
      );
      return response.data;
    });
  }

  async bulkTransfer(
    options: BulkTransferOptions
  ): Promise<BulkTransferResponse> {
    return withErrorHandling(async () => {
      validateBulkTransferOptions(options);
      const response = await this.axiosInstance.post<BulkTransferResponse>(
        ChapaUrls.BULK_TRANSFER,
        options
      );
      return response.data;
    });
  }

  async verifyTransfer(
    options: VerifyTransferOptions
  ): Promise<VerifyTransferResponse> {
    return withErrorHandling(async () => {
      validateVerifyTransferOptions(options);
      const response = await this.axiosInstance.get<VerifyTransferResponse>(
        `${ChapaUrls.VERIFY_TRANSFER}/${options.tx_ref}`
      );
      return response.data;
    });
  }

  async getTransfers(): Promise<GetTransfersResponse> {
    return withErrorHandling(async () => {
      const response = await this.axiosInstance.get<GetTransfersResponse>(
        ChapaUrls.TRANSFER
      );
      return response.data;
    });
  }

  async directCharge(
    options: DirectChargeOptions
  ): Promise<DirectChargeResponse> {
    return withErrorHandling(async () => {
      validateDirectChargeOptions(options);
      const response = await this.axiosInstance.post<DirectChargeResponse>(
        ChapaUrls.DIRECT_CHARGE,
        options,
        {
          params: {
            type: options.type,
          },
        }
      );
      return response.data;
    });
  }

  async authorizeDirectCharge(
    options: AuthorizeDirectChargeOptions
  ): Promise<AuthorizeDirectChargeResponse> {
    return withErrorHandling(async () => {
      validateAuthorizeDirectChargeOptions(options);
      const response =
        await this.axiosInstance.post<AuthorizeDirectChargeResponse>(
          ChapaUrls.AUTHORIZE_DIRECT_CHARGE,
          options,
          {
            params: {
              type: options.type,
            },
          }
        );
      return response.data;
    });
  }

  async refund(options: RefundOptions): Promise<RefundResponse> {
    return withErrorHandling(async () => {
      validateRefundOptions(options);
      const { tx_ref, ...body } = options;
      const formBody = new URLSearchParams();
      Object.entries(body).forEach(([key, value]) => {
        if (value === undefined) {
          return;
        }
        if (key === 'meta' && typeof value === 'object' && value !== null) {
          formBody.set(key, JSON.stringify(value));
          return;
        }
        formBody.set(key, String(value));
      });
      const response = await this.axiosInstance.post<RefundResponse>(
        `${ChapaUrls.REFUND}/${tx_ref}`,
        formBody,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.data;
    });
  }

  verifyWebhook(payload: WebhookPayload | string, signature: string): boolean {
    if (!this.webhookSecret) {
      throw new Error('Webhook secret not configured');
    }
    return verifyWebhookSignature(payload, signature, this.webhookSecret);
  }
}
