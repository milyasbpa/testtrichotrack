import { useQuery } from "@tanstack/react-query";
import { StaffProfileReactQueryKey } from "../keys";
import { useContext, useEffect } from "react";
import { fetchGetOutlet } from "src/core/services/outlet";
import {
  GetOutlet200SuccessResponseInterface,
  GetOutletRequestInterface,
} from "src/core/models/api/outlet";
import { AppContext } from "src/core/modules/app/context";
import { StaffProfileContext } from "../../context";

export const useStaffProfileGetOutlet = () => {
  const { state: appState } = useContext(AppContext);
  const { state } = useContext(StaffProfileContext);

  const query = useQuery<GetOutlet200SuccessResponseInterface>({
    queryKey: StaffProfileReactQueryKey.GetOutlet(),
    queryFn: () => {
      const payload: GetOutletRequestInterface = {
        outlet_id: parseInt(state.form.outlets.selected?.id ?? "-1"),
      };
      return fetchGetOutlet(payload);
    },
    enabled: appState.auth.role === "EMPLOYEE" && !!state.form.outlets.selected,
  });

  useEffect(() => {
    if (!!query.data) {
      // const data = query.data;
      // dispatch({
      //   type: StaffProfileActionEnum.SetFormData,
      //   payload: {
      //     ...state.form.outlets.selected,
      //     name: data.name,
      //   },
      // });
    }
  }, [query.data]);

  return query;
};
