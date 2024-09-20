import { useContext } from "react";
import { CustomerRegistrationCardBusinessAnalytics } from "../../components/customer_registration_card/CustomerRegistrationCard.business_analytics";
import { CustomerBusinessAnalyticsContext } from "../../contexts/CustomerBusinessAnalytics.context";
import { useCustomerBusinessAnalyticsGetCustomerRegistrationStatistics } from "../../react_query/hooks/useGetCustomerRegistrationStatistics.business_analytics";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export const CustomerRegistrationBusinessAnalytics = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state } = useContext(CustomerBusinessAnalyticsContext);
  const { isFetching: isFetchingGetCustomerRegistrationStatistics } =
    useCustomerBusinessAnalyticsGetCustomerRegistrationStatistics();
  if (isFetchingGetCustomerRegistrationStatistics) {
    return null;
  }

  return (
    <CustomerRegistrationCardBusinessAnalytics
      title={dictionaries.customer_registration_card.title}
      data={state.customer_registration.data}
      labels={state.customer_registration.labels}
    />
  );
};
