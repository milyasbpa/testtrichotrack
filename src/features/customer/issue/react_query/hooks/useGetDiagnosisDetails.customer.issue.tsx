import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GetDiagnosisDetailsRequestInterface,
  GetDiagnosisDetailsResponseInterface,
} from "src/core/models/api/cases";
import { fetchGetDiagnosisDetails } from "src/core/services/case";
import { CustomerIssueReactQueryKey } from "../keys";
import { CustomerIssueActionEnum, CustomerIssueContext } from "../../context";
import { useParams } from "react-router-dom";

// issue
export const useCustomerIssueGetDiagnosisDetails = () => {
  const { locale, diagnosis, case_id } = useParams();
  const { state, dispatch } = useContext(CustomerIssueContext);

  const payload: GetDiagnosisDetailsRequestInterface = useMemo(() => {
    return {
      path: {
        case_id: parseInt(case_id ?? "0"),
      },
      params: {
        metric: diagnosis ?? "",
        language: locale === "zh" ? "Chinese" : "English",
      },
    };
  }, [diagnosis, case_id, locale]);

  const query = useQuery<GetDiagnosisDetailsResponseInterface>({
    queryKey: CustomerIssueReactQueryKey.GetDiagnosisDetails(payload),
    queryFn: () => {
      return fetchGetDiagnosisDetails(payload);
    },
    enabled: !!state.overview.data,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: CustomerIssueActionEnum.SetRatingValue,
        payload: {
          ...state.rating,
          data: data,
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
