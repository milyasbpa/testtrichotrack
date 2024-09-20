import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppContext, AppActionEnum } from "../../context";
import { AppReactQueryKey } from "../keys";
import {
  GetDiagnosisScreeningsRequestInterface,
  GetDiagnosisScreeningsResponseInterface,
} from "src/core/models/api/cases";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { fetchGetDiagnosisScreenings } from "src/core/services/case";

export const useAppGetDiagnosisScreenings = () => {
  const { locale } = useParams();

  const { state, dispatch } = useContext(AppContext);

  const payload = useMemo(() => {
    const result: GetDiagnosisScreeningsRequestInterface = {
      path: {
        case_id: parseInt(state.cases.data.selected?.id ?? "0"),
      },
      params: {
        language: locale === "zh" ? "Chinese" : "English",
      },
    };
    return result;
  }, [state.cases.data.selected, locale]);

  const query = useQuery<GetDiagnosisScreeningsResponseInterface, AxiosError>({
    queryKey: AppReactQueryKey.GetDiagnosisScreenings(payload),
    queryFn: () => {
      return fetchGetDiagnosisScreenings(payload);
    },
    retry: 0,
    enabled: !!state.cases.data.selected,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: AppActionEnum.SetScreeningDiagnosisCasesData,
        payload: {
          ...state.cases.diagnosis.screening,
          data: data,
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
