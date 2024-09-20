import { useContext } from "react";
import { CustomerVisitCardBusinessAnalytics } from "../../components/customer_visit_card/CustomerVisitCard.business_analytics";
import { CustomerBusinessAnalyticsContext } from "../../contexts/CustomerBusinessAnalytics.context";
import { useCustomerBusinessAnalyticsGetCustomerVisitStatistics } from "../../react_query/hooks/useGetCustomerVisitStatistics.business_analytics";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export const CustomerVisitBusinessAnalytics = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state } = useContext(CustomerBusinessAnalyticsContext);
  const { isFetching: isFetchingGetCustomerVisitStatistics } =
    useCustomerBusinessAnalyticsGetCustomerVisitStatistics();

  if (isFetchingGetCustomerVisitStatistics) {
    return null;
  }

  return (
    <CustomerVisitCardBusinessAnalytics
      title={dictionaries.customer_visit_card.title}
      data={state.customer_visit.data}
      labels={state.customer_visit.labels}
    />
  );
};
