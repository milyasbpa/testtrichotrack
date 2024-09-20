import { CustomerProfileContainer } from "../containers";
import { CustomerProfileProvider } from "../contexts";

export const CustomerProfilePage = () => {
  return (
    <CustomerProfileProvider>
      <CustomerProfileContainer />
    </CustomerProfileProvider>
  );
};
