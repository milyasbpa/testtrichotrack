export interface PutNotificationPreferenceRequestInterface {
  body: {
    email: string;
    min_credit: number;
    min_day: number;
    mobile: string | null;
  };
}
export interface PutNotificationPreference200SuccessResponseInterface {
  id: number;
}
