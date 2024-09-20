import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGetCases } from "src/core/services/case";
import {
  GetCasesRequestInterface,
  GetCasesResponseInterface,
} from "src/core/models/api/cases";
import { AxiosError } from "axios";

import { AppActionEnum, AppContext } from "../../context";
import { AppReactQueryKey } from "../keys";
import Cookies from "universal-cookie";

export const useAppGetCases = () => {
  const { state, dispatch } = useContext(AppContext);

  const cookie = new Cookies();

  const customerToken = cookie.get("customer-token");

  const payload: GetCasesRequestInterface = {
    limit: state.cases.data.limit,
    skip: state.cases.data.page * state.cases.data.limit,
  };

  const query = useQuery<GetCasesResponseInterface[], AxiosError>({
    queryKey: AppReactQueryKey.GetCases(payload),
    queryFn: () => {
      return fetchGetCases(payload);
    },

    enabled: !!customerToken,
  });
  useEffect(() => {
    if (query.isFetching || query.isRefetching) {
      dispatch({
        type: AppActionEnum.SetCasesData,
        payload: {
          ...state.cases,
          data: {
            ...state.cases.data,
            loading: query.isFetching || query.isRefetching,
          },
        },
      });
    }
  }, [query.isFetching, query.isRefetching]);

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      const rawData = [
        ...state.cases.data.data.map((item) => {
          return {
            id: parseInt(item.id),
            svc_time: item.svc_time,
          };
        }),
        ...data.map((item) => {
          return {
            id: item.id,
            svc_time: item.svc_time,
          };
        }),
      ];

      const sortedData = rawData.sort((a, b) => a.id - b.id);
      const formattedData = sortedData.map((item) => {
        return {
          id: String(item.id),
          svc_time: item.svc_time,
        };
      });

      dispatch({
        type: AppActionEnum.SetCasesData,
        payload: {
          ...state.cases,
          data: {
            ...state.cases.data,
            selected: !state.cases.data.selected
              ? formattedData[formattedData.length - 1] ?? null
              : state.cases.data.selected,
            data: formattedData,
            loading: false,
          },
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
