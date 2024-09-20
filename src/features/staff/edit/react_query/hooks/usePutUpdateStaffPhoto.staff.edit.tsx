import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { fetchPutUpdateStaffPhoto } from "src/core/services/staff";
import {
  PutUpdateStaffPhotoRequestInterface,
  PutUpdateStaffPhoto200SuccessResponseInterface,
} from "src/core/models/api/staff";
import { useStaffEditPutUpdateStaffAdministrative } from "./usePutUpdateStaffAdministrative.staff.edit";
import { StaffEditContext } from "../../contexts/Edit.staff.context";
import { StaffEditReactQueryKey } from "../keys";
import { StaffEditActionEnum } from "../../contexts/Edit.staff.types";

export const useStaffEditPutUpdateStaffPhoto = () => {
  const { state, dispatch } = useContext(StaffEditContext);

  const { mutate: updateStaffByAdmin } =
    useStaffEditPutUpdateStaffAdministrative();

  const mutation = useMutation<
    PutUpdateStaffPhoto200SuccessResponseInterface,
    AxiosError<AxiosResponse>
  >({
    mutationKey: StaffEditReactQueryKey.PutUpdateStaffPhoto(),
    mutationFn: () => {
      const payload: PutUpdateStaffPhotoRequestInterface = {
        params: {
          staff_id: state.form.id as number,
        },
        data: {
          photo: state.form.photo_profile.value.replace(
            "data:image/png;base64,",
            ""
          ),
        },
      };
      return fetchPutUpdateStaffPhoto(payload);
    },
    onSuccess() {
      updateStaffByAdmin();
    },
    onError() {
      dispatch({
        type: StaffEditActionEnum.CloseConfirmationModal,
      });
    },
  });

  return mutation;
};
