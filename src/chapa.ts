import axios from 'axios';
import { customAlphabet } from 'nanoid/async';
import { alphanumeric } from 'nanoid-dictionary';
import { ChapaUrls } from './enums';
import { HttpException } from './http-exception';
import {
  ChapaOptions,
  GenerateTransactionReferenceOptions,
  InitializeOptions,
  InitializeResponse,
  VerifyOptions,
  VerifyResponse,
} from './interfaces';
import {
  validateInitializeOptions,
  validateVerifyOptions,
} from './validations';

interface IChapa {
  initialize(initializeOptions: InitializeOptions): Promise<InitializeResponse>;
  verify(VerifyOptions: VerifyOptions): Promise<VerifyResponse>;
}
export class Chapa implements IChapa {
  constructor(private chapaOptions: ChapaOptions) {}

  async initialize(
    initializeOptions: InitializeOptions
  ): Promise<InitializeResponse> {
    try {
      await validateInitializeOptions(initializeOptions);

      const response = await axios.post<InitializeResponse>(
        ChapaUrls.INITIALIZE,
        initializeOptions,
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
  async verify(verifyOptions: VerifyOptions): Promise<VerifyResponse> {
    try {
      await validateVerifyOptions(verifyOptions);
      const response = await axios.get<VerifyResponse>(
        `${ChapaUrls.VERIFY}/${verifyOptions.tx_ref}`,
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

  async generateTransactionReference(
    generateTransactionReferenceOptions?: GenerateTransactionReferenceOptions
  ): Promise<string> {
    const prefix =
      generateTransactionReferenceOptions &&
      generateTransactionReferenceOptions.prefix
        ? generateTransactionReferenceOptions.prefix
        : 'tx';
    const size =
      generateTransactionReferenceOptions &&
      generateTransactionReferenceOptions.size
        ? generateTransactionReferenceOptions.size
        : 15;
    const nanoid = customAlphabet(alphanumeric, size);
    const reference = await nanoid();
    return `${prefix}-${reference}`;
  }
}
