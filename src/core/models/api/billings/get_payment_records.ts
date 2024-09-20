export interface GetPaymentRecordsRequestInterface {
  params: {
    start: string;
    end: string;
  };
}

export interface GetPaymentRecordsResponseInterface {
  amount: number;
  currency: string;
  id: number;
  receipt: null | string;
  tier_id: number;
  tier_name: {
    Chinese: string;
    English: string;
  };
  payment_time: string;
}
