export interface GetCasesRequestInterface {
  limit: number;
  skip: number;
}

export interface GetCasesResponseInterface {
  id: number;
  svc_time: string;
  status: string;
}
