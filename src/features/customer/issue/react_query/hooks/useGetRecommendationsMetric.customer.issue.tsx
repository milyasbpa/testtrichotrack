import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GetRecommendationsMetricRequestInterface,
  GetRecommendationsMetricSuccessResponseInterface,
} from "src/core/models/api/recommendations";
import { AxiosError } from "axios";
import { fetchGetRecommendationsMetric } from "src/core/services/recommendation";
import { CustomerIssueActionEnum, CustomerIssueContext } from "../../context";
import { useParams } from "react-router-dom";
import { CustomerIssueReactQueryKey } from "../keys";

export const useCustomerIssueGetRecommendationsMetric = () => {
  const { locale, diagnosis } = useParams();
  const { state, dispatch } = useContext(CustomerIssueContext);

  const payload: GetRecommendationsMetricRequestInterface = useMemo(() => {
    return {
      params: {
        metric: diagnosis ?? "",
        language: locale === "zh" ? "Chinese" : "English",
        rating: state.overview.data?.rating ?? 0,
      },
    };
  }, [state.overview.data, diagnosis, locale]);

  const query = useQuery<
    GetRecommendationsMetricSuccessResponseInterface,
    AxiosError
  >({
    queryKey: CustomerIssueReactQueryKey.GetRecommendationsMetric(payload),

    queryFn: () => {
      return fetchGetRecommendationsMetric(payload);
    },
    enabled: !!state.overview.data && !!diagnosis,
    // enabled:
    //   state.recommendations.category.length > 0 &&
    //   state.recommendations.treatment_type.selected !== null,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: CustomerIssueActionEnum.SetRecommendationCarePlansValue,
        payload: data.careplans.map((item) => {
          return {
            id: item.id,
            name: item.name,
            image: item.photo,
            description:
              locale === "zh"
                ? item.description.length > 70
                  ? `${item.description.slice(0, 70)}...`
                  : item.description
                : item.description.length > 140
                ? `${item.description.slice(0, 140)}...`
                : item.description,
          };
        }),
      });
      dispatch({
        type: CustomerIssueActionEnum.SetRecommendationHomeCaresValue,
        payload: data.homecares.map((item) => {
          return {
            id: item.id,
            name: item.name,
            image: item.photo,
            description:
              locale === "zh"
                ? item.description.length > 70
                  ? `${item.description.slice(0, 70)}...`
                  : item.description
                : item.description.length > 140
                ? `${item.description.slice(0, 140)}...`
                : item.description,
          };
        }),
      });
    }
  }, [query.data, query.isFetching]);

  useEffect(() => {
    if (!!query.error && !query.isFetching) {
      const err = query.error;
      if (err.response?.status === 404) {
        dispatch({
          type: CustomerIssueActionEnum.SetRecommendationCarePlansValue,
          payload: [],
        });
        dispatch({
          type: CustomerIssueActionEnum.SetRecommendationHomeCaresValue,
          payload: [],
        });
      }
    }
  }, [query.error, query.isFetching]);

  return query;
};
