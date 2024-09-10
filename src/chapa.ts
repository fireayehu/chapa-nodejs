import axios from 'axios';
import { customAlphabet } from 'nanoid';
import { alphanumeric } from 'nanoid-dictionary';
import { ChapaUrls } from './enums';
import { HttpException } from './http-exception';
import {
  ChapaOptions,
  CreateSubaccountOptions,
  CreateSubaccountResponse,
  GenTxRefOptions,
  GetBanksResponse,
  GetTransactionLogsOptions,
  GetTransactionLogsResponse,
  GetTransactionsResponse,
  InitializeOptions,
  InitializeResponse,
  VerifyOptions,
  VerifyResponse,
} from './interfaces';
import {
  validateCreateSubaccountOptions,
  validateInitializeOptions,
  validateVerifyOptions,
} from './validations';
import { validateGetTransactionLogsOptions } from './validations/transaction.validation';

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
      const banks = await axios.get<GetBanksResponse>(ChapaUrls.BANKS, {
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
        ChapaUrls.TRANSACTIONS,
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
        `${ChapaUrls.TRANSACTIONS_LOGS}/${options.ref_id}`,
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
}
