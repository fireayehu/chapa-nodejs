import { InitializeOptions } from './initialize.interface';

interface Subaccount {
  id: string;
}

export interface InitializeSplitPaymentOptions extends InitializeOptions {
  subaccounts: Subaccount[];
}

export interface InitializeSplitPaymentResponse {
  message: string;
  status: string;
  data: {
    checkout_url: string;
  };
}
