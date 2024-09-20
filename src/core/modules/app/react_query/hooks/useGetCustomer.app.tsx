import { useQuery } from "@tanstack/react-query";
import { AppReactQueryKey } from "../keys";
import { useContext, useEffect } from "react";
import { AxiosError } from "axios";
import { AppActionEnum, AppContext } from "../../context";
import Cookies from "universal-cookie";
import {
  GetCustomerRequestInterface,
  GetCustomerSuccessResponseInterface,
} from "src/core/models/api/customer";
import { fetchGetCustomer } from "src/core/services/customer";

// NOTE: Global listener from Backend API response to handle customer data
export const useAppGetCustomer = () => {
  const { state, dispatch } = useContext(AppContext);

  const cookie = new Cookies();

  const customerToken = cookie.get("customer-token");

  const payload: GetCustomerRequestInterface = {
    customer_id: state.user.customer?.id ?? -1,
  };

  const query = useQuery<GetCustomerSuccessResponseInterface, AxiosError>({
    queryKey: AppReactQueryKey.GetCustomer(payload),
    queryFn: () => {
      return fetchGetCustomer(payload);
    },

    enabled: typeof customerToken !== "undefined" && !!state.user.customer,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      if (!!customerToken) {
        dispatch({
          type: AppActionEnum.SetUserData,
          payload: {
            ...state.user,
            customer: {
              ...state.user.customer,
              birthday: data.birthday,
              crm_id: data.crm_id,
              email: data.email,
              gender: data.gender,
              mobile: data.mobile,
              name: data.name,
              photo: data.photo,
              race: data.race,
              reg_time: data.reg_time,
              status: data.status,
            },
          },
        });
      }
    }
  }, [query.data, customerToken, query.isFetching]);

  return query;
};
