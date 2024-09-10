import axios from 'axios';
import { customAlphabet } from 'nanoid';
import { alphanumeric } from 'nanoid-dictionary';
import { ChapaUrls } from './enums';
import { HttpException } from './http-exception';
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
  validateTransferOptions,
  validateVerifyOptions,
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
}

export class Chapa implements IChapa {
  constructor(private chapaOptions: ChapaOptions) {}

  async initialize(options: InitializeOptions): Promise<InitializeResponse> {
    try {
      await validateInitializeOptions(options);

      const response = await axios.post<InitializeResponse>(
        ChapaUrls.INITIALIZE,
        options,
        {
          headers: {
            Authorization: `Bearer ${this.chapaOptions.secretKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message,
          error.response.status
        );
      } else if (error.name === 'ValidationError') {
        throw new HttpException(error.errors[0], 400);
      } else {
        throw error;
      }
    }
  }

  async mobileInitialize(
    options: InitializeOptions
  ): Promise<InitializeResponse> {
    try {
      await validateInitializeOptions(options);

      const response = await axios.post<InitializeResponse>(
        ChapaUrls.MOBILE_INITIALIZE,
        options,
        {
          headers: {
            Authorization: `Bearer ${this.chapaOptions.secretKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message,
          error.response.status
        );
      } else if (error.name === 'ValidationError') {
        throw new HttpException(error.errors[0], 400);
      } else {
        throw error;
      }
    }
  }

  async verify(options: VerifyOptions): Promise<VerifyResponse> {
    try {
      await validateVerifyOptions(options);
      const response = await axios.get<VerifyResponse>(
        `${ChapaUrls.VERIFY}/${options.tx_ref}`,
        {
          headers: {
            Authorization: `Bearer ${this.chapaOptions.secretKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message,
          error.response.status
        );
      } else if (error.name === 'ValidationError') {
        throw new HttpException(error.errors[0], 400);
      } else {
        throw error;
      }
    }
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
    try {
      const banks = await axios.get<GetBanksResponse>(ChapaUrls.BANK, {
        headers: {
          Authorization: `Bearer ${this.chapaOptions.secretKey}`,
        },
      });
      return banks.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message,
          error.response.status
        );
      } else {
        throw error;
      }
    }
  }

  async createSubaccount(
    options: CreateSubaccountOptions
  ): Promise<CreateSubaccountResponse> {
    try {
      await validateCreateSubaccountOptions(options);
      const response = await axios.post<CreateSubaccountResponse>(
        ChapaUrls.SUBACCOUNT,
        options,
        {
          headers: {
            Authorization: `Bearer ${this.chapaOptions.secretKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message,
          error.response.status
        );
      } else if (error.name === 'ValidationError') {
        throw new HttpException(error.errors[0], 400);
      } else {
        throw error;
      }
    }
  }

  async getTransactions(): Promise<GetTransactionsResponse> {
    try {
      const response = await axios.get<GetTransactionsResponse>(
        ChapaUrls.TRANSACTION,
        {
          headers: {
            Authorization: `Bearer ${this.chapaOptions.secretKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message,
          error.response.status
        );
      } else {
        throw error;
      }
    }
  }

  async getTransactionLogs(
    options: GetTransactionLogsOptions
  ): Promise<GetTransactionLogsResponse> {
    try {
      await validateGetTransactionLogsOptions(options);
      const response = await axios.get<GetTransactionLogsResponse>(
        `${ChapaUrls.TRANSACTION_LOG}/${options.ref_id}`,
        {
          headers: {
            Authorization: `Bearer ${this.chapaOptions.secretKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message,
          error.response.status
        );
      } else if (error.name === 'ValidationError') {
        throw new HttpException(error.errors[0], 400);
      } else {
        throw error;
      }
    }
  }

  async transfer(options: TransferOptions): Promise<TransferResponse> {
    try {
      await validateTransferOptions(options);

      const response = await axios.post<TransferResponse>(
        ChapaUrls.TRANSFER,
        options,
        {
          headers: {
            Authorization: `Bearer ${this.chapaOptions.secretKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message,
          error.response.status
        );
      } else if (error.name === 'ValidationError') {
        throw new HttpException(error.errors[0], 400);
      } else {
        throw error;
      }
    }
  }

  async bulkTransfer(
    options: BulkTransferOptions
  ): Promise<BulkTransferResponse> {
    try {
      await validateBulkTransferOptions(options);

      const response = await axios.post<BulkTransferResponse>(
        ChapaUrls.BULK_TRANSFER,
        options,
        {
          headers: {
            Authorization: `Bearer ${this.chapaOptions.secretKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message,
          error.response.status
        );
      } else if (error.name === 'ValidationError') {
        throw new HttpException(error.errors[0], 400);
      } else {
        throw error;
      }
    }
  }

  async verifyTransfer(
    options: VerifyTransferOptions
  ): Promise<VerifyTransferResponse> {
    try {
      await validateVerifyOptions(options);
      const response = await axios.get<VerifyTransferResponse>(
        `${ChapaUrls.VERIFY_TRANSFER}/${options.tx_ref}`,
        {
          headers: {
            Authorization: `Bearer ${this.chapaOptions.secretKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message,
          error.response.status
        );
      } else if (error.name === 'ValidationError') {
        throw new HttpException(error.errors[0], 400);
      } else {
        throw error;
      }
    }
  }

  async getTransfers(): Promise<GetTransfersResponse> {
    try {
      const response = await axios.get<GetTransfersResponse>(
        ChapaUrls.TRANSFER,
        {
          headers: {
            Authorization: `Bearer ${this.chapaOptions.secretKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message,
          error.response.status
        );
      } else {
        throw error;
      }
    }
  }

  async directCharge(
    options: DirectChargeOptions
  ): Promise<DirectChargeResponse> {
    try {
      await validateDirectChargeOptions(options);

      const response = await axios.post<DirectChargeResponse>(
        ChapaUrls.DIRECT_CHARGE,
        options,
        {
          params: {
            type: options.type,
          },
          headers: {
            Authorization: `Bearer ${this.chapaOptions.secretKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message,
          error.response.status
        );
      } else if (error.name === 'ValidationError') {
        throw new HttpException(error.errors[0], 400);
      } else {
        throw error;
      }
    }
  }

  async authorizeDirectCharge(
    options: AuthorizeDirectChargeOptions
  ): Promise<AuthorizeDirectChargeResponse> {
    try {
      await validateAuthorizeDirectChargeOptions(options);

      const response = await axios.post<AuthorizeDirectChargeResponse>(
        ChapaUrls.AUTHORIZE_DIRECT_CHARGE,
        options,
        {
          params: {
            type: options.type,
          },
          headers: {
            Authorization: `Bearer ${this.chapaOptions.secretKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message,
          error.response.status
        );
      } else if (error.name === 'ValidationError') {
        throw new HttpException(error.errors[0], 400);
      } else {
        throw error;
      }
    }
  }
}
