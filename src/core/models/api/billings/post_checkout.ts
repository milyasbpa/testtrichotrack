export interface PostCheckoutRequestInterface {
  body: {
    cancel_url: string;
    language: string;
    success_url: string;
    tier_id: number;
  };
}
export interface PostCheckout200SuccessResponseInterface {
  detail: string;
}
