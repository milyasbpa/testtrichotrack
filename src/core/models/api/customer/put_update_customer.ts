export interface PutUpdateExtraInfoCustomerRequestInterface {
  citizenship?: string;
  marital_status?: string;
  address?: string;
  receive_promotion?: string;
  nric?: string;
  profession?: string;
}
export interface PutUpdateCustomerRequestInterface {
  id: number;
  name: string;
  mobile: string;
  gender: string;
  birthday: string;
  race?: string;
  email?: string | null;
  extra_info?: PutUpdateExtraInfoCustomerRequestInterface;
}

export interface PutUpdateCustomer200SuccessResponseInterface {
  detail: string;
}
