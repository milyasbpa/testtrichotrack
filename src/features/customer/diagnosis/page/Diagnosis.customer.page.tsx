import { CustomerDiagnosisProvider } from "../context/Diagnosis.customer.context";
import { CustomerDiagnosisContainer } from "../container";

export const CustomerDiagnosisPage = () => {
  return (
    <CustomerDiagnosisProvider>
      <CustomerDiagnosisContainer />
    </CustomerDiagnosisProvider>
  );
};
