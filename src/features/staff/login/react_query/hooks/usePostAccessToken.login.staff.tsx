import { useMutation } from "@tanstack/react-query";
import {
  PostAccessTokenRequestInterface,
  PostAccessTokenSuccessResponseInterface,
} from "src/core/models/api/login";
import { fetchPostAccessToken } from "src/core/services/login";
import { StaffLoginReactQueryKey } from "src/features/staff/login/react_query/keys";
import { useContext } from "react";
import { StaffLoginContext } from "src/features/staff/login/context";
import { AxiosError } from "axios";
import { queryClient } from "src/core/utils/react_query";
import { AppReactQueryKey } from "src/core/modules/app/react_query/keys";
import { DeviceStorageInterface } from "src/core/models/storage/app";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { LocaleRoute, PrivateRouteURL } from "src/core/utils/router/constants";

export const useStaffLoginPostAccessToken = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);
  const { state } = useContext(StaffLoginContext);

  const device = queryClient.getQueryData(AppReactQueryKey.GetDevice()) as
    | undefined
    | DeviceStorageInterface;

  const { isPending: isPendingPostAccessToken, mutateAsync: postAccessToken } =
    useMutation<PostAccessTokenSuccessResponseInterface, AxiosError<any>>({
      mutationKey: StaffLoginReactQueryKey.PostLoginAccessToken(),
      mutationFn: () => {
        const payload: PostAccessTokenRequestInterface = {
          username: `Staff::${state.form.phonenumber.value
            .slice(0, 3)
            .replace("+", "")}-${state.form.phonenumber.value.slice(3)}`,
          password: state.form.password.value,
          client_secret: device?.secret_client.value ?? "",
        };
        return fetchPostAccessToken(payload);
      },
      onError(error) {
        const apiErrorCode = error.response?.data?.detail.toString();
        const errorID =
          apiErrorCode === "subscription expired"
            ? "ERROR_SUBSCRIPTION_EXPIRED"
            : apiErrorCode === "credit points exhausted"
            ? "ERROR_CREDIT_POINTS_EXHAUSTED"
            : "ERROR_STAFF_LOGIN";
        dispatchApp({
          type: AppActionEnum.SetNotificationData,
          payload: {
            ...appState.notification,
            items: [
              ...appState.notification.items,
              {
                variant: "danger",
                id: errorID,
              },
            ],
          },
        });
      },
    });

  const onSubmit = async () => {
    return await postAccessToken()
      .then((data) => {
        const cookie = new Cookies();
        cookie.set("token", data.access_token, { path: "/" });
        cookie.set("staff-token", data.access_token, { path: "/" });
        return navigate(
          PrivateRouteURL.routeToStaffHomeURL({
            locale: locale ?? LocaleRoute.default,
          })
        );
      })
      .catch((error) => {
        const apiErrorCode = error.response?.data?.detail.toString();
        const errorID =
          apiErrorCode === "subscription expired"
            ? "ERROR_SUBSCRIPTION_EXPIRED"
            : apiErrorCode === "credit points exhausted"
            ? "ERROR_CREDIT_POINTS_EXHAUSTED"
            : "ERROR_STAFF_LOGIN";
        dispatchApp({
          type: AppActionEnum.SetNotificationData,
          payload: {
            ...appState.notification,
            items: [
              ...appState.notification.items,
              {
                variant: "danger",
                id: errorID,
              },
            ],
          },
        });
      });
  };

  const isPending = isPendingPostAccessToken;
  return {
    isPending: isPending,
    onSubmit,
  };
};
