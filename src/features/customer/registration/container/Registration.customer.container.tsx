import { useContext } from "react";
import {
  useRegistrationGetEnglishQuestionnaire,
  useRegistrationGetQuestionnaire,
} from "../react_query/react_query/useGetQuestionnaire.registration";
import { CustomerRegistrationContext } from "../context";
import { RequiredCustomerRegistration } from "../fragments/required";
import { ProfilePictureCustomerRegistration } from "../fragments/profile_picture";
import { ProfilePicturePreviewCustomerRegistration } from "../fragments/profile_picture_preview";
import { AdditionalCustomerRegistration } from "../fragments/additional";
import { QuestionnaireCustomerRegistration } from "../fragments/questionnaire";
import { AgreementCustomerRegistration } from "../fragments/agreement";
import { MaximumLimitReachedCustomerRegistration } from "../fragments/maximum_limit_reached";
import { InsufficientCreditBalanceCustomerRegistration } from "../fragments/insufficient_credit_balance";

export const CustomerRegistrationContainer = () => {
  const { isLoading: isLoadingGetQuestionnaire } =
    useRegistrationGetQuestionnaire();
  const { isLoading: isLoadingEnglishQuestionnaire } =
    useRegistrationGetEnglishQuestionnaire();
  const { state } = useContext(CustomerRegistrationContext);
  const isLoading = isLoadingGetQuestionnaire || isLoadingEnglishQuestionnaire;
  if (isLoading) {
    return null;
  }

  if (state.global.state === "required") {
    return <RequiredCustomerRegistration />;
  }
  if (state.global.state === "profile-picture") {
    return <ProfilePictureCustomerRegistration />;
  }

  if (state.global.state === "profile-picture-preview") {
    return <ProfilePicturePreviewCustomerRegistration />;
  }
  if (state.global.state === "additional") {
    return <AdditionalCustomerRegistration />;
  }
  if (state.global.state === "questionnaire") {
    return <QuestionnaireCustomerRegistration />;
  }
  if (state.global.state === "agreement") {
    return <AgreementCustomerRegistration />;
  }

  if (state.global.state === "maximum_limit_reached") {
    return <MaximumLimitReachedCustomerRegistration />;
  }

  if (state.global.state === "insufficient_credit_balance") {
    return <InsufficientCreditBalanceCustomerRegistration />;
  }

  return null;
};
