import { SplitType } from '../enums';

interface Subaccount {
  id: string;
  split_type?: SplitType;
  transaction_charge?: number;
}
export interface InitializeOptions {
  first_name: string;
  last_name: string;
  email: string;
  currency: string;
  amount: string;
  tx_ref: string;
  callback_url?: string;
  return_url?: string;
  customization?: {
    title?: string;
    description?: string;
    logo?: string;
  };
  subaccounts?: Subaccount[];
}

export interface InitializeResponse {
  message: string;
  status: string;
  data: {
    checkout_url: string;
  };
}

export interface DirectChargePaymentMethod {
  type: 'telebirr' | 'cbebirr' | 'awash_birr' | 'ebirr' | 'amole';
}

export interface DirectChargeBody {
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile: string;
  currency: string;
  amount: string;
  tx_ref: string;

  // subaccounts?: Subaccount[];
}

export interface DirectChargeResponse {
  message: string;
  status: string;
  data: {
    auth_type: string;
    meta: {
      message: string;
      ref_id: string;
      verification_type: string;
      status: string;
      data: any;
      payment_status: string;
    };
  };
}

export interface DirectChargeErrorResponse {
  message: string;
  status: string;
  data: any;
}

export interface VerifyDirectChargeParams {
  reference: string;
  encryptionKey: string;
  payment_method: 'telebirr' | 'cbebirr' | 'awash_birr' | 'ebirr' | 'amole';
  payload: any;
}

export interface VerifyDirectChargeResponse {
  message: string;
  trx_ref: string;
  processor_id: null | string; // processor_id can be either null or a string
}
