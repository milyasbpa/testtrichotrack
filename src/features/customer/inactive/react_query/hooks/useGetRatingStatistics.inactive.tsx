import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useMemo } from "react";
import { CustomerInactiveReactQueryKey } from "../keys";
import { fetchGetRatingStatistics } from "src/core/services/dashboard";
import {
  GetRatingStatisticsRequestInterface,
  GetRatingStatisticsResponseInterface,
} from "src/core/models/api/dashboard";
import { AxiosError } from "axios";
import { insightBarChartDataFormatter } from "../../utils";
import { CustomerInactiveContext } from "../../context/CustomerInactive.context";
import { CustomerInactiveActionEnum } from "../../context/CustomerInactive.types";

export const useCustomerInactiveGetRatingStatistic = () => {
  const { state, dispatch } = useContext(CustomerInactiveContext);
  const payload: GetRatingStatisticsRequestInterface = useMemo(() => {
    return {
      min_age: state.rating.filter.start_age.selected?.id ?? "30",
      max_age: state.rating.filter.end_age.selected?.id ?? "40",
      gender:
        state.rating.filter.gender.selected?.id === "All Gender"
          ? null
          : state.rating.filter.gender.selected?.id ?? null,
      race:
        state.rating.filter.race.selected?.id === "All Race"
          ? null
          : state.rating.filter.race.selected?.id ?? null,
      inactive_threshold: parseInt(
        state.threshold.visit_number.selected?.id ?? "1"
      ),
    };
  }, [
    state.rating.filter.start_age.selected,
    state.rating.filter.end_age.selected,
    state.rating.filter.gender.selected,
    state.rating.filter.race.selected,
    state.threshold.visit_number.selected,
  ]);

  const query = useQuery<GetRatingStatisticsResponseInterface, AxiosError>({
    queryKey: CustomerInactiveReactQueryKey.GetRatingStatistics(payload),
    queryFn: () => {
      return fetchGetRatingStatistics(payload);
    },
    retry: 0,
    enabled:
      !!state.rating.filter.start_age &&
      !!state.rating.filter.end_age &&
      !!state.rating.filter.race &&
      !!state.rating.filter.resolution &&
      !!state.rating.filter.gender,
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      dispatch({
        type: CustomerInactiveActionEnum.SetRatingChartData,
        payload: Object.keys(data).reduce((acc, key) => {
          return {
            ...acc,
            [key]: {
              raw_data: data[key],
              data: insightBarChartDataFormatter(
                data[key],
                eval(state.rating.filter.resolution.selected?.id ?? ""),
                5
              ),
              labels: Array.from({ length: 5 }, (_, i) => `${i}-${i + 1}`),
            },
          };
        }, {}),
      });
    }
  }, [query.data]);

  return query;
};
