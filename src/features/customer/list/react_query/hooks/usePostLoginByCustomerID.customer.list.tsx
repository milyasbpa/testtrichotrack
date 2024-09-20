import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  PostLoginByCustomerID200SuccessResponseInterface,
  PostLoginByCustomerIDRequestInterface,
} from "src/core/models/api/login";
import { fetchPostLoginByCustomerID } from "src/core/services/login";

import { CustomerListReactQueryKey } from "../keys";
import { useContext } from "react";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const useListPostLoginByCustomerID = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);

  const mutation = useMutation<
    PostLoginByCustomerID200SuccessResponseInterface,
    AxiosError,
    number
  >({
    mutationKey: CustomerListReactQueryKey.PostLoginByCustomerID(),
    mutationFn: (id: number) => {
      const payload: PostLoginByCustomerIDRequestInterface = {
        customer_id: id,
      };
      return fetchPostLoginByCustomerID(payload);
    },
    retry: 0,

    async onSuccess(data, variables) {
      if (data !== null) {
        const cookie = new Cookies();
        await cookie.set("token", data.access_token, { path: "/" });
        await cookie.set("customer-token", data.access_token, { path: "/" });
        await dispatchApp({
          type: AppActionEnum.SetUserData,
          payload: {
            ...appState.user,
            customer: {
              ...appState.user.customer,
              id: variables,
            },
          },
        });
        navigate(
          PrivateRouteURL.routeToCustomerHomeURL({
            locale: locale,
          })
        );
      }
    },
  });

  return mutation;
};
