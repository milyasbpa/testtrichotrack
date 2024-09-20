import { CustomerRegistrationContainer } from "../container";
import { CustomerRegistrationProvider } from "../context";

export const CustomerRegistrationPage = () => {
  return (
    <CustomerRegistrationProvider>
      <CustomerRegistrationContainer />
    </CustomerRegistrationProvider>
  );
};
