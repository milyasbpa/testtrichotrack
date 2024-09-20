import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { EditOutletContext } from "../../contexts/EditOutlet.context";
import { EditOutletReactQueryKey } from "../keys";
// import {
//   getClientDeactivateAccountUrl,
//   getOutletListUrl,
// } from "core/utils/routers";
import { fetchPutUpdateOutlet } from "src/core/services/outlet";
import {
  PutUpdateOutlet200SuccessResponseInterface,
  PutUpdateOutletRequestInterface,
} from "src/core/models/api/outlet";
import { EditOutletActionEnum } from "../../contexts/EditOutlet.types";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const useEditOutletPutUpdateOutlet = () => {
  const { state, dispatch } = useContext(EditOutletContext);
  const navigate = useNavigate();
  const { locale, outletID } = useParams();
  const mutation = useMutation<
    PutUpdateOutlet200SuccessResponseInterface,
    AxiosError<AxiosResponse>
  >({
    mutationKey: EditOutletReactQueryKey.PostEditOutlet(),
    mutationFn: () => {
      const payload: PutUpdateOutletRequestInterface = {
        params: {
          outlet_id: parseInt(outletID ?? "-1"),
        },
        data: {
          name: state.form.fullname.value,
          mobile: !state.form.phonenumber.value.length
            ? undefined
            : `${state.form.phonenumber.value
                .slice(0, 3)
                .replace("+", "")}-${state.form.phonenumber.value.slice(3)}`,
          address: state.form.address.value,
          photo: !state.form.photo_profile.value.length
            ? undefined
            : state.form.photo_profile.value.includes("https")
            ? undefined
            : state.form.photo_profile.value.replace(
                "data:image/png;base64,",
                ""
              ),
        },
      };
      return fetchPutUpdateOutlet(payload);
    },
    onSuccess() {
      dispatch({
        type: EditOutletActionEnum.SetFormData,
        payload: {
          ...state.form,
          confirmation_modal: {
            ...state.form.confirmation_modal,
            open: false,
          },
        },
      });
      // dispatch({
      //   type: EditOutletActionEnum.SetProfileAlertValue,
      //   payload: {
      //     open: true,
      //     message: update_success.message,
      //     description: update_success.description,
      //     variant: "success",
      //   },
      // });
      navigate(PrivateRouteURL.routeToOutletsURL({ locale: locale }));
    },
    // onError(error) {
    // dispatch({
    //   type: EditOutletActionEnum.SetProfileAlertValue,
    //   payload: {
    //     open: true,
    //     message:
    //       error.response?.status === 406
    //         ? error_name_already_registered.message
    //         : error_invalid_name.message,
    //     description:
    //       error.response?.status === 406
    //         ? error_name_already_registered.description
    //         : error_invalid_name.description,
    //     variant: error.response?.status === 406 ? "danger" : "danger",
    //   },
    // });
    // dispatch({
    //   type: EditOutletActionEnum.CloseConfirmationModal,
    // });
    // },
  });

  return mutation;
};
