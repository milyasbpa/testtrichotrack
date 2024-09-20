import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { CustomerIssueActionEnum, CustomerIssueContext } from "../../context";
import {
  GetDiagnosisOverviewRequestInterface,
  GetDiagnosisOverviewResponseInterface,
} from "src/core/models/api/cases";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { fetchGetDiagnosisOverview } from "src/core/services/case";
import { CustomerIssueReactQueryKey } from "../keys";

export const useCustomerIssueGetDiagnosisOverview = () => {
  const { locale, diagnosis, case_id } = useParams();

  const { state, dispatch } = useContext(CustomerIssueContext);

  const payload = useMemo(() => {
    const result: GetDiagnosisOverviewRequestInterface = {
      path: {
        case_id: parseInt(case_id ?? "0"),
      },
      params: {
        language: locale === "zh" ? "Chinese" : "English",
      },
    };
    return result;
  }, [case_id, locale]);

  const query = useQuery<GetDiagnosisOverviewResponseInterface, AxiosError>({
    queryKey: CustomerIssueReactQueryKey.GetDiagnosisOverview(payload),
    queryFn: () => {
      return fetchGetDiagnosisOverview(payload);
    },
    retry: 0,
    enabled: !!case_id,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: CustomerIssueActionEnum.SetOverviewValue,
        payload: {
          ...state.overview,
          data: !diagnosis ? null : data[diagnosis],
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
