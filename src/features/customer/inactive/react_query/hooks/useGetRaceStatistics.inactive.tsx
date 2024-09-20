import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { CustomerInactiveReactQueryKey } from "../keys";
import { fetchGetRaceStatistics } from "src/core/services/dashboard";
import {
  GetRaceStatisticsRequestInterface,
  GetRaceStatisticsResponseInterface,
} from "src/core/models/api/dashboard";
import { AxiosError } from "axios";
import { CustomerInactiveActionEnum } from "../../context/CustomerInactive.types";
import { CustomerInactiveContext } from "../../context/CustomerInactive.context";

export const useCustomerInactiveGetRaceStatistics = () => {
  const { state, dispatch } = useContext(CustomerInactiveContext);

  const payload: GetRaceStatisticsRequestInterface = {
    inactive_threshold: parseInt(
      state.threshold.visit_number.selected?.id ?? "1"
    ),
  };
  const query = useQuery<GetRaceStatisticsResponseInterface, AxiosError>({
    queryKey: CustomerInactiveReactQueryKey.GetRaceStatistics(payload),
    queryFn: () => {
      return fetchGetRaceStatistics(payload);
    },
    retry: 0,
    enabled: !!state.threshold.visit_number.selected,
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      dispatch({
        type: CustomerInactiveActionEnum.SetRaceData,
        payload: {
          ...state.race,
          labels: Object.keys(data).map((key) => key),
          data: Object.keys(data).map((key) => data[key]),
        },
      });
    }
  }, [query.data]);

  return query;
};
