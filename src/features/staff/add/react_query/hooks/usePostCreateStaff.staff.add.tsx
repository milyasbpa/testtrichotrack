import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { PostVerifyMobile200SuccessResponseInterface } from "src/core/models/api/login";
import { AxiosError, AxiosResponse } from "axios";
import { StaffAddContext, StaffAddActionEnum } from "../../contexts";
import { StaffAddReactQueryKey } from "../keys";
import { fetchPostCreateStaff } from "src/core/services/staff";
import { PostCreateStaffRequestInterface } from "src/core/models/api/staff";
import { LocaleRoute, PrivateRouteURL } from "src/core/utils/router/constants";

export const useStaffAddPostCreateStaff = () => {
  // const {
  //   registration_success,
  //   error_duplicated_phone_number,
  //   error_bad_request,
  //   error_invalid_phone_number,
  //   error_maximum_limit_reached,
  //   error_insufficient_credit_balance,
  // } = useStaffAddTranslator();

  const { state, dispatch } = useContext(StaffAddContext);
  const navigate = useNavigate();
  const { locale } = useParams();
  const mutation = useMutation<
    PostVerifyMobile200SuccessResponseInterface,
    AxiosError<AxiosResponse>
  >({
    mutationKey: StaffAddReactQueryKey.PostCreateStaff(),
    mutationFn: () => {
      const payload: PostCreateStaffRequestInterface = {
        outlet_id: parseInt(state.form.outlets.selected?.id ?? "-1"),
        name: state.form.fullname.value,
        mobile: `${state.form.phonenumber.value
          .slice(0, 3)
          .replace("+", "")}-${state.form.phonenumber.value.slice(3)}`,
        password: state.form.password.value,
        permission: state.form.permission.selected?.id ?? "Employee",
        position: state.form.position.value,
        photo: !state.form.photo_profile.value.length
          ? undefined
          : state.form.photo_profile.value.replace(
              "data:image/png;base64,",
              ""
            ),
      };
      return fetchPostCreateStaff(payload);
    },
    onSuccess() {
      dispatch({
        type: StaffAddActionEnum.CloseConfirmationModal,
      });
      // dispatch({
      //   type: StaffAddActionEnum.SetProfileAlertValue,
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
    // onError(error, variables, context) {
    //   dispatch({
    //     type: StaffAddActionEnum.SetProfileAlertValue,
    //     payload: {
    //       open: true,
    //       message:
    //         error.response?.status === 406
    //           ? error_duplicated_phone_number.message
    //           : error.response?.status === 400
    //           ? error_bad_request.message
    //           : error.response?.status === 405 &&
    //             (error.response.data as any)?.detail ===
    //               "The maximum limit reached"
    //           ? error_maximum_limit_reached.message
    //           : error.response?.status === 405 &&
    //             (error.response.data as any)?.detail ===
    //               "Insufficient credit balance"
    //           ? error_insufficient_credit_balance.message
    //           : error_invalid_phone_number.message,
    //       description:
    //         error.response?.status === 406
    //           ? error_duplicated_phone_number.description
    //           : error.response?.status === 400
    //           ? error_bad_request.description
    //           : error.response?.status === 405 &&
    //             (error.response.data as any)?.detail ===
    //               "The maximum limit reached"
    //           ? error_maximum_limit_reached.description
    //           : error.response?.status === 405 &&
    //             (error.response.data as any)?.detail ===
    //               "Insufficient credit balance"
    //           ? error_insufficient_credit_balance.description
    //           : error_invalid_phone_number.description,
    //       variant: error.response?.status === 406 ? "warning" : "danger",
    //     },
    //   });
    //   dispatch({
    //     type: StaffAddActionEnum.CloseConfirmationModal,
    //   });
    // },
  });

  return mutation;
};
