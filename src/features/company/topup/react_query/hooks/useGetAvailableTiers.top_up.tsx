import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TopupReactQueryKey } from "../keys/keys";
import { fetchGetAvailableTiers } from "src/core/services/billing";
import { GetAvailableTiersResponseInterface } from "src/core/models/api/billings";
import { useContext, useEffect } from "react";
import { ClientTopupContext } from "../../contexts/ClientTopup.context";
import { ClientTopupActionEnum } from "../../contexts/ClientTopup.types";

export const useTopupGetAvailableTiers = () => {
  const { dispatch } = useContext(ClientTopupContext);

  const query = useQuery<GetAvailableTiersResponseInterface[], AxiosError>({
    queryKey: TopupReactQueryKey.GetAvailableTiers(),
    queryFn: () => {
      return fetchGetAvailableTiers();
    },
  });

  useEffect(() => {
    if (query.data !== undefined || query.isSuccess) {
      const data = query.data;
      dispatch({
        type: ClientTopupActionEnum.SetTierItems,
        payload: data.map((item) => {
          return {
            id: item.id,
            name: {
              en: item.name.English,
              zh: item.name.Chinese,
            },
            duration: item.duration,
            min_price: item.min_price,
            max_price: item.max_price,
            currency: item.currency,
            member: {
              outlet: item.max_outlet,
              staff: item.max_staff,
              customer: item.max_customer,
            },
            intro: {
              en: item.intro.English,
              zh: item.intro.Chinese,
            },
            terms: {
              en: item.terms.English,
              zh: item.terms.Chinese,
            },
          };
        }),
      });
    }
  }, [query.data, query.isSuccess]);

  return query;
};
