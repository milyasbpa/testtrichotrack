import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useMemo } from "react";
import { fetchGetRatingStatistics } from "src/core/services/dashboard";
import {
  GetRatingStatisticsRequestInterface,
  GetRatingStatisticsResponseInterface,
} from "src/core/models/api/dashboard";
import { AxiosError } from "axios";
import { CustomerInsightContext } from "../../context/CustomerInsight.context";
import { CustomerInsightActionEnum } from "../../context/CustomerInsight.types";
import { insightBarChartDataFormatter } from "../../utils";
import { CustomerInsightReactQueryKey } from "../keys/keys";

export const useCustomerInsightGetRatingStatistic = () => {
  const { state, dispatch } = useContext(CustomerInsightContext);
  const payload: GetRatingStatisticsRequestInterface = useMemo(() => {
    return {
      min_age: state.filter.start_age.selected?.id ?? "30",
      max_age: state.filter.end_age.selected?.id ?? "40",
      gender:
        state.filter.gender.selected?.id === "All Gender"
          ? null
          : state.filter.gender.selected?.id ?? null,
      race:
        state.filter.race.selected?.id === "All Race"
          ? null
          : state.filter.race.selected?.id ?? null,
    };
  }, [
    state.filter.start_age.selected,
    state.filter.end_age.selected,
    state.filter.gender.selected,
    state.filter.race.selected,
  ]);

  const query = useQuery<GetRatingStatisticsResponseInterface, AxiosError>({
    queryKey: CustomerInsightReactQueryKey.GetRatingStatistics(payload),
    queryFn: () => {
      return fetchGetRatingStatistics(payload);
    },
    enabled:
      state.filter.gender !== null &&
      state.filter.race !== null &&
      state.filter.resolution !== null &&
      state.filter.start_age !== null &&
      state.filter.end_age !== null,
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      dispatch({
        type: CustomerInsightActionEnum.SetRatingData,
        payload: Object.keys(data).reduce((acc, key) => {
          return {
            ...acc,
            [key]: {
              raw_data: data[key],
              data: insightBarChartDataFormatter(
                data[key],
                eval(state.filter.resolution.selected?.id ?? ""),
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
