import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { fetchPutUpdateStaffPersonal } from "src/core/services/staff";
import {
  GetStaff200SuccessResponseInterface,
  PutUpdateStaffPersonal200SuccessResponseInterface,
  PutUpdateStaffPersonalRequestInterface,
} from "src/core/models/api/staff";
import { StaffProfileActionEnum, StaffProfileContext } from "../../context";
import { StaffProfileReactQueryKey } from "../keys";
import { LocaleRoute, PrivateRouteURL } from "src/core/utils/router/constants";

export const useStaffProfilePutUpdateStaffPersonal = () => {
  const { state, dispatch } = useContext(StaffProfileContext);
  const { locale } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const staff = queryClient.getQueryData(
    StaffProfileReactQueryKey.GetStaff()
  ) as GetStaff200SuccessResponseInterface | undefined;

  const mutation = useMutation<
    PutUpdateStaffPersonal200SuccessResponseInterface,
    AxiosError<AxiosResponse>
  >({
    mutationKey: StaffProfileReactQueryKey.PutUpdateStaffPersonal(),
    mutationFn: () => {
      const payload: PutUpdateStaffPersonalRequestInterface = {
        params: {
          staff_id: state.form.id as number,
        },
        data: {
          id: state.form.id as number,
          name:
            state.form.fullname.value === staff?.name
              ? undefined
              : state.form.fullname.value,
          mobile:
            `${state.form.phonenumber.value
              .slice(0, 3)
              .replace("+", "")}-${state.form.phonenumber.value.slice(3)}` ===
            staff?.mobile
              ? undefined
              : `${state.form.phonenumber.value
                  .slice(0, 3)
                  .replace("+", "")}-${state.form.phonenumber.value.slice(3)}`,
          password: !state.form.password.value.length
            ? undefined
            : state.form.password.value,
        },
      };
      return fetchPutUpdateStaffPersonal(payload);
    },
    onSuccess(data) {
      if (data !== null) {
        const isNeedRelogin =
          state.form.password.value.length > 0 ||
          `${state.form.phonenumber.value
            .slice(0, 3)
            .replace("+", "")}-${state.form.phonenumber.value.slice(3)}` !==
            staff?.mobile;

        if (isNeedRelogin) {
          dispatch({
            type: StaffProfileActionEnum.CloseConfirmationModal,
          });
          dispatch({
            type: StaffProfileActionEnum.OpenReloginModal,
          });
        } else {
          dispatch({
            type: StaffProfileActionEnum.CloseConfirmationModal,
          });
          // dispatch({
          //   type: StaffProfileActionEnum.SetProfileAlertValue,
          //   payload: {
          //     open: true,
          //     message: update_success.message,
          //     description: update_success.description,
          //     variant: "success",
          //   },
          // });
          navigate(
            PrivateRouteURL.routeToStaffDashboardURL({
              locale: locale ?? LocaleRoute.default,
            })
          );
        }
      }
    },
    onError() {
      // dispatch({
      //   type: StaffProfileActionEnum.SetProfileAlertValue,
      //   payload: {
      //     open: true,
      //     message:
      //       error.response?.status === 406
      //         ? error_duplicated_phone_number.message
      //         : error_invalid_phone_number.message,
      //     description:
      //       error.response?.status === 406
      //         ? error_duplicated_phone_number.description
      //         : error_invalid_phone_number.description,
      //     variant: error.response?.status === 406 ? "warning" : "danger",
      //   },
      // });

      dispatch({
        type: StaffProfileActionEnum.CloseConfirmationModal,
      });
    },
  });

  return mutation;
};
