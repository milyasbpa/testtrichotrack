import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { OutletListContext } from "../../contexts/OutletList.context";
import { DisplayListReactQueryKey } from "../keys";
import { OutletListActionEnum } from "../../contexts/OutletList.types";
import { fetchDeleteOutlet } from "src/core/services/outlet";
import {
  DeleteOutlet200SuccessResponseInterface,
  DeleteOutletRequestInterface,
} from "src/core/models/api/outlet";

export const useDisplayDeleteOutlet = () => {
  const { state, dispatch } = useContext(OutletListContext);
  const queryClient = useQueryClient();

  const query = useMutation<
    DeleteOutlet200SuccessResponseInterface,
    AxiosError
  >({
    mutationKey: DisplayListReactQueryKey.DeleteOutlet(),
    mutationFn: () => {
      const payload: DeleteOutletRequestInterface = {
        outlet_id: state.data.selected.id,
      };
      return fetchDeleteOutlet(payload);
    },
    retry: 0,

    onError(err) {
      if (err.response?.status === 405) {
        // dispatch({
        //   type: OutletListActionEnum.SetAlertValue,
        //   payload: {
        //     open: true,
        //     message: "",
        //     description: "",
        //     variant: "danger",
        //   },
        // });
      }
      dispatch({
        type: OutletListActionEnum.CloseDeleteConfirmationDialog,
      });
    },
    onSuccess(data) {
      if (data !== undefined) {
        dispatch({
          type: OutletListActionEnum.CloseDeleteConfirmationDialog,
        });

        queryClient.invalidateQueries({
          queryKey: DisplayListReactQueryKey.GetOutlets({
            search: state.data.search.value,
            limit: 6,
            sort_by: state.data.sort.by,
          }),
        });
      }
    },
  });

  return query;
};
