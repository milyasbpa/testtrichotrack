import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { fetchPutUpdateStaffPhoto } from "src/core/services/staff";
import {
  PutUpdateStaffPhotoRequestInterface,
  PutUpdateStaffPhoto200SuccessResponseInterface,
} from "src/core/models/api/staff";
import { useStaffProfilePutUpdateStaffPersonal } from "./usePutUpdateStaffPersonal.profile";
import { StaffProfileActionEnum, StaffProfileContext } from "../../context";
import { StaffProfileReactQueryKey } from "../keys";

export const useStaffProfilePutUpdateStaffPhoto = () => {
  const { state, dispatch } = useContext(StaffProfileContext);

  const { mutate: updateStaffByPersonal } =
    useStaffProfilePutUpdateStaffPersonal();

  const mutation = useMutation<
    PutUpdateStaffPhoto200SuccessResponseInterface,
    AxiosError<AxiosResponse>
  >({
    mutationKey: StaffProfileReactQueryKey.PutUpdateStaffPhoto(),
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
      updateStaffByPersonal();
    },
    onError() {
      dispatch({
        type: StaffProfileActionEnum.CloseConfirmationModal,
      });
    },
  });

  return mutation;
};
