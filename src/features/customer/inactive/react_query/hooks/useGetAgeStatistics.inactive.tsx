import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useMemo } from "react";

import { fetchGetAgeStatistics } from "src/core/services/dashboard";
import {
  GetAgeStatisticsRequestInterface,
  GetAgeStatisticsResponseInterface,
} from "src/core/models/api/dashboard";
import { AxiosError } from "axios";
import { createNewBarChartData, createNewBarChartLabels } from "../../utils";
import { CustomerInactiveContext } from "../../context/CustomerInactive.context";
import { CustomerInactiveActionEnum } from "../../context";
import { CustomerInactiveReactQueryKey } from "../keys";

export const useCustomerInactiveGetAgeStatistics = () => {
  const { state, dispatch } = useContext(CustomerInactiveContext);
  const payload: GetAgeStatisticsRequestInterface = useMemo(() => {
    return {
      gender:
        state.age.gender.selected?.id === "All Gender"
          ? undefined
          : state.age.gender.selected?.id,
      inactive_threshold: parseInt(
        state.threshold.visit_number.selected?.id ?? "1"
      ),
    };
  }, [state.age.gender.selected, state.threshold.visit_number.selected]);

  const query = useQuery<GetAgeStatisticsResponseInterface, AxiosError>({
    queryKey: CustomerInactiveReactQueryKey.GetAgeStatistics(payload),
    queryFn: () => {
      return fetchGetAgeStatistics(payload);
    },
    retry: 0,
    enabled:
      !!state.threshold.visit_number.selected &&
      !!state.age.gender.selected &&
      !!state.age.start_age.selected &&
      !!state.age.end_age.selected &&
      !!state.age.resolution.selected,
    // onError(err) {
    //   if (err.response?.statusText === "Unauthorized") {
    //     dispatchAuth({
    //       type: AuthActionEnum.SetSessionValue,
    //       payload: {
    //         ...authState.session,
    //         client: true,
    //         staff: false,
    //         customer: undefined,
    //       },
    //     });
    //   } else if (
    //     (
    //       err.response as { data: { detail: string } } | undefined
    //     )?.data.detail.toLowerCase() === "subscription expired"
    //   ) {
    //     navigate(getClientDeactivateAccountUrl(locale));
    //   } else if (
    //     (
    //       err.response as { data: { detail: string } } | undefined
    //     )?.data.detail.toLowerCase() === "credit points exhausted"
    //   ) {
    //     navigate(getClientDeactivateAccountUrl(locale));
    //   }
    // },
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      const rawData = data;
      const startAge = parseInt(state.age.start_age.selected?.id ?? "0");
      const endAge = parseInt(state.age.end_age.selected?.id ?? "0");
      const resolution = parseInt(state.age.resolution.selected?.name ?? "1");
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
        type: CustomerInactiveActionEnum.SetAgeData,
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
