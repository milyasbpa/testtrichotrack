import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { CustomerStatisticsReactQueryKey } from "../keys";
import { fetchGetRaceStatistics } from "src/core/services/dashboard";
import { GetRaceStatisticsResponseInterface } from "src/core/models/api/dashboard";
import { AxiosError } from "axios";
import { CustomerStatisticsContext } from "../../contexts/CustomerStatistics.context";
import { CustomerStatisticsActionEnum } from "../../contexts/CustomerStatistics.types";

export const useCustomerStatisticsGetRaceStatistics = () => {
  const { state, dispatch } = useContext(CustomerStatisticsContext);
  const query = useQuery<GetRaceStatisticsResponseInterface, AxiosError>({
    queryKey: CustomerStatisticsReactQueryKey.GetRaceStatistics(),
    queryFn: () => {
      return fetchGetRaceStatistics();
    },
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      dispatch({
        type: CustomerStatisticsActionEnum.SetRaceData,
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
