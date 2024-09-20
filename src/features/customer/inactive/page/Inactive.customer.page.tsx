import { CustomerInactiveContainer } from "../container/Inactive.customer.container";
import { CustomerInactiveProvider } from "../context/CustomerInactive.context";

export const CustomerInactivePage = () => {
  return (
    <CustomerInactiveProvider>
      <CustomerInactiveContainer />
    </CustomerInactiveProvider>
  );
};
