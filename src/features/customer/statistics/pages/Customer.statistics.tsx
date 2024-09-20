import { CustomerStatisticsContainer } from "../containers/Customer.statistics";
import { CustomerStatisticsProvider } from "../contexts/CustomerStatistics.context";

export const CustomerStatisticsPage = () => {
  return (
    <CustomerStatisticsProvider>
      <CustomerStatisticsContainer />
    </CustomerStatisticsProvider>
  );
};
