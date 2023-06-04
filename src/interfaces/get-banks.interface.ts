type Currency = 'ETB' | 'USD';

interface Data {
  id: string;
  swift: string;
  name: string;
  acct_length: number;
  country_id: number;
  created_at: Date;
  updated_at: Date;
  is_rtgs: boolean | null;
  is_mobilemoney: boolean | null;
  currency: Currency;
}

export interface GetBanksResponse {
  message: string;
  data: Data[];
}
