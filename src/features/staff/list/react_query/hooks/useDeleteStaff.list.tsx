import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { StaffListContext } from "../../contexts/StaffList.context";
import { DisplayListReactQueryKey } from "../keys";
import {
  DeleteStaff200SuccessResponseInterface,
  DeleteStaffRequestInterface,
} from "src/core/models/api/staff";
import { fetchDeleteStaff } from "src/core/services/staff/delete_staff";
import { StaffListActionEnum } from "../../contexts/StaffList.types";

export const useDisplayDeleteStaff = () => {
  const { state, dispatch } = useContext(StaffListContext);
  const queryClient = useQueryClient();

  const query = useMutation<DeleteStaff200SuccessResponseInterface, AxiosError>(
    {
      mutationKey: DisplayListReactQueryKey.DeleteStaff(),
      mutationFn: () => {
        const payload: DeleteStaffRequestInterface = {
          staff_id: state.data.selected.id,
        };
        return fetchDeleteStaff(payload);
      },
      retry: 0,

      onSuccess(data) {
        if (data !== undefined) {
          dispatch({
            type: StaffListActionEnum.CloseDeleteConfirmationDialog,
          });
          queryClient.setQueryData(
            [
              DisplayListReactQueryKey.GetStaffs,
              [
                state.data.search.value,
                state.data.sort.by,
                state.data.outlets.selected?.id,
                state.data.permissions.selected?.name,
              ] as const,
            ],
            []
          );
          // queryClient.invalidateQueries([
          //   DisplayListReactQueryKey.GetStaffs,
          //   [
          //     state.data.search.value,
          //     state.data.sort.by,
          //     state.data.outlets.selected.id,
          //     state.data.permissions.selected.name,
          //   ] as const,
          // ]);
        }
      },
    }
  );

  return query;
};
