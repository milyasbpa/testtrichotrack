import { CompanyLogoProvider } from "../contexts";
import { CompanyLogoContainer } from "../containers";

export const CompanyLogoPage = () => {
  return (
    <CompanyLogoProvider>
      <CompanyLogoContainer />
    </CompanyLogoProvider>
  );
};
