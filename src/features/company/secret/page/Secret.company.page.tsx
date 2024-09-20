import { CompanySecretContainer } from "../container";
import { SecretCompanyProvider } from "../context/Secret.company.context";

export const CompanySecretPage = () => {
  return (
    <SecretCompanyProvider>
      <CompanySecretContainer />
    </SecretCompanyProvider>
  );
};
