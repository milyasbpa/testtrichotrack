export interface GetCustomerRegistrationStatisticsRequestInterface {
  start: string;
  end: string;
  resolution: string;
  outlet?: number;
}

export type GetCustomerRegistrationStatisticsResponseInterface = (
  | string
  | number
)[][];
