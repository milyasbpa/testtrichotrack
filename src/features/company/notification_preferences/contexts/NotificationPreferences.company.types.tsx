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
export interface ClientNotificationPreferencesInitialStateType {
  alert: IClientNotificationPreferencesAlert;
  form: IClientNotificationPreferencesForm;
}

// State Collection Types consist of:
export interface IClientNotificationPreferencesAlert {
  open: boolean;
  type: string;
  variant: "success" | "danger" | "warning" | "info";
}

// State Collection Types consist of:
export interface IClientNotificationPreferencesForm {
  type: string | null;
  email: {
    value: string;
  };
  phonenumber: {
    value: string;
  };

  subscription_threshold: {
    value: string;
    error: {
      code: string;
      condition: boolean;
    };
  };

  credit_threshold: {
    value: string;
    error: {
      code: string;
      condition: boolean;
    };
  };

  confirmation_modal: {
    open: boolean;
  };
}

export enum ClientNotificationPreferencesActionEnum {
  // alert
  SetAlertData = "SetAlertData",

  // form
  SetFormData = "SetFormData",
  SetFormType = "SetFormType",
  SetFormEmailValue = "SetFormEmailValue",

  SetFormSubscriptionThresholdValue = "SetFormSubscriptionThresholdValue",
  SetFormSubscriptionThresholdError = "SetFormSubscriptionThresholdError",

  SetFormCreditThresholdValue = "SetFormCreditThresholdValue",
  SetFormCreditThresholdError = "SetFormCreditThresholdError",

  OpenConfirmationModal = "OpenConfirmationModal",
  CloseConfirmationModal = "CloseConfirmationModal",

  SetProfileAlertValue = "SetProfileAlertValue",
}

// Action Collection Types
export type ClientNotificationPreferencesActions =
  | ClientNotificationPreferencesFormActions
  | ClientNotificationPreferencesAlertActions;

// Action Collection Types consist of:
// form
type ClientNotificationPreferencesFormPayload = {
  [ClientNotificationPreferencesActionEnum.SetFormData]: IClientNotificationPreferencesForm;
  // type
  [ClientNotificationPreferencesActionEnum.SetFormType]: IClientNotificationPreferencesForm["type"];
  // email
  [ClientNotificationPreferencesActionEnum.SetFormEmailValue]: IClientNotificationPreferencesForm["email"]["value"];

  // subscription threshold
  [ClientNotificationPreferencesActionEnum.SetFormSubscriptionThresholdValue]: IClientNotificationPreferencesForm["subscription_threshold"]["value"];
  [ClientNotificationPreferencesActionEnum.SetFormSubscriptionThresholdError]: IClientNotificationPreferencesForm["subscription_threshold"]["error"];

  // credit
  [ClientNotificationPreferencesActionEnum.SetFormCreditThresholdValue]: IClientNotificationPreferencesForm["credit_threshold"]["value"];
  [ClientNotificationPreferencesActionEnum.SetFormCreditThresholdError]: IClientNotificationPreferencesForm["credit_threshold"]["error"];
};

export type ClientNotificationPreferencesFormActions =
  ActionMap<ClientNotificationPreferencesFormPayload>[keyof ActionMap<ClientNotificationPreferencesFormPayload>];

// alert
export type ClientNotificationPreferencesAlertActions =
  ActionMap<ClientNotificationPreferencesAlertPayload>[keyof ActionMap<ClientNotificationPreferencesAlertPayload>];

type ClientNotificationPreferencesAlertPayload = {
  [ClientNotificationPreferencesActionEnum.SetAlertData]: IClientNotificationPreferencesAlert;
};
