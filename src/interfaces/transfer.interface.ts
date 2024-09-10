/**
 * Transfer
 */

export interface TransferOptions {
  account_name: string;
  account_number: string;
  amount: string;
  currency: string;
  reference: string;
  bank_code: number;
}

export interface TransferResponse {
  message: string;
  status: string;
  data: string;
}

/**
 * Bulk Transfer
 */

export interface BulkData {
  account_name: string;
  account_number: string;
  amount: string;
  reference: string;
  bank_code: number;
}

export interface BulkTransferOptions {
  title: string;
  currency: string;
  bulk_data: BulkData[];
}

export interface BulkTransferResponse {
  message: string;
  status: string;
  data: {
    id: number;
    created_at: string;
  };
}

/**
 * Get Transfers
 */

interface Meta {
  current_page: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
  error: any[];
}

interface Transfer {
  account_name: string;
  account_number: string;
  currency: string;
  amount: number;
  charge: number;
  transfer_type: string;
  chapa_reference: string;
  bank_code: number;
  bank_name: string;
  bank_reference: string;
  status: string;
  reference: string;
  created_at: string;
  updated_at: string;
}

export interface GetTransfersResponse {
  message: string;
  status: string;
  data: Transfer[];
  meta: Meta;
}

/**
 * Verify Transfer
 */

export interface VerifyTransferOptions {
  tx_ref: string;
}

interface Data {
  account_name: string;
  account_number: string;
  mobile: string;
  currency: string;
  amount: number;
  charge: number;
  mode: string;
  transfer_method: string;
  narration: string;
  chapa_transfer_id: string;
  bank_code: number;
  bank_name: string;
  cross_party_reference: string;
  ip_address: string;
  status: string;
  tx_ref: string;
  created_at: string;
  updated_at: string;
}

export interface VerifyTransferResponse {
  message: string;
  status: string;
  data: Data;
}
