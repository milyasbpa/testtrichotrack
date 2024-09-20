import { useContext } from "react";
import { CustomerVisitDistributionCardBusinessAnalytics } from "../../components/customer_visit_distribution_card/CustomerVisitDistributionCard.business_analytics";
import { CustomerBusinessAnalyticsContext } from "../../contexts/CustomerBusinessAnalytics.context";
import { useCustomerBusinessAnalyticsGetVisitStatistics } from "../../react_query/hooks/useGetVisitStatistics.business_analytics";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export const CustomerVisitDistributionBusinessAnalytics = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state } = useContext(CustomerBusinessAnalyticsContext);
  const { isFetching: isFetchingGetVisitStatistics } =
    useCustomerBusinessAnalyticsGetVisitStatistics();
  if (isFetchingGetVisitStatistics) {
    return null;
  }

  return (
    <CustomerVisitDistributionCardBusinessAnalytics
      title={dictionaries.customer_visit_distribution_card.title}
      data={state.customer_visit_distribution.data}
      labels={state.customer_visit_distribution.labels}
    />
  );
};
