import { CustomerInsightContainer } from "../container/Customer.insight";
import { CustomerInsightProvider } from "../context/CustomerInsight.context";

export const CustomerInsightPage = () => {
  return (
    <CustomerInsightProvider>
      <CustomerInsightContainer />
    </CustomerInsightProvider>
  );
};
