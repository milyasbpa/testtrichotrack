import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NotificationPreferenceReactQueryKey } from "../keys/keys";
import { fetchPutNotificationPreference } from "src/core/services/billing";
import { useContext } from "react";
import { ClientNotificationPreferencesContext } from "../../contexts/NotificationPreferences.company.context";
import {
  PutNotificationPreference200SuccessResponseInterface,
  PutNotificationPreferenceRequestInterface,
} from "src/core/models/api/billings";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";

export const useNotificationPreferencesPutNotificationPreference = () => {
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);
  const { state } = useContext(ClientNotificationPreferencesContext);

  const mutation = useMutation<
    PutNotificationPreference200SuccessResponseInterface,
    AxiosError
  >({
    mutationKey:
      NotificationPreferenceReactQueryKey.PutNotificationPreference(),
    mutationFn: () => {
      const payload: PutNotificationPreferenceRequestInterface = {
        body: {
          email: state.form.email.value,
          min_credit: parseInt(state.form.credit_threshold.value),
          min_day: parseInt(state.form.subscription_threshold.value),
          mobile:
            state.form.phonenumber.value.length > 0
              ? `${state.form.phonenumber.value
                  .slice(0, 3)
                  .replace("+", "")}-${state.form.phonenumber.value.slice(3)}`
              : null,
        },
      };
      return fetchPutNotificationPreference(payload);
    },
    onSuccess() {
      dispatchApp({
        type: AppActionEnum.SetNotificationItems,
        payload: [
          ...appState.notification.items,
          {
            variant: "success",
            id: "SUCCESS_NOTIFICATION_PREFERENCE_UPDATED",
          },
        ],
      });
    },
  });

  return mutation;
};
