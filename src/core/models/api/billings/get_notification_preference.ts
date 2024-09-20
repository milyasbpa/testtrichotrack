export interface GetNotificationPreferenceRequestInterface {}

export interface GetNotificationPreferenceResponseInterface {
  email: string;
  min_credit: number;
  min_day: number;
  mobile: string | null;
}
