import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useMemo } from "react";
import { CustomerBusinessAnalyticsReactQueryKey } from "../keys";
import { fetchGetCustomerVisitStatistics } from "src/core/services/dashboard";
import {
  GetCustomerVisitRequestInterface,
  GetCustomerVisitResponseInterface,
} from "src/core/models/api/dashboard";
import { AxiosError } from "axios";
import moment from "moment";
import { CustomerBusinessAnalyticsContext } from "../../contexts/CustomerBusinessAnalytics.context";
import { CustomerBusinessAnalyticsActionEnum } from "../../contexts/CustomerBusinessAnalytics.types";

export const useCustomerBusinessAnalyticsGetCustomerVisitStatistics = () => {
  const { state, dispatch } = useContext(CustomerBusinessAnalyticsContext);

  const payload: GetCustomerVisitRequestInterface = useMemo(() => {
    return {
      start: moment(state.filter.start_date).format("YYYY-MM-DD"),
      end: moment(state.filter.end_date).format("YYYY-MM-DD"),
      resolution: state.filter.resolution.selected?.id ?? "Day",
      outlet:
        state.filter.outlets.selected?.id === "All Outlets"
          ? undefined
          : parseInt(state.filter.outlets.selected?.id ?? "2"),
    };
  }, [
    state.filter.start_date,
    state.filter.end_date,
    state.filter.resolution,
    state.filter.outlets.selected,
  ]);

  const query = useQuery<GetCustomerVisitResponseInterface, AxiosError>({
    queryKey:
      CustomerBusinessAnalyticsReactQueryKey.GetCustomerVisitStatistics(
        payload
      ),
    queryFn: () => {
      return fetchGetCustomerVisitStatistics(payload);
    },
    enabled:
      !!state.filter.resolution.selected && !!state.filter.outlets.selected,
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      dispatch({
        type: CustomerBusinessAnalyticsActionEnum.SetCustomerVisitData,
        payload: {
          ...state.customer_visit_distribution,
          data: data.map((item) => item[1]) as number[],
          labels: data.map((item) =>
            moment(String(item[0])).format("YYYY-MM-DD")
          ) as string[],
        },
      });
    }
  }, [query.data]);

  return query;
};
