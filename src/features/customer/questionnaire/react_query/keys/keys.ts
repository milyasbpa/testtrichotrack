import { GetQuestionnaireRequestInterface } from "src/core/models/api/configuration";

export const CustomerQuestionnaireReactQueryKey = {
  GetQuestionnaire: (payload?: GetQuestionnaireRequestInterface) => [
    "CustomerQuestionnaireReactQueryKey.GetQuestionnaire",
    [payload] as const,
  ],
  GetEnglishQuestionnaire: () => [
    "CustomerQuestionnaireReactQueryKey.GetEnglishQuestionnaire",
  ],
  GetCustomerDetail: () => [
    "CustomerQuestionnaireReactQueryKey.GetCustomerDetail",
  ],
  PutUpdateCustomerQuestionnaire: () => [
    "CustomerQuestionnaireReactQueryKey.PutUpdateCustomerQuestionnaire",
  ],
};
