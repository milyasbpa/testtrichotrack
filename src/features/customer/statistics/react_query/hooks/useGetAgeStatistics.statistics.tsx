import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useMemo } from "react";
import { CustomerStatisticsReactQueryKey } from "../keys";
import { fetchGetAgeStatistics } from "src/core/services/dashboard";
import {
  GetAgeStatisticsRequestInterface,
  GetAgeStatisticsResponseInterface,
} from "src/core/models/api/dashboard";
import { AxiosError } from "axios";
import { CustomerStatisticsContext } from "src/features/customer/statistics/contexts/CustomerStatistics.context";
import { CustomerStatisticsActionEnum } from "src/features/customer/statistics/contexts/CustomerStatistics.types";
import { createNewBarChartData, createNewBarChartLabels } from "../../utils";

export const useCustomerStatisticsGetAgeStatistics = () => {
  const { state, dispatch } = useContext(CustomerStatisticsContext);
  const payload: GetAgeStatisticsRequestInterface = useMemo(() => {
    return {
      gender:
        state.age.gender.selected?.id === "All Gender"
          ? undefined
          : state.age.gender.selected?.id,
    };
  }, [state.age.gender.selected?.id]);

  const query = useQuery<GetAgeStatisticsResponseInterface, AxiosError>({
    queryKey: CustomerStatisticsReactQueryKey.GetAgeStatistics(payload),
    queryFn: () => {
      return fetchGetAgeStatistics(payload);
    },
    enabled: !!state.age.gender.selected,
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      const rawData = data;
      const startAge = parseInt(state.age.start_age.selected?.id ?? "1");
      const endAge = parseInt(state.age.end_age.selected?.id ?? "100");
      const resolution = parseInt(state.age.resolution.selected?.id ?? "10");
      const startNumber = 1;
      const dataLength = endAge - startAge + startNumber;

      const availableSlot =
        dataLength % resolution === 0
          ? dataLength / resolution
          : Math.ceil(dataLength / resolution);

      const finalData = createNewBarChartData(
        rawData,
        availableSlot,
        resolution,
        startAge,
        endAge
      );

      const finalLabels = createNewBarChartLabels(
        rawData,
        availableSlot,
        resolution,
        startAge,
        endAge
      );

      dispatch({
        type: CustomerStatisticsActionEnum.SetAgeData,
        payload: {
          ...state.age,
          raw_data: data,
          labels: finalLabels,
          data: finalData,
          available_slot: availableSlot,
        },
      });
    }
  }, [query.data]);

  return query;
};
