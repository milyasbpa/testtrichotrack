import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { CustomerBusinessAnalyticsReactQueryKey } from "../keys";
import { fetchGetVisitStatistics } from "src/core/services/dashboard";
import { GetVisitStatisticsResponseInterface } from "src/core/models/api/dashboard";
import { AxiosError } from "axios";
import { CustomerBusinessAnalyticsContext } from "../../contexts/CustomerBusinessAnalytics.context";
import { CustomerBusinessAnalyticsActionEnum } from "../../contexts/CustomerBusinessAnalytics.types";

export const useCustomerBusinessAnalyticsGetVisitStatistics = () => {
  const { state, dispatch } = useContext(CustomerBusinessAnalyticsContext);

  const query = useQuery<GetVisitStatisticsResponseInterface, AxiosError>({
    queryKey: CustomerBusinessAnalyticsReactQueryKey.GetVisitStatistics(),
    queryFn: () => {
      return fetchGetVisitStatistics();
    },
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      dispatch({
        type: CustomerBusinessAnalyticsActionEnum.SetCustomerVisitDistributionData,
        payload: {
          ...state.customer_visit_distribution,
          data: data.map((item) => item[1]) as number[],
          labels: data.map((item) => item[0]) as string[],
        },
      });
    }
  }, [query.data]);

  return query;
};
