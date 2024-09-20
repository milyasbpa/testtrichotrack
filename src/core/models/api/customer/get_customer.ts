export interface GetCustomerRequestInterface {
  customer_id: number;
}

export interface GetCustomerSuccessResponseInterface {
  id: number;
  reg_time: string;
  name: string;
  mobile: string;
  gender: string;
  race: string;
  birthday: string;
  email: string;
  photo: null | string;
  status: string;
  crm_id: number | null;
}
