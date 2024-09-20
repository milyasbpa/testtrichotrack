import { GetPaymentRecordsRequestInterface } from "src/core/models/api/billings";

export const PaymentHistoryReactQueryKey = {
  GetPaymentRecords: (payload?: GetPaymentRecordsRequestInterface) => [
    "PaymentHistoryReactQueryKey.GetPaymentRecords",
    [payload] as const,
  ],
  GetReceipt: () => ["PaymentHistoryReactQueryKey.GetReceipt"],
};
