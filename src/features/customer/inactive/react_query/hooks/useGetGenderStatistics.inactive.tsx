import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { CustomerInactiveReactQueryKey } from "../keys";
import { fetchGetGenderStatistics } from "src/core/services/dashboard";
import {
  GetGenderStatisticsRequestInterface,
  GetGenderStatisticsResponseInterface,
} from "src/core/models/api/dashboard";
import { AxiosError } from "axios";
import { CustomerInactiveActionEnum } from "../../context/CustomerInactive.types";
import { CustomerInactiveContext } from "../../context/CustomerInactive.context";

export const useCustomerInactiveGetGenderStatistics = () => {
  const { state, dispatch } = useContext(CustomerInactiveContext);

  const payload: GetGenderStatisticsRequestInterface = {
    inactive_threshold: parseInt(
      state.threshold.visit_number.selected?.id ?? "1"
    ),
  };
  const query = useQuery<GetGenderStatisticsResponseInterface, AxiosError>({
    queryKey: CustomerInactiveReactQueryKey.GetGenderStatistics(payload),
    queryFn: () => {
      return fetchGetGenderStatistics(payload);
    },
    retry: 0,
    enabled: !!state.threshold.visit_number.selected,
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      dispatch({
        type: CustomerInactiveActionEnum.SetGenderData,
        payload: {
          ...state.gender,
          labels: Object.keys(data).map((key) => key),
          data: Object.keys(data).map((key) => data[key]),
        },
      });
    }
  }, [query.data]);

  return query;
};
