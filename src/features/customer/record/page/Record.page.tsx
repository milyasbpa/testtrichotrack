import { CustomerRecordContainer } from "../container";
import { CustomerRecordProvider } from "../context";

export const CustomerRecordPage = () => {
  return (
    <CustomerRecordProvider>
      <CustomerRecordContainer />
    </CustomerRecordProvider>
  );
};
