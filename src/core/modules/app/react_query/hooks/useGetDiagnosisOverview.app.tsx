import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppContext, AppActionEnum } from "../../context";
import { AppReactQueryKey } from "../keys";
import {
  GetDiagnosisOverviewRequestInterface,
  GetDiagnosisOverviewResponseInterface,
} from "src/core/models/api/cases";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { fetchGetDiagnosisOverview } from "src/core/services/case";

export const useAppGetDiagnosisOverview = () => {
  const { locale } = useParams();

  const { state, dispatch } = useContext(AppContext);

  const payload = useMemo(() => {
    const result: GetDiagnosisOverviewRequestInterface = {
      path: {
        case_id: parseInt(state.cases.data.selected?.id ?? "0"),
      },
      params: {
        language: locale === "zh" ? "Chinese" : "English",
      },
    };
    return result;
  }, [state.cases.data.selected, locale]);

  const query = useQuery<GetDiagnosisOverviewResponseInterface, AxiosError>({
    queryKey: AppReactQueryKey.GetDiagnosisOverview(payload),
    queryFn: () => {
      return fetchGetDiagnosisOverview(payload);
    },
    retry: 0,
    enabled: !!state.cases.data.selected,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: AppActionEnum.SetOverviewDiagnosisCasesData,
        payload: {
          ...state.cases.diagnosis.overview,
          data: data,
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
