import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  PutUpdateCustomerPhoto200SuccessResponseInterface,
  PutUpdateCustomerPhotoRequestInterface,
} from "src/core/models/api/customer";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { CustomerProfileReactQueryKey } from "../keys";
import { CustomerProfileContext } from "../../contexts/Profile.customer.context";
import { fetchPutUpdateCustomerPhoto } from "src/core/services/customer";
import { AppContext } from "src/core/modules/app/context";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const useCustomerProfilePutUpdateCustomerPhoto = () => {
  const navigate = useNavigate();

  const { locale } = useParams();
  const { state: appState } = useContext(AppContext);
  const { state } = useContext(CustomerProfileContext);

  const mutation = useMutation<
    PutUpdateCustomerPhoto200SuccessResponseInterface,
    AxiosError
  >({
    mutationKey: CustomerProfileReactQueryKey.PutUpdateCustomerPhoto(),
    mutationFn: () => {
      const payload: PutUpdateCustomerPhotoRequestInterface = {
        params: {
          customer_id: appState.user.customer?.id ?? -1,
        },
        data: {
          photo: state.global.profile_picture.value.replace(
            "data:image/jpeg;base64,",
            ""
          ),
        },
      };

      return fetchPutUpdateCustomerPhoto(payload);
    },

    onSuccess() {
      navigate(
        PrivateRouteURL.routeToCustomerHomeURL({
          locale: locale,
        })
      );
    },
  });

  return mutation;
};
