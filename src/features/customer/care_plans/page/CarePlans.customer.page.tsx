import { CustomerCarePlansContainer } from "../container/CarePlans.customer.container";
import { CustomerCarePlansProvider } from "../context/CarePlans.customer.context";

export const CustomerCarePlansPage = () => {
  return (
    <CustomerCarePlansProvider>
      <CustomerCarePlansContainer />
    </CustomerCarePlansProvider>
  );
};
