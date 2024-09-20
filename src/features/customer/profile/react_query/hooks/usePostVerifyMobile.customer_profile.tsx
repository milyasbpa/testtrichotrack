import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  PostVerifyMobile200SuccessResponseInterface,
  PostVerifyMobileRequestInterface,
} from "src/core/models/api/login";
import { fetchPostVerifyMobile } from "src/core/services/login";
import { AxiosError } from "axios";
import {
  CustomerProfileActionEnum,
  CustomerProfileContext,
} from "../../contexts";
import { CustomerProfileReactQueryKey } from "../keys";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";

export const useCustomerProfilePostVerifyMobile = () => {
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);
  const { state, dispatch } = useContext(CustomerProfileContext);
  const mutation = useMutation<
    PostVerifyMobile200SuccessResponseInterface,
    AxiosError
  >({
    mutationKey: CustomerProfileReactQueryKey.PostVerifyMobile(),
    mutationFn: () => {
      const payload: PostVerifyMobileRequestInterface = {
        mobile: `${state.personal_data.phonenumber.value
          .slice(0, 3)
          .replace("+", "")}-${state.personal_data.phonenumber.value.slice(3)}`,
      };
      return fetchPostVerifyMobile(payload);
    },
    retry: 0,

    onSuccess(data) {
      dispatch({
        type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
        payload: {
          ...state.personal_data,
          otp: {
            ...state.personal_data.otp,
            value: data.detail,
            feature: {
              ...state.personal_data.otp.feature,
              is_open: true,
            },
          },
        },
      });
    },
    onError(err) {
      if (err.response?.status === 406) {
        dispatchApp({
          type: AppActionEnum.SetNotificationItems,
          payload: [
            ...appState.notification.items,
            {
              id: "ERROR_PHONENUMBER_HAS_BEEN_REGISTERED",
              variant: "danger",
            },
          ],
        });
      } else if (err.response?.status === 400) {
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
      } else {
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
  });

  return mutation;
};
