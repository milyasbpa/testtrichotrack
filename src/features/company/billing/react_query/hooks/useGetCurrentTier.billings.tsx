import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CompanyBillingReactQueryKey } from "../keys/keys";
import { fetchGetCurrentTier } from "src/core/services/billing";
import { GetCurrentTierResponseInterface } from "src/core/models/api/billings";
import { useContext, useEffect } from "react";
import { CompanyBillingContext, CompanyBillingActionEnum } from "../../context";
import moment from "moment";

export const useCompanyBillingGetCurrentTier = () => {
  const { state, dispatch } = useContext(CompanyBillingContext);

  const query = useQuery<GetCurrentTierResponseInterface, AxiosError>({
    queryKey: CompanyBillingReactQueryKey.GetCurrentTier(),
    queryFn: () => {
      return fetchGetCurrentTier();
    },
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      dispatch({
        type: CompanyBillingActionEnum.SetProfileData,
        payload: {
          ...state.profile,
          alert:
            data.alert !== null
              ? {
                  en: data.alert.English,
                  zh: data.alert.Chinese,
                }
              : data.alert,
          tier_name: {
            en: data.tier_name.English,
            zh: data.tier_name.Chinese,
          },
          type:
            data.tier_model.toLowerCase() === "subscription"
              ? "subscription"
              : "credit",
          expired_date: moment(data.expiration ?? new Date()).format(
            "DD / MM / YYYY"
          ),
          day_remaining:
            moment(data.expiration ?? new Date()).diff(moment(), "days") <= 0
              ? 0
              : moment(data.expiration ?? new Date()).diff(moment(), "days"),
          credit: data.balance,
          outlet: {
            number: data.outlet[0] ?? null,
            limit: data.outlet[1] ?? null,
          },
          staff: {
            number: data.staff[0] ?? null,
            limit: data.staff[1] ?? null,
          },
          customers: {
            number: data.customer[0] ?? null,
            limit: data.customer[1] ?? null,
          },
        },
      });
    }
  }, [query.data]);

  return query;
};
