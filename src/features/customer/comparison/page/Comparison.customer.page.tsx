import { CustomerComparisonContainer } from "../container/Comparison.customer.container";
import { CustomerComparisonProvider } from "../context/Comparison.customer.context";

export const CustomerComparisonPage = () => {
  return (
    <CustomerComparisonProvider>
      <CustomerComparisonContainer />
    </CustomerComparisonProvider>
  );
};
