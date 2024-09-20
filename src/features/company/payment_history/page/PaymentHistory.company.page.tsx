import { CompanyPaymentHistoryContainer } from "../container";
import { ClientPaymentHistoryProvider } from "../contexts/ClientPaymentHistory.context";

export const CompanyPaymentHistoryPage = () => {
  return (
    <ClientPaymentHistoryProvider>
      <CompanyPaymentHistoryContainer />
    </ClientPaymentHistoryProvider>
  );
};
