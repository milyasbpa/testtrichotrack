export interface GetOutletsRequestInterface {
  skip?: number;
  limit: number;
  sort_by?: string;
  ascending?: boolean;
  search?: string;
}

export interface GetOutlets200SuccessResponseInterface {
  address: string;
  id: number;
  mobile: string;
  name: string;
  photo: string;
  reg_time: string;
}
