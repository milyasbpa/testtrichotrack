import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { CustomerStatisticsReactQueryKey } from "../keys";
import { fetchGetGenderStatistics } from "src/core/services/dashboard";
import { GetGenderStatisticsResponseInterface } from "src/core/models/api/dashboard";
import { AxiosError } from "axios";
import { CustomerStatisticsContext } from "../../contexts/CustomerStatistics.context";
import { CustomerStatisticsActionEnum } from "../../contexts/CustomerStatistics.types";

export const useCustomerStatisticsGetGenderStatistics = () => {
  const { state, dispatch } = useContext(CustomerStatisticsContext);

  const query = useQuery<GetGenderStatisticsResponseInterface, AxiosError>({
    queryKey: CustomerStatisticsReactQueryKey.GetGenderStatistics(),
    queryFn: () => {
      return fetchGetGenderStatistics();
    },
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      dispatch({
        type: CustomerStatisticsActionEnum.SetGenderData,
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
