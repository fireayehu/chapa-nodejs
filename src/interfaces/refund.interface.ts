export interface RefundOptions {
  tx_ref: string;
  reason?: string;
  amount?: string;
  meta?: {
    customer_id?: string;
    reference?: string;
    [key: string]: any;
  };
}

export interface RefundResponse {
  message: string;
  status: string;
  data: any;
}
