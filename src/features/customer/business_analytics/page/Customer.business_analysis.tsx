import { CustomerBusinessAnalyticsContainer } from "../container/Customer.business_analysis";
import { CustomerBusinessAnalyticsProvider } from "../contexts/CustomerBusinessAnalytics.context";

export const CustomerBusinessAnalyticsPage = () => {
  return (
    <CustomerBusinessAnalyticsProvider>
      <CustomerBusinessAnalyticsContainer />
    </CustomerBusinessAnalyticsProvider>
  );
};
