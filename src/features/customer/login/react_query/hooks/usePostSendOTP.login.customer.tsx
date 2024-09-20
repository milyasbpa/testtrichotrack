import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  PostSendOTP200SuccessResponseInterface,
  PostSendOTPRequestInterface,
} from "src/core/models/api/login";
import { fetchPostSendOTP } from "src/core/services/login";
import { useContext } from "react";
import { UserScalpScanReactQueryKey } from "src/features/customer/login/react_query/keys";
import {
  CustomerLoginContext,
  CustomerLoginActionEnum,
} from "src/features/customer/login/context";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";

export const useUserScalpScanPostSendOTP = () => {
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);
  const { state, dispatch } = useContext(CustomerLoginContext);

  const mutation = useMutation<
    PostSendOTP200SuccessResponseInterface,
    AxiosError
  >({
    mutationKey: UserScalpScanReactQueryKey.PostSendOTP(),

    mutationFn: () => {
      const payload: PostSendOTPRequestInterface = {
        mobile: `${state.form.phonenumber.value
          .slice(0, 3)
          .replace("+", "")}-${state.form.phonenumber.value.slice(3)}`,
      };
      return fetchPostSendOTP(payload);
    },
    onError(err) {
      if (err.response?.status === 400) {
        dispatchApp({
          type: AppActionEnum.SetNotificationItems,
          payload: [
            ...appState.notification.items,
            {
              id: "ERROR_INVALID_PHONENUMBER",
              variant: "danger",
            },
          ],
        });
      } else if (err.response?.status === 404) {
        dispatchApp({
          type: AppActionEnum.SetNotificationItems,
          payload: [
            ...appState.notification.items,
            {
              id: "ERROR_UNREGISTERED_PHONENUMBER",
              variant: "danger",
            },
          ],
        });
      } else if (err.response?.status === 423) {
        dispatchApp({
          type: AppActionEnum.SetNotificationItems,
          payload: [
            ...appState.notification.items,
            {
              id: "ERROR_ACCOUNT_HAS_BEEN_DELETED",
              variant: "danger",
            },
          ],
        });
      } else if (err.response?.status === 429) {
        dispatchApp({
          type: AppActionEnum.SetNotificationItems,
          payload: [
            ...appState.notification.items,
            {
              id: "ERROR_TOO_MANY_OTP_REQUEST",
              variant: "danger",
            },
          ],
        });
      } else if (err.response?.status === 500) {
        dispatchApp({
          type: AppActionEnum.SetNotificationItems,
          payload: [
            ...appState.notification.items,
            {
              id: "ERROR_OTP_NETWORK",
              variant: "danger",
            },
          ],
        });
      }
    },
    onSuccess() {
      dispatch({
        type: CustomerLoginActionEnum.SetFormData,
        payload: {
          ...state.form,
          otp: {
            ...state.form.otp,
            feature: {
              ...state.form.otp.feature,
              is_open: true,
            },
          },
        },
      });
    },
  });

  return mutation;
};
