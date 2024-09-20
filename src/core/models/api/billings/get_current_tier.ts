export interface GetCurrentTierRequestInterface {}

export interface GetCurrentTierResponseInterface {
  alert: null | {
    Chinese: string;
    English: string;
  };
  balance: null | number;
  customer: number[];
  outlet: number[];
  staff: number[];
  expiration?: string;
  tier_id: number;
  tier_model: string;
  tier_name: {
    Chinese: string;
    English: string;
  };
}
