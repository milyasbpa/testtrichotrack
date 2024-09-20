import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { OutletAddContext } from "../../contexts/Add.outlet.context";
import { OutletAddActionEnum } from "../../contexts/Add.outlet.types";
import { AddOutletReactQueryKey } from "../keys";

import { fetchPostCreateOutlet } from "src/core/services/outlet";
import {
  PostCreateOutlet200SuccessResponseInterface,
  PostCreateOutletRequestInterface,
} from "src/core/models/api/outlet";
import { LocaleRoute, PrivateRouteURL } from "src/core/utils/router/constants";

export interface IuseRequiredInformationPostVerifyMobileProps {}

export const useAddOutletPostCreateOutlet = () => {
  // const {
  //   registration_success,
  //   error_name_already_registered,
  //   error_invalid_name,
  //   error_maximum_limit_reached,
  //   error_insufficient_credit_balance,
  // } = useOutletAddTranslator();

  const { state, dispatch } = useContext(OutletAddContext);
  const navigate = useNavigate();
  const { locale } = useParams();
  const mutation = useMutation<
    PostCreateOutlet200SuccessResponseInterface,
    AxiosError<AxiosResponse>
  >({
    mutationKey: AddOutletReactQueryKey.PostAddOutlet(),
    mutationFn: () => {
      const payload: PostCreateOutletRequestInterface = {
        name: state.form.fullname.value,
        mobile: !state.form.phonenumber.value.length
          ? undefined
          : `${state.form.phonenumber.value
              .slice(0, 3)
              .replace("+", "")}-${state.form.phonenumber.value.slice(3)}`,
        address: state.form.address.value,
        photo: !state.form.photo_profile.value.length
          ? undefined
          : state.form.photo_profile.value.replace(
              "data:image/png;base64,",
              ""
            ),
      };
      return fetchPostCreateOutlet(payload);
    },
    onSuccess() {
      dispatch({
        type: OutletAddActionEnum.CloseConfirmationModal,
      });
      // dispatch({
      //   type: OutletAddActionEnum.SetProfileAlertValue,
      //   payload: {
      //     open: true,
      //     message: registration_success.message,
      //     description: registration_success.description,
      //     variant: "success",
      //   },
      // });
      navigate(
        PrivateRouteURL.routeToStaffDashboardURL({
          locale: locale ?? LocaleRoute.default,
        })
      );
    },
  });

  return mutation;
};
