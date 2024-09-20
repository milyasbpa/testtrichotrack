import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TopupReactQueryKey } from "../keys/keys";
import { fetchPostCheckout } from "src/core/services/billing";
import { useEffect } from "react";
import {
  PostCheckout200SuccessResponseInterface,
  PostCheckoutRequestInterface,
} from "src/core/models/api/billings";
import { useParams } from "react-router-dom";
import { ENVIRONMENT } from "src/core/constants";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const useTopupPostCheckout = () => {
  const { locale } = useParams();
  const mutation = useMutation<
    PostCheckout200SuccessResponseInterface,
    AxiosError,
    { id: number }
  >({
    mutationKey: TopupReactQueryKey.PostCheckout(),
    mutationFn: (data: { id: number }) => {
      const payload: PostCheckoutRequestInterface = {
        body: {
          cancel_url: `${
            ENVIRONMENT.APP_URL
          }${PrivateRouteURL.routeToCompanyFailedPaymentURL({
            locale: locale,
          })}`,
          success_url: `${
            ENVIRONMENT.APP_URL
          }${PrivateRouteURL.routeToCompanySuccessPaymentURL({
            locale: locale,
          })}`,
          language: locale === "zh" ? "Chinese" : "English",
          tier_id: data.id,
        },
      };
      return fetchPostCheckout(payload);
    },
  });

  useEffect(() => {
    if (mutation.data !== undefined || mutation.isSuccess) {
      const data = mutation.data;
      window.location.href = data.detail;
    }
  }, [mutation.data, mutation.isSuccess]);

  return mutation;
};
