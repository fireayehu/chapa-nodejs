interface Data {
  id: string;
  name: string;
  country_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface GetBanksResponse {
  message: string;
  data: Data[];
}
