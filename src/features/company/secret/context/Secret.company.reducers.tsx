import {
  SecretCompanyForm,
  SecretCompanyActionEnum,
  SecretCompanyActions,
} from "./Secret.company.types";

// Form
export const SecretCompanyFormReducer = (
  state: SecretCompanyForm,
  action: SecretCompanyActions
) => {
  switch (action.type) {
    case SecretCompanyActionEnum.SetSecretValue:
      return {
        ...state,
        secret: {
          ...state.secret,
          value: action.payload,
        },
      };
    case SecretCompanyActionEnum.SetSecretView:
      return {
        ...state,
        secret: {
          ...state.secret,
          show: !state.secret.show,
        },
      };

    default:
      return state;
  }
};
