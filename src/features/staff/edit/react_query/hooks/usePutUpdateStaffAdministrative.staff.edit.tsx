import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { fetchPutUpdateStaffAdministrative } from "src/core/services/staff";
import {
  GetStaff200SuccessResponseInterface,
  PutUpdateStaffAdministrative200SuccessResponseInterface,
  PutUpdateStaffAdministrativeRequestInterface,
} from "src/core/models/api/staff";

import { StaffEditContext } from "../../contexts/Edit.staff.context";
import { StaffEditReactQueryKey } from "../keys";
import { StaffEditActionEnum } from "../../contexts/Edit.staff.types";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const useStaffEditPutUpdateStaffAdministrative = () => {
  // const { error_duplicated_phone_number, error_invalid_phone_number } =
  //   useStaffEditTranslator();

  const { state, dispatch } = useContext(StaffEditContext);
  const navigate = useNavigate();
  const { locale } = useParams();

  const queryClient = useQueryClient();
  const staff = queryClient.getQueryData(
    StaffEditReactQueryKey.GetStaff()
  ) as GetStaff200SuccessResponseInterface;

  const mutation = useMutation<
    PutUpdateStaffAdministrative200SuccessResponseInterface,
    AxiosError<AxiosResponse>
  >({
    mutationKey: StaffEditReactQueryKey.PutUpdateStaffAdministrative(),
    mutationFn: () => {
      const payload: PutUpdateStaffAdministrativeRequestInterface = {
        params: {
          staff_id: state.form.id as number,
        },
        data: {
          id: state.form.id as number,
          name:
            staff.name === state.form.fullname.value
              ? undefined
              : state.form.fullname.value,
          mobile: `${state.form.phonenumber.value
            .slice(0, 3)
            .replace("+", "")}-${state.form.phonenumber.value.slice(3)}`,
          password: !state.form.password.value.length
            ? undefined
            : state.form.password.value,
          outlet_id:
            parseInt(state.form.outlets.selected?.id ?? "-1") ===
            staff.outlet_id
              ? undefined
              : parseInt(state.form.outlets.selected?.id ?? "-1"),
          permission:
            state.form.permission.selected?.id === staff.permission
              ? undefined
              : state.form.permission.selected?.id,
          position: !state.form.position.value.length
            ? undefined
            : state.form.position.value === staff.position
            ? undefined
            : state.form.position.value,
        },
      };
      return fetchPutUpdateStaffAdministrative(payload);
    },
    onSuccess() {
      dispatch({
        type: StaffEditActionEnum.CloseConfirmationModal,
      });
      // dispatch({
      //   type: StaffEditActionEnum.SetProfileAlertValue,
      //   payload: {
      //     open: true,
      //     message: "Staff successfully Edited!",
      //     description: "Check staff list to view",
      //     variant: "success",
      //   },
      // });
      navigate(PrivateRouteURL.routeToStaffsURL({ locale: locale }));
    },
    onError() {
      // dispatch({
      //   type: StaffEditActionEnum.SetProfileAlertValue,
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
        type: StaffEditActionEnum.CloseConfirmationModal,
      });
    },
  });

  return mutation;
};
