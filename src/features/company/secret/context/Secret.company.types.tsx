type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface SecretCompanyInitialStateType {
  form: SecretCompanyForm;
}

export interface SecretCompanyForm {
  secret: {
    value: string;
    show: boolean;
  };
}

export enum SecretCompanyActionEnum {
  // form
  SetSecretValue = "SetSecretValue",
  SetSecretView = "SetSecretView",
}

// Action Collection Types
export type SecretCompanyActions = SecretCompanyFormActions;

// Action Collection Types consist of:

// Form
type SecretCompanyFormPayload = {
  [SecretCompanyActionEnum.SetSecretValue]: string;
  [SecretCompanyActionEnum.SetSecretView]: undefined;
};

export type SecretCompanyFormActions =
  ActionMap<SecretCompanyFormPayload>[keyof ActionMap<SecretCompanyFormPayload>];
