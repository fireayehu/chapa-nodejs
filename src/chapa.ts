import axios from 'axios';
import { ChapaUrls } from './enums/chapa-urls.enum';
import { HttpException } from './http-exception';
import {
  ChapaOptions,
  InitializeOptions,
  InitializeResponse,
  VerifyOptions,
  VerifyResponse,
} from './interfaces';
import { validateInitializeOptions } from './validations/initialize.validation';
import { validateVerifyOptions } from './validations/verify.validation';

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
}
