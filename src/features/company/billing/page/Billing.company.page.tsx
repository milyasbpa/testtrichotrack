import { CompanyBillingContainer } from "../container";
import { CompanyBillingProvider } from "../context";

export const CompanyBillingPage = () => {
  return (
    <CompanyBillingProvider>
      <CompanyBillingContainer />
    </CompanyBillingProvider>
  );
};
