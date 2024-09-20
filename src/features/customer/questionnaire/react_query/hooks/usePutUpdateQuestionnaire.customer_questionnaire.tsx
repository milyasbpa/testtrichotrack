import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  PostCreateCustomer200SuccessResponseInterface,
  PutUpdateCustomerQuestionnaireRequestInterface,
} from "src/core/models/api/customer";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import {
  GetQuestionnaireRequestInterface,
  GetQuestionnaireResponseInterface,
} from "src/core/models/api/configuration";
import { queryClient } from "src/core/utils/react_query";
import { CustomerQuestionnaireReactQueryKey } from "../keys";
import { CustomerQuestionnaireContext } from "../../context/Questionnaire.customer.context";
import { fetchPutUpdateCustomerQuestionnaire } from "src/core/services/customer";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { AppContext } from "src/core/modules/app/context";

export default function useUpdateConfirmationPutUpdateCustomerQuestionnaire() {
  const navigate = useNavigate();
  const { locale } = useParams();
  const { state: appState } = useContext(AppContext);
  const { state } = useContext(CustomerQuestionnaireContext);

  const questionnairePayload: GetQuestionnaireRequestInterface = {
    language: locale === "zh" ? "Chinese" : "English",
  };
  const questionnaire = queryClient.getQueryData(
    CustomerQuestionnaireReactQueryKey.GetQuestionnaire(questionnairePayload)
  ) as GetQuestionnaireResponseInterface;

  const mutation = useMutation<
    PostCreateCustomer200SuccessResponseInterface,
    AxiosError
  >({
    mutationKey:
      CustomerQuestionnaireReactQueryKey.PutUpdateCustomerQuestionnaire(),
    mutationFn: () => {
      const schema: PutUpdateCustomerQuestionnaireRequestInterface = {
        id: appState.user.customer?.id ?? -1,

        version_id: questionnaire.version_id,
        answers: {
          ...state.questionnaire.answers,
        },
      };

      return fetchPutUpdateCustomerQuestionnaire(schema);
    },
    retry: 0,

    onSuccess() {
      navigate(PrivateRouteURL.routeToCustomerHomeURL({ locale: locale }));
    },
  });

  return mutation;
}
