export interface GetAvailableTiersRequestInterface {}

export interface GetAvailableTiersResponseInterface {
  currency: string;
  duration: number;
  id: number;
  intro: {
    Chinese: string;
    English: string;
  };
  max_customer: number;
  max_outlet: number;
  max_price: number;
  max_staff: number;
  min_price: number;
  model: string;
  name: {
    Chinese: string;
    English: string;
  };
  rate: number;
  terms: {
    Chinese: string;
    English: string;
  };
}
