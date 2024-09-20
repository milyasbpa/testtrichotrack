import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GetOverallRecommendationsRequestInterface,
  GetOverallRecommendationsSuccessResponseInterface,
} from "src/core/models/api/recommendations";

import { fetchGetOverallRecommendations } from "src/core/services/recommendation";
import { AxiosError } from "axios";
import {
  CustomerRecommendationActionEnum,
  CustomerRecommendationContext,
} from "../../context";
import { useParams } from "react-router-dom";
import { CustomerRecommendationReactQueryKey } from "../keys";

export const useOverviewGetOverallRecommendation = () => {
  const { state, dispatch } = useContext(CustomerRecommendationContext);
  const { locale } = useParams();

  const payload: GetOverallRecommendationsRequestInterface = useMemo(() => {
    return {
      language: locale === "zh" ? "Chinese" : "English",
    };
  }, [locale]);

  const query = useQuery<
    GetOverallRecommendationsSuccessResponseInterface[],
    AxiosError
  >({
    queryKey:
      CustomerRecommendationReactQueryKey.GetOverallRecommendations(payload),
    queryFn: () => {
      return fetchGetOverallRecommendations(payload);
    },
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: CustomerRecommendationActionEnum.SetOverallData,
        payload: {
          ...state.overall,
          data: data.map((item) => {
            return {
              ...item,
              name: item.name,
              stages: item.stages.map((stageItem) => {
                return {
                  ...stageItem,
                  careplans: stageItem.careplans.map((carePlansItem) => {
                    return {
                      ...carePlansItem,

                      description:
                        locale === "zh"
                          ? carePlansItem.description.length > 67
                            ? `${carePlansItem.description.slice(0, 67)}...`
                            : carePlansItem.description
                          : carePlansItem.description.length > 140
                          ? `${carePlansItem.description.slice(0, 140)}...`
                          : carePlansItem.description,
                    };
                  }),
                  homecares: stageItem.homecares.map((homeCaresItem) => {
                    return {
                      ...homeCaresItem,
                      // description: `${homeCaresItem.description.slice(
                      //   0,
                      //   153
                      // )}...`,
                      description:
                        locale === "zh"
                          ? homeCaresItem.description.length > 67
                            ? `${homeCaresItem.description.slice(0, 67)}...`
                            : homeCaresItem.description
                          : homeCaresItem.description.length > 140
                          ? `${homeCaresItem.description.slice(0, 140)}...`
                          : homeCaresItem.description,
                    };
                  }),
                };
              }),
            };
          }),
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
