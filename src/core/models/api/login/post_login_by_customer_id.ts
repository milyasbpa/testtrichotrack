export interface PostLoginByCustomerIDRequestInterface {
  customer_id: number;
}

export interface PostLoginByCustomerID200SuccessResponseInterface {
  access_token: string;
  token_type: string;
}
