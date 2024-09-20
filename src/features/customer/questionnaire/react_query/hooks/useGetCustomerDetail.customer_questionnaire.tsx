import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchGetCustomerDetail } from "src/core/services/customer";
import {
  GetCustomerDetailRequestInterface,
  GetCustomerDetailSuccessResponseInterface,
} from "src/core/models/api/customer";
import { AxiosError, AxiosResponse } from "axios";
import {
  GetQuestionnaireRequestInterface,
  GetQuestionnaireResponseInterface,
} from "src/core/models/api/configuration";
import { useParams } from "react-router-dom";
import { queryClient } from "src/core/utils/react_query";
import { CustomerQuestionnaireContext } from "../../context/Questionnaire.customer.context";

import { CustomerQuestionnaireReactQueryKey } from "../keys";
import { CustomerQuestionnaireActionEnum } from "../../context";
import { AppContext } from "src/core/modules/app/context";

export const useCustomerQuestionnaireGetCustomerDetail = () => {
  const { state: appState } = useContext(AppContext);
  const { dispatch } = useContext(CustomerQuestionnaireContext);

  const { locale } = useParams();
  const questionnairePayload: GetQuestionnaireRequestInterface = {
    language: locale === "zh" ? "Chinese" : "English",
  };
  const questionnaire = queryClient.getQueryData(
    CustomerQuestionnaireReactQueryKey.GetQuestionnaire(questionnairePayload)
  ) as GetQuestionnaireResponseInterface;

  const payload: GetCustomerDetailRequestInterface = useMemo(() => {
    return {
      customer_id: appState.user.customer?.id ?? -1,
    };
  }, [appState.user.customer?.id]);

  const query = useQuery<
    GetCustomerDetailSuccessResponseInterface,
    AxiosError<AxiosResponse>
  >({
    queryKey: CustomerQuestionnaireReactQueryKey.GetCustomerDetail(),
    queryFn: () => {
      return fetchGetCustomerDetail(payload);
    },
    retry: 0,
    enabled: !!appState.user.customer?.id,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: CustomerQuestionnaireActionEnum.SetQuestionnaireGender,
        payload: data.gender,
      });

      if (
        data.questionnaire !== null &&
        data.questionnaire.answers !== undefined &&
        questionnaire !== undefined &&
        questionnaire.version_id === data.questionnaire?.version_id
      ) {
        dispatch({
          type: CustomerQuestionnaireActionEnum.SetQuestionnaireAnswers,
          payload: data.questionnaire.answers,
        });
      }
    }
  }, [query.data, query.isFetching]);

  return query;
};
