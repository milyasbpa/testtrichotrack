import { GetQuestionnaireRequestInterface } from "src/core/models/api/configuration";

export const CustomerRegistrationReactQueryKey = {
  PostVerifyMobile: () => [
    "CustomerRegistrationReactQueryKey.PostVerifyMobile",
  ],
  SetCustomerID: () => ["CustomerRegistrationReactQueryKey.SetCustomerID"],
  PostCreateCustomer: () => [
    "CustomerRegistrationReactQueryKey.PostCreateCustomer",
  ],
  PostLoginByCustomerID: () => [
    "CustomerRegistrationReactQueryKey.PostLoginByCustomerID",
  ],
  GetReadUser: () => ["CustomerRegistrationReactQueryKey.GetReadUser"],
  GetQuestionnaire: (payload?: GetQuestionnaireRequestInterface) => [
    "CustomerRegistrationReactQueryKey.GetQuestionnaire",
    [payload] as const,
  ],
  GetEnglishQuestionnaire: () => [
    "CustomerRegistrationReactQueryKey.GetEnglishQuestionnaire",
  ],
};
