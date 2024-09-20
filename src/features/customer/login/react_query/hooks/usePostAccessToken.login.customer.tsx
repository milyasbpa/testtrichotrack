import { useMutation } from "@tanstack/react-query";
import {
  PostAccessTokenRequestInterface,
  PostAccessTokenSuccessResponseInterface,
} from "src/core/models/api/login";
import { fetchPostAccessToken } from "src/core/services/login";
import { useContext } from "react";
import { UserScalpScanReactQueryKey } from "src/features/customer/login/react_query/keys";
import {
  CustomerLoginContext,
  CustomerLoginActionEnum,
} from "src/features/customer/login/context";
import { AxiosError } from "axios";
import { DeviceStorageInterface } from "src/core/models/storage/app";
import { queryClient } from "src/core/utils/react_query";
import { AppReactQueryKey } from "src/core/modules/app/react_query/keys";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const useUserScalpScanPostAccessToken = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);
  const { state, dispatch } = useContext(CustomerLoginContext);

  const device = queryClient.getQueryData(AppReactQueryKey.GetDevice()) as
    | undefined
    | DeviceStorageInterface;

  const mutation = useMutation<
    PostAccessTokenSuccessResponseInterface,
    AxiosError<any>,
    string
  >({
    mutationKey: UserScalpScanReactQueryKey.PostAccessToken(),
    mutationFn: (data: string) => {
      const payload: PostAccessTokenRequestInterface = {
        username: `Customer::${state.form.phonenumber.value
          .slice(0, 3)
          .replace("+", "")}-${state.form.phonenumber.value.slice(3)}`,
        password: data,
        client_secret: device?.secret_client.value ?? "",
      };
      return fetchPostAccessToken(payload);
    },
    onError(err) {
      if (err.response?.data?.detail === "Incorrect username or password") {
        dispatch({
          type: CustomerLoginActionEnum.SetFormData,
          payload: {
            ...state.form,
            otp: {
              ...state.form.otp,
              verified: false,
            },
          },
        });
        dispatchApp({
          type: AppActionEnum.SetNotificationItems,
          payload: [
            ...appState.notification.items,
            {
              id: "ERROR_INVALID_OTP",
              variant: "danger",
            },
          ],
        });
      }
    },
    async onSuccess(data) {
      const cookie = new Cookies();
      await cookie.set("token", data.access_token, { path: "/" });
      await cookie.set("customer-token", data.access_token, { path: "/" });

      navigate(
        PrivateRouteURL.routeToCustomerHomeURL({
          locale: locale,
        })
      );
    },
  });

  return mutation;
};
