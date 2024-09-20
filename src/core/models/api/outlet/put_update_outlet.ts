export interface PutUpdateOutletRequestInterface {
  params: {
    outlet_id: number;
  };
  data: {
    name: string;
    address?: string;
    mobile?: string;
    photo?: string;
  };
}
export interface PutUpdateOutlet200SuccessResponseInterface {
  detail: string;
}
export interface PutUpdateOutlet401SuccessResponseInterface {
  detail: string;
}
