import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchGetCustomerDetail } from "src/core/services/customer";
import {
  GetCustomerDetailRequestInterface,
  GetCustomerDetailSuccessResponseInterface,
} from "src/core/models/api/customer";
import { AxiosError } from "axios";
import { CustomerProfileReactQueryKey } from "../keys";
import {
  CustomerProfileActionEnum,
  CustomerProfileContext,
} from "../../contexts";
import { AppContext } from "src/core/modules/app/context";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { useParams } from "react-router-dom";

export const useCustomerProfileGetCustomerDetail = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const { state: appState } = useContext(AppContext);
  const { state, dispatch } = useContext(CustomerProfileContext);

  const payload: GetCustomerDetailRequestInterface = {
    customer_id: appState.user.customer?.id ?? -1,
  };

  const query = useQuery<GetCustomerDetailSuccessResponseInterface, AxiosError>(
    {
      queryKey: CustomerProfileReactQueryKey.GetCustomerDetail(),
      queryFn: () => {
        return fetchGetCustomerDetail(payload);
      },
      enabled: !!appState.user.customer?.id,
    }
  );

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: CustomerProfileActionEnum.SetGlobal,
        payload: {
          ...state.global,
          profile_picture: {
            ...state.global.profile_picture,
            value: data.photo === null ? "" : data.photo,
          },
        },
      });

      dispatch({
        type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
        payload: {
          ...state.personal_data,
          fullname: {
            ...state.personal_data.fullname,
            value: data.name,
          },
          date_of_birth: {
            ...state.personal_data.date_of_birth,
            value: data.birthday,
          },

          race: {
            ...state.personal_data.race,
            value: !data.race
              ? null
              : appDictionaries.race.items.find(
                  (item) => item.id === data.race
                ) ?? null,
          },

          gender: {
            ...state.personal_data.gender,
            value: !data.gender
              ? null
              : appDictionaries.gender.items.find(
                  (item) => item.id === data.gender
                ) ?? null,
          },

          email: {
            ...state.personal_data.email,
            value:
              data.email === null
                ? ""
                : data.email !== undefined && data.email === null
                ? ""
                : data.email !== undefined
                ? data.email
                : "",
          },

          phonenumber: {
            ...state.personal_data.phonenumber,
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
          },

          profession: {
            ...state.personal_data.profession,
            value:
              data.extra_info === null
                ? ""
                : data.extra_info.profession !== undefined &&
                  data.extra_info.profession === null
                ? ""
                : data.extra_info.profession !== undefined
                ? data.extra_info.profession
                : "",
          },

          citizenship: {
            ...state.personal_data.citizenship,
            value:
              data.extra_info === null
                ? null
                : data.extra_info.citizenship !== undefined &&
                  data.extra_info.citizenship === null
                ? null
                : data.extra_info.citizenship !== undefined
                ? appDictionaries.gender.items.find(
                    (item) => item.id === data.extra_info?.citizenship
                  ) ?? null
                : null,
          },

          marital_status: {
            ...state.personal_data.marital_status,
            value:
              data.extra_info === null
                ? null
                : data.extra_info.marital_status !== undefined &&
                  data.extra_info.marital_status === null
                ? null
                : data.extra_info.marital_status !== undefined
                ? appDictionaries.gender.items.find(
                    (item) => item.id === data.extra_info?.marital_status
                  ) ?? null
                : null,
          },

          address: {
            ...state.personal_data.address,
            value:
              data.extra_info === null
                ? ""
                : data.extra_info.address !== undefined &&
                  data.extra_info.address === null
                ? ""
                : data.extra_info.address !== undefined
                ? data.extra_info.address
                : "",
          },
          marketing_promotion: {
            ...state.personal_data.marketing_promotion,
            value:
              data.extra_info === null
                ? false
                : data.extra_info.receive_promotion !== undefined &&
                  data.extra_info.receive_promotion === null
                ? false
                : data.extra_info.receive_promotion !== undefined &&
                  data.extra_info.receive_promotion === "Yes"
                ? true
                : false,
          },
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
