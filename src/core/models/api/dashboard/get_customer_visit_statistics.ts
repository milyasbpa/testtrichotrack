export interface GetCustomerVisitRequestInterface {
  start: string;
  end: string;
  resolution: string;
  outlet?: number;
}

export type GetCustomerVisitResponseInterface = (string | number)[][];
