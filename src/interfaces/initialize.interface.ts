import { SplitType } from '../enums';

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
