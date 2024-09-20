import { CustomerHomeCareContainer } from "../container/HomeCare.customer.container";
import { CustomerHomeCareProvider } from "../context/HomeCare.customer.context";

export const CustomerHomeCarePage = () => {
  return (
    <CustomerHomeCareProvider>
      <CustomerHomeCareContainer />
    </CustomerHomeCareProvider>
  );
};
