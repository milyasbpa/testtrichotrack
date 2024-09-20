import { useContext } from "react";
import { CustomerBusinessAnalyticsContext } from "../../contexts/CustomerBusinessAnalytics.context";
import { useCustomerBusinessAnalyticsGetReportRequestStatistics } from "../../react_query/hooks/useGetReportRequest.business_analytics";
import { ReportRequestCardBusinessAnalytics } from "../../components/report_request_card/ReportRequestCard.business_analytics";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export const ReportRequestBusinessAnalytics = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state } = useContext(CustomerBusinessAnalyticsContext);
  const { isFetching: isFetchingGetReportRequestStatistics } =
    useCustomerBusinessAnalyticsGetReportRequestStatistics();
  if (isFetchingGetReportRequestStatistics) {
    return null;
  }

  return (
    <ReportRequestCardBusinessAnalytics
      title={dictionaries.report_request_card.title}
      data={state.report_request.data}
      labels={state.report_request.labels}
    />
  );
};
