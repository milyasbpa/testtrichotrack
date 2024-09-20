import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { StaffEditContext } from "src/features/staff/edit/contexts/Edit.staff.context";
import { fetchGetOutlet } from "src/core/services/outlet";
import {
  GetOutlet200SuccessResponseInterface,
  GetOutletRequestInterface,
} from "src/core/models/api/outlet";
import { StaffEditActionEnum } from "../../contexts/Edit.staff.types";
import { AppContext } from "src/core/modules/app/context";
import { StaffEditReactQueryKey } from "../keys";

export const useStaffEditGetOutlet = () => {
  const { state: appState } = useContext(AppContext);
  const { state, dispatch } = useContext(StaffEditContext);

  const query = useQuery<GetOutlet200SuccessResponseInterface>({
    queryKey: StaffEditReactQueryKey.GetOutlet(),
    queryFn: () => {
      const payload: GetOutletRequestInterface = {
        outlet_id: parseInt(state.form.outlets.selected?.id ?? "-1"),
      };
      return fetchGetOutlet(payload);
    },
    enabled:
      appState.auth.role === "EMPLOYEE" && !!state.form.outlets.data.length,
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      dispatch({
        type: StaffEditActionEnum.SetFormData,
        payload: {
          ...state.form,
          outlets: {
            ...state.form.outlets,
            selected: {
              id: state.form.outlets.selected?.id ?? "-1",
              name: data.name,
            },
          },
        },
      });
    }
  }, [query.data]);

  return query;
};
