import { CustomerLoginContainer } from "../container/Login.scalp_scan";
import { CustomerLoginProvider } from "../context/CustomerLogin.context";

export const CustomerLoginPage = () => {
  return (
    <CustomerLoginProvider>
      <CustomerLoginContainer />
    </CustomerLoginProvider>
  );
};
