import { useContext } from "react";
import {
  useCustomerQuestionnaireGetEnglishQuestionnaire,
  useCustomerQuestionnaireGetQuestionnaire,
} from "../react_query/hooks/useGetQuestionnaire.questionnaire";
import { CustomerQuestionnaireContext } from "../context";
import { AppContainer } from "src/core/modules/app/container";
import { useCustomerQuestionnaireGetCustomerDetail } from "../react_query/hooks/useGetCustomerDetail.customer_questionnaire";
import { FormCustomerQuestionnaire } from "../fragments/form";
import { ConfirmationCustomerQuestionnaire } from "../fragments/confirmation";

export const CustomerQuestionnaireContainer = () => {
  const { isFetching: isFetchingGetQuestionnaire } =
    useCustomerQuestionnaireGetQuestionnaire();
  const { isFetching: isFetchingGetEnglishQuestionnaire } =
    useCustomerQuestionnaireGetEnglishQuestionnaire();
  const { isFetching: isFetchingGetCustomerDetail } =
    useCustomerQuestionnaireGetCustomerDetail();

  const { state } = useContext(CustomerQuestionnaireContext);

  const isFetching =
    isFetchingGetCustomerDetail ||
    isFetchingGetQuestionnaire ||
    isFetchingGetEnglishQuestionnaire;

  if (isFetching) {
    return <AppContainer />;
  }

  if (state.global.state === "questionnaire") {
    return <FormCustomerQuestionnaire />;
  }
  if (state.global.state === "update-confirmation") {
    return <ConfirmationCustomerQuestionnaire />;
  }

  return null;
};
