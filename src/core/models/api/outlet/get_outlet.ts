export interface GetOutletRequestInterface {
  outlet_id: number;
}

export interface GetOutlet200SuccessResponseInterface {
  name: string;
  address?: string;
  mobile?: string;
  photo?: string;
}
