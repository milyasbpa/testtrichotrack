import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppContext, AppActionEnum } from "../../context";
import { AppReactQueryKey } from "../keys";
import {
  GetDiagnosisTrendsRequestInterface,
  GetDiagnosisTrendsResponseInterface,
} from "src/core/models/api/cases";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { fetchGetDiagnosisTrends } from "src/core/services/case";

export const useAppGetDiagnosisTrends = () => {
  const { locale } = useParams();

  const { state, dispatch } = useContext(AppContext);

  const payload = useMemo(() => {
    const result: GetDiagnosisTrendsRequestInterface = {
      path: {
        case_id: parseInt(state.cases.data.selected?.id ?? "0"),
      },
      params: {
        language: locale === "zh" ? "Chinese" : "English",
      },
    };
    return result;
  }, [state.cases.data.selected, locale]);

  const query = useQuery<GetDiagnosisTrendsResponseInterface, AxiosError>({
    queryKey: AppReactQueryKey.GetDiagnosisTrends(payload),
    queryFn: () => {
      return fetchGetDiagnosisTrends(payload);
    },
    enabled: !!state.cases.data.selected,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: AppActionEnum.SetTrendsDiagnosisCasesData,
        payload: {
          ...state.cases.diagnosis.trends,
          data: data.trends,
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
