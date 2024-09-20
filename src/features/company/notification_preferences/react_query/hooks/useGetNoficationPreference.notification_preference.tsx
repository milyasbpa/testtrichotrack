import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NotificationPreferenceReactQueryKey } from "../keys/keys";
import { fetchGetNotificationPreference } from "src/core/services/billing";
import { useContext, useEffect } from "react";
import { ClientNotificationPreferencesContext } from "../../contexts/NotificationPreferences.company.context";
import { GetNotificationPreferenceResponseInterface } from "src/core/models/api/billings";
import { ClientNotificationPreferencesActionEnum } from "../../contexts/NotificationPreferences.company.types";
import { useParams } from "react-router-dom";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const useNotificationPreferencesGetNotificationPreference = () => {
  const { state, dispatch } = useContext(ClientNotificationPreferencesContext);
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);

  const query = useQuery<
    GetNotificationPreferenceResponseInterface,
    AxiosError
  >({
    queryKey: NotificationPreferenceReactQueryKey.GetNotificationPreference(),
    queryFn: () => {
      return fetchGetNotificationPreference();
    },
    enabled: !!state.form.type,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: ClientNotificationPreferencesActionEnum.SetFormData,
        payload: {
          ...state.form,
          email: {
            ...state.form.email,
            value: data.email,
          },
          credit_threshold: {
            ...state.form.credit_threshold,
            value: data.min_credit.toString(),
          },
          subscription_threshold: {
            ...state.form.subscription_threshold,
            value: data.min_day.toString(),
          },
          phonenumber: !!data.mobile
            ? {
                ...state.form.phonenumber,
                value:
                  data.mobile === undefined
                    ? appDictionaries.phone_number.items.find(
                        (item) => item.id === "+65"
                      )?.id ?? ""
                    : data.mobile === null
                    ? appDictionaries.phone_number.items.find(
                        (item) => item.id === "+65"
                      )?.id ?? ""
                    : `${
                        appDictionaries.phone_number.items.find(
                          (item) => item.id === `+${data.mobile?.slice(0, 2)}`
                        )?.id ?? ""
                      }${data.mobile.slice(3)}`,
              }
            : {
                ...state.form.phonenumber,
                value: state.form.phonenumber.value,
              },
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
