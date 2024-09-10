export type DirectChargeType =
  | 'telebirr'
  | 'mpesa'
  | 'Amole'
  | 'CBEBirr'
  | 'Coopay-Ebirr'
  | 'AwashBirr'
  | string;

/**
 * Direct Charge
 */

export interface DirectChargeOptions {
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile: string;
  currency: string;
  amount: string;
  tx_ref: string;
  type: DirectChargeType;
}

interface Meta {
  message: string;
  ref_id: string;
  verification_type: string;
  status: string;
  data: string;
  payment_status: string;
}

export interface DirectChargeResponse {
  message: string;
  status: string;
  data: {
    auth_type: string;
    meta: Meta;
  };
}

/**
 * Auhorize Direct Charge
 */

export interface AuthorizeDirectChargeOptions {
  reference: string;
  client: string;
  type: DirectChargeType;
}

export interface AuthorizeDirectChargeResponse {
  message: string;
  trx_ref: string;
  processor_id: string;
}
