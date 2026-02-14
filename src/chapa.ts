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
  initialize(
    options: InitializeOptions,
    signal?: AbortSignal
  ): Promise<InitializeResponse>;
  mobileInitialize(
    options: InitializeOptions,
    signal?: AbortSignal
  ): Promise<InitializeResponse>;
  verify(options: VerifyOptions, signal?: AbortSignal): Promise<VerifyResponse>;
  genTxRef(genTxRefOptions?: GenTxRefOptions): string;
  getBanks(signal?: AbortSignal): Promise<GetBanksResponse>;
  createSubaccount(
    options: CreateSubaccountOptions,
    signal?: AbortSignal
  ): Promise<CreateSubaccountResponse>;
  getTransactions(signal?: AbortSignal): Promise<GetTransactionsResponse>;
  getTransactionLogs(
    options: GetTransactionLogsOptions,
    signal?: AbortSignal
  ): Promise<GetTransactionLogsResponse>;
  transfer(
    options: TransferOptions,
    signal?: AbortSignal
  ): Promise<TransferResponse>;
  bulkTransfer(
    options: BulkTransferOptions,
    signal?: AbortSignal
  ): Promise<BulkTransferResponse>;
  verifyTransfer(
    options: VerifyTransferOptions,
    signal?: AbortSignal
  ): Promise<VerifyTransferResponse>;
  getTransfers(signal?: AbortSignal): Promise<GetTransfersResponse>;
  directCharge(
    options: DirectChargeOptions,
    signal?: AbortSignal
  ): Promise<DirectChargeResponse>;
  authorizeDirectCharge(
    options: AuthorizeDirectChargeOptions,
    signal?: AbortSignal
  ): Promise<AuthorizeDirectChargeResponse>;
  refund(options: RefundOptions, signal?: AbortSignal): Promise<RefundResponse>;
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
      chapaOptions.retryDelay,
      chapaOptions.timeout
    );
    this.webhookSecret = chapaOptions.webhookSecret;
  }

  async initialize(
    options: InitializeOptions,
    signal?: AbortSignal
  ): Promise<InitializeResponse> {
    return withErrorHandling(async () => {
      validateInitializeOptions(options);
      const response = await this.axiosInstance.post<InitializeResponse>(
        ChapaUrls.INITIALIZE,
        options,
        { signal }
      );
      return response.data;
    });
  }

  async mobileInitialize(
    options: InitializeOptions,
    signal?: AbortSignal
  ): Promise<InitializeResponse> {
    return withErrorHandling(async () => {
      validateInitializeOptions(options);
      const response = await this.axiosInstance.post<InitializeResponse>(
        ChapaUrls.MOBILE_INITIALIZE,
        options,
        { signal }
      );
      return response.data;
    });
  }

  async verify(
    options: VerifyOptions,
    signal?: AbortSignal
  ): Promise<VerifyResponse> {
    return withErrorHandling(async () => {
      validateVerifyOptions(options);
      const response = await this.axiosInstance.get<VerifyResponse>(
        `${ChapaUrls.VERIFY}/${options.tx_ref}`,
        { signal }
      );
      return response.data;
    });
  }

  genTxRef(options?: GenTxRefOptions): string {
    const { removePrefix = false, prefix = 'TX', size = 15 } = options || {};

    const nanoid = customAlphabet(alphanumeric, size);
    const reference = nanoid();

    if (removePrefix) {
      return reference.toUpperCase();
    }
    return `${prefix}-${reference.toUpperCase()}`;
  }

  async getBanks(signal?: AbortSignal): Promise<GetBanksResponse> {
    return withErrorHandling(async () => {
      const banks = await this.axiosInstance.get<GetBanksResponse>(
        ChapaUrls.BANK,
        { signal }
      );
      return banks.data;
    });
  }

  async createSubaccount(
    options: CreateSubaccountOptions,
    signal?: AbortSignal
  ): Promise<CreateSubaccountResponse> {
    return withErrorHandling(async () => {
      validateCreateSubaccountOptions(options);
      const response = await this.axiosInstance.post<CreateSubaccountResponse>(
        ChapaUrls.SUBACCOUNT,
        options,
        { signal }
      );
      return response.data;
    });
  }

  async getTransactions(
    signal?: AbortSignal
  ): Promise<GetTransactionsResponse> {
    return withErrorHandling(async () => {
      const response = await this.axiosInstance.get<GetTransactionsResponse>(
        ChapaUrls.TRANSACTION,
        { signal }
      );
      return response.data;
    });
  }

  async getTransactionLogs(
    options: GetTransactionLogsOptions,
    signal?: AbortSignal
  ): Promise<GetTransactionLogsResponse> {
    return withErrorHandling(async () => {
      validateGetTransactionLogsOptions(options);
      const response = await this.axiosInstance.get<GetTransactionLogsResponse>(
        `${ChapaUrls.TRANSACTION_LOG}/${options.ref_id}`,
        { signal }
      );
      return response.data;
    });
  }

  async transfer(
    options: TransferOptions,
    signal?: AbortSignal
  ): Promise<TransferResponse> {
    return withErrorHandling(async () => {
      validateTransferOptions(options);
      const response = await this.axiosInstance.post<TransferResponse>(
        ChapaUrls.TRANSFER,
        options,
        { signal }
      );
      return response.data;
    });
  }

  async bulkTransfer(
    options: BulkTransferOptions,
    signal?: AbortSignal
  ): Promise<BulkTransferResponse> {
    return withErrorHandling(async () => {
      validateBulkTransferOptions(options);
      const response = await this.axiosInstance.post<BulkTransferResponse>(
        ChapaUrls.BULK_TRANSFER,
        options,
        { signal }
      );
      return response.data;
    });
  }

  async verifyTransfer(
    options: VerifyTransferOptions,
    signal?: AbortSignal
  ): Promise<VerifyTransferResponse> {
    return withErrorHandling(async () => {
      validateVerifyTransferOptions(options);
      const response = await this.axiosInstance.get<VerifyTransferResponse>(
        `${ChapaUrls.VERIFY_TRANSFER}/${options.tx_ref}`,
        { signal }
      );
      return response.data;
    });
  }

  async getTransfers(signal?: AbortSignal): Promise<GetTransfersResponse> {
    return withErrorHandling(async () => {
      const response = await this.axiosInstance.get<GetTransfersResponse>(
        ChapaUrls.TRANSFER,
        { signal }
      );
      return response.data;
    });
  }

  async directCharge(
    options: DirectChargeOptions,
    signal?: AbortSignal
  ): Promise<DirectChargeResponse> {
    return withErrorHandling(async () => {
      validateDirectChargeOptions(options);
      const response = await this.axiosInstance.post<DirectChargeResponse>(
        ChapaUrls.DIRECT_CHARGE,
        options,
        {
          signal,
          params: {
            type: options.type,
          },
        }
      );
      return response.data;
    });
  }

  async authorizeDirectCharge(
    options: AuthorizeDirectChargeOptions,
    signal?: AbortSignal
  ): Promise<AuthorizeDirectChargeResponse> {
    return withErrorHandling(async () => {
      validateAuthorizeDirectChargeOptions(options);
      const response =
        await this.axiosInstance.post<AuthorizeDirectChargeResponse>(
          ChapaUrls.AUTHORIZE_DIRECT_CHARGE,
          options,
          {
            signal,
            params: {
              type: options.type,
            },
          }
        );
      return response.data;
    });
  }

  async refund(
    options: RefundOptions,
    signal?: AbortSignal
  ): Promise<RefundResponse> {
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
          signal,
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
