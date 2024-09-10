import { SplitType } from '../enums';

/**
 * Initialize Payment
 */

interface Subaccount {
  id: string;
  split_type?: SplitType;
  split_value?: number;
}

export interface InitializeOptions {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
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

interface IData {
  checkout_url: string;
}

export interface InitializeResponse {
  message: string;
  status: string;
  data?: IData;
}

/**
 * Verify Payment
 */

export interface VerifyOptions {
  tx_ref: string;
}

export interface VerifyResponse {
  message: string;
  status: string;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    currency: string;
    amount: string;
    charge: string;
    mode: string;
    method: string;
    type: string;
    status: string;
    reference: string;
    tx_ref: string;
    customization: {
      title: string;
      description: string;
      logo: string;
    };
    meta: any;
    created_at: Date;
    updated_at: Date;
  };
}
