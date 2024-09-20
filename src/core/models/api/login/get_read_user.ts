export interface GetReadUserRequestInterface {
  token?: string;
}

export interface GetReadUser200SuccessResponseInterface {
  id: number;
  name: string;
  mobile: string;
  status: string;
  permission: string;
}
