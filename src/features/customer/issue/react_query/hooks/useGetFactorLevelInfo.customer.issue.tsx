import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchGetFactorLevelInfo } from "src/core/services/case";
import {
  GetFactorLevelInfoRequestInterface,
  GetFactorLevelInfoResponseInterface,
} from "src/core/models/api/cases";
import { AxiosError } from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { CustomerIssueReactQueryKey } from "../keys";
import { CustomerIssueActionEnum, CustomerIssueContext } from "../../context";
import { CustomerIssueRouterQuery } from "../../router/query";

// issue
export const useCustomerIssueGetFactorLevelInfo = () => {
  const { locale } = useParams();
  const [searchParams] = useSearchParams();
  const { state, dispatch } = useContext(CustomerIssueContext);

  const selectedFactor = searchParams.get(CustomerIssueRouterQuery.FACTOR);
  const payload: GetFactorLevelInfoRequestInterface = useMemo(() => {
    return {
      params: {
        language: locale === "zh" ? "Chinese" : "English",
        factor: selectedFactor ?? "",
        level: parseInt(state.level_info.selected?.id ?? "0"),
      },
    };
  }, [locale, selectedFactor, state.level_info.selected?.id]);

  const query = useQuery<GetFactorLevelInfoResponseInterface, AxiosError>({
    queryKey: CustomerIssueReactQueryKey.GetFactorLevelInfo(payload),
    queryFn: () => {
      return fetchGetFactorLevelInfo(payload);
    },
    enabled: !!selectedFactor && !!state.level_info.selected,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: CustomerIssueActionEnum.SetLevelInfoValue,
        payload: {
          ...state.level_info,
          data: data,
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
