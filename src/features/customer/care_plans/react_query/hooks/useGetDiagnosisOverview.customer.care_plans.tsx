import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  GetDiagnosisOverviewRequestInterface,
  GetDiagnosisOverviewResponseInterface,
} from "src/core/models/api/cases";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { fetchGetDiagnosisOverview } from "src/core/services/case";
import { CustomerCarePlansReactQueryKey } from "../keys";
import { AppContext } from "src/core/modules/app/context";
import {
  CustomerCarePlansActionEnum,
  CustomerCarePlansContext,
} from "../../context";

export const useCustomerCarePlansGetDiagnosisOverview = () => {
  const { locale, case_id, diagnosis_id } = useParams();
  const { state: appState } = useContext(AppContext);
  const { state, dispatch } = useContext(CustomerCarePlansContext);

  const payload = useMemo(() => {
    const result: GetDiagnosisOverviewRequestInterface = {
      path: {
        case_id: !case_id
          ? parseInt(
              appState.cases.data.data[appState.cases.data.data.length - 1]
                ?.id ?? "0"
            )
          : parseInt(case_id),
      },
      params: {
        language: locale === "zh" ? "Chinese" : "English",
      },
    };
    return result;
  }, [appState.cases.data.data.length, locale, case_id]);

  const query = useQuery<GetDiagnosisOverviewResponseInterface, AxiosError>({
    queryKey: CustomerCarePlansReactQueryKey.GetDiagnosisOverview(),
    queryFn: () => {
      return fetchGetDiagnosisOverview(payload);
    },

    enabled: !!appState.cases.data.data.length,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: CustomerCarePlansActionEnum.SetDiagnosisValue,
        payload: {
          ...state.diagnosis,
          overview: {
            ...state.diagnosis.overview,
            data: !diagnosis_id ? null : data[diagnosis_id],
          },
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
