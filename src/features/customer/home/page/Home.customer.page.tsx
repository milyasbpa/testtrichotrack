import { CustomerHomeContainer } from "../container";
import { CustomerHomeProvider } from "../context";

export const CustomerHomePage = () => {
  return (
    <CustomerHomeProvider>
      <CustomerHomeContainer />
    </CustomerHomeProvider>
  );
};
