import {
  ClientNotificationPreferencesActionEnum,
  ClientNotificationPreferencesActions,
  IClientNotificationPreferencesAlert,
  IClientNotificationPreferencesForm,
} from "./NotificationPreferences.company.types";

// form
export const ClientNotificationPreferencesFormReducer = (
  state: IClientNotificationPreferencesForm,
  action: ClientNotificationPreferencesActions
) => {
  switch (action.type) {
    case ClientNotificationPreferencesActionEnum.SetFormData:
      return action.payload;

    // type
    case ClientNotificationPreferencesActionEnum.SetFormType:
      return {
        ...state,
        type: action.payload,
      };

    // email
    case ClientNotificationPreferencesActionEnum.SetFormEmailValue: {
      return {
        ...state,
        email: {
          ...state.email,
          value: action.payload,
        },
      };
    }

    // subscription threshold
    case ClientNotificationPreferencesActionEnum.SetFormSubscriptionThresholdValue:
      return {
        ...state,
        subscription_threshold: {
          ...state.subscription_threshold,
          value: action.payload,
        },
      };
    case ClientNotificationPreferencesActionEnum.SetFormSubscriptionThresholdError:
      return {
        ...state,
        subscription_threshold: {
          ...state.subscription_threshold,
          error: action.payload,
        },
      };

    // credit
    case ClientNotificationPreferencesActionEnum.SetFormCreditThresholdValue:
      return {
        ...state,
        credit_threshold: {
          ...state.credit_threshold,
          value: action.payload,
        },
      };
    case ClientNotificationPreferencesActionEnum.SetFormCreditThresholdError:
      return {
        ...state,
        credit_threshold: {
          ...state.credit_threshold,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export const ClientNotificationPreferencesAlertReducer = (
  state: IClientNotificationPreferencesAlert,
  action: ClientNotificationPreferencesActions
) => {
  switch (action.type) {
    case ClientNotificationPreferencesActionEnum.SetAlertData:
      return action.payload;

    default:
      return state;
  }
};
