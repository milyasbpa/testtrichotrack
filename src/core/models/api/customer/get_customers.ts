export interface GetCustomersRequestInterface {
  skip?: number;
  limit?: number;
  sort_by?: string;
  ascending?: boolean;
  filter_by?: {
    gender: string;
    race: string;
    status: string;
  };
  search?: string;
}

export interface GetCustomers200SuccessResponseInterface {
  id: number;
  reg_time: string;
  name: string;
  mobile: string;
  gender: string;
  race: string;
  birthday: string;
  status: string;
  photo: string;
  email: string;
}
