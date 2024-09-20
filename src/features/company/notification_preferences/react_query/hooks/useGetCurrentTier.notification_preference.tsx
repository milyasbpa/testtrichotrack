import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NotificationPreferenceReactQueryKey } from "../keys/keys";
import { fetchGetCurrentTier } from "src/core/services/billing";
import { GetCurrentTierResponseInterface } from "src/core/models/api/billings";
import { useContext, useEffect } from "react";
import { ClientNotificationPreferencesContext } from "../../contexts/NotificationPreferences.company.context";
import { ClientNotificationPreferencesActionEnum } from "../../contexts/NotificationPreferences.company.types";

export const useNotificationPreferencesGetCurrentTier = () => {
  const { dispatch } = useContext(ClientNotificationPreferencesContext);

  const query = useQuery<GetCurrentTierResponseInterface, AxiosError>({
    queryKey: NotificationPreferenceReactQueryKey.GetCurrentTier(),
    queryFn: () => {
      return fetchGetCurrentTier();
    },
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: ClientNotificationPreferencesActionEnum.SetFormType,
        payload:
          data.tier_model.toLowerCase() === "subscription"
            ? "subscription"
            : "credit",
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
