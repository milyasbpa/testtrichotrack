import { CustomerListContainer } from "../container";
import { CustomerListProvider } from "../contexts";

export const CustomerListPage = () => {
  return (
    <CustomerListProvider>
      <CustomerListContainer />
    </CustomerListProvider>
  );
};
