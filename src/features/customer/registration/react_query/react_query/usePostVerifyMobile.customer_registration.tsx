import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  PostVerifyMobile200SuccessResponseInterface,
  PostVerifyMobileRequestInterface,
} from "src/core/models/api/login";
import { fetchPostVerifyMobile } from "src/core/services/login";
import { AxiosError, AxiosResponse } from "axios";

import {
  CustomerRegistrationActionEnum,
  CustomerRegistrationContext,
} from "../../context";
import { CustomerRegistrationReactQueryKey } from "../keys";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";

// Required Information
export const useRequiredPostVerifyMobile = () => {
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);
  const { state, dispatch } = useContext(CustomerRegistrationContext);

  const mutation = useMutation<
    PostVerifyMobile200SuccessResponseInterface,
    AxiosError<AxiosResponse>
  >({
    mutationKey: CustomerRegistrationReactQueryKey.PostVerifyMobile(),
    mutationFn: () => {
      const payload: PostVerifyMobileRequestInterface = {
        mobile: `${state.required_information.phonenumber.value
          .slice(0, 3)
          .replace(
            "+",
            ""
          )}-${state.required_information.phonenumber.value.slice(3)}`,
      };
      return fetchPostVerifyMobile(payload);
    },
    onSuccess(data) {
      dispatch({
        type: CustomerRegistrationActionEnum.SetRequiredInformationData,
        payload: {
          ...state.required_information,
          otp: {
            ...state.required_information.otp,
            value: data.detail,
            feature: {
              ...state.required_information.otp.feature,
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
