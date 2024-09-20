import { CompanyTopupContainer } from "../container";
import { ClientTopupProvider } from "../contexts/ClientTopup.context";

export const CompanyTopupPage = () => {
  return (
    <ClientTopupProvider>
      <CompanyTopupContainer />
    </ClientTopupProvider>
  );
};
