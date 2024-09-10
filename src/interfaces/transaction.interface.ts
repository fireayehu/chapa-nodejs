export interface GetTransactionLogsOptions {
  ref_id: string;
}

interface Customer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  mobile: string;
}

interface Log {
  item: number;
  message: string;
  type: string;
  created_at: string;
  updated_at: string;
}

interface Transaction {
  status: string;
  ref_id: string;
  type: string;
  created_at: Date;
  currency: string;
  amount: string;
  charge: string;
  trans_id: string;
  payment_method: string;
  customer: Customer;
}

interface Pagination {
  per_page: number;
  current_page: number;
  first_page_url: string;
  next_page_url: string;
  prev_page_url: string;
}

export interface GetTransactionsResponse {
  message: string;
  status: string;
  data: {
    transactions: Transaction[];
    pagination: Pagination;
  };
}

export interface GetTransactionLogsResponse {
  message: string;
  status: string;
  data: Log[];
}
