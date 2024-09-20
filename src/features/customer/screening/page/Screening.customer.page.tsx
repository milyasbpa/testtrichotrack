import { CustomerScreeningProvider } from "../context";
import { CustomerScreeningContainer } from "../container";

export const CustomerScreeningPage = () => {
  return (
    <CustomerScreeningProvider>
      <CustomerScreeningContainer />
    </CustomerScreeningProvider>
  );
};
