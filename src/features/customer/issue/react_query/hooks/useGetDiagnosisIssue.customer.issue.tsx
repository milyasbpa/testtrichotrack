import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchGetDiagnosisIssue } from "src/core/services/case";
import {
  GetDiagnosisIssueRequestInterface,
  GetDiagnosisIssueResponseInterface,
} from "src/core/models/api/cases";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { CustomerIssueReactQueryKey } from "../keys";
import { CustomerIssueActionEnum, CustomerIssueContext } from "../../context";

// issue
export const useCustomerIssueGetDiagnosisIssue = () => {
  const { locale, diagnosis } = useParams();

  const { dispatch } = useContext(CustomerIssueContext);

  const payload: GetDiagnosisIssueRequestInterface = useMemo(() => {
    return {
      params: {
        language: locale === "zh" ? "Chinese" : "English",
        metric: diagnosis ?? "",
      },
    };
  }, [locale, diagnosis]);

  const query = useQuery<GetDiagnosisIssueResponseInterface, AxiosError>({
    queryKey: CustomerIssueReactQueryKey.GetDiagnosisIssue(payload),
    queryFn: () => {
      return fetchGetDiagnosisIssue(payload);
    },
    enabled: !!diagnosis,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: CustomerIssueActionEnum.SetDetailValue,
        payload: data,
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
