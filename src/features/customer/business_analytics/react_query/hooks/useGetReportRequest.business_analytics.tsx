import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useMemo } from "react";
import { CustomerBusinessAnalyticsReactQueryKey } from "../keys";
import { fetchGetReportRequest } from "src/core/services/dashboard";
import {
  GetReportRequestRequestInterface,
  GetReportRequestResponseInterface,
} from "src/core/models/api/dashboard";
import { AxiosError } from "axios";
import moment from "moment";
import { CustomerBusinessAnalyticsContext } from "../../contexts/CustomerBusinessAnalytics.context";
import { CustomerBusinessAnalyticsActionEnum } from "../../contexts/CustomerBusinessAnalytics.types";

export const useCustomerBusinessAnalyticsGetReportRequestStatistics = () => {
  const { state, dispatch } = useContext(CustomerBusinessAnalyticsContext);

  const payload: GetReportRequestRequestInterface = useMemo(() => {
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

  const query = useQuery<GetReportRequestResponseInterface, AxiosError>({
    queryKey:
      CustomerBusinessAnalyticsReactQueryKey.GetReportRequestStatistics(
        payload
      ),
    queryFn: () => {
      return fetchGetReportRequest(payload);
    },
    enabled:
      !!state.filter.resolution.selected && !!state.filter.outlets.selected,
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      dispatch({
        type: CustomerBusinessAnalyticsActionEnum.SetReportRequestData,
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
