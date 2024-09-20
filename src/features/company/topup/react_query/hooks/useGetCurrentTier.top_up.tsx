import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TopupReactQueryKey } from "../keys/keys";
import { fetchGetCurrentTier } from "src/core/services/billing";
import { GetCurrentTierResponseInterface } from "src/core/models/api/billings";
import { useContext, useEffect } from "react";
import { ClientTopupContext } from "../../contexts/ClientTopup.context";
import { ClientTopupActionEnum } from "../../contexts/ClientTopup.types";

export const useTopupGetCurrentTier = () => {
  const { state, dispatch } = useContext(ClientTopupContext);

  const query = useQuery<GetCurrentTierResponseInterface, AxiosError>({
    queryKey: TopupReactQueryKey.GetCurrentTier(),
    queryFn: () => {
      return fetchGetCurrentTier();
    },
    enabled: state.tier.items.length > 0,
  });

  useEffect(() => {
    if (query.data !== undefined || query.isSuccess) {
      const data = query.data;
      dispatch({
        type: ClientTopupActionEnum.SetTierCurrent,
        payload: {
          id: data.tier_id,
          type:
            data.tier_model.toLowerCase() === "subscription"
              ? "subscription"
              : "credit",
        },
      });
    }
  }, [query.data, query.isSuccess]);

  return query;
};
