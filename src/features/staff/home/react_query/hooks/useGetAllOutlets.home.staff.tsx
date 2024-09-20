import { useQuery } from "@tanstack/react-query";
import { fetchGetAllOutlets } from "src/core/services/outlet";
import { GetAllOutletSuccessResponseInterface } from "src/core/models/api/outlet";
import { StaffHomeReactQueryKey } from "../keys";
import { useContext, useEffect } from "react";
import { StaffHomeActionEnum, StaffHomeContext } from "../../context";
import { AppContext } from "src/core/modules/app/context";

export const useStaffHomeGetAllOutlets = () => {
  const { state: appState } = useContext(AppContext);
  const { state, dispatch } = useContext(StaffHomeContext);

  const query = useQuery<GetAllOutletSuccessResponseInterface>({
    queryKey: StaffHomeReactQueryKey.GetAllOutlets(),
    queryFn: () => {
      return fetchGetAllOutlets();
    },
    enabled: !!appState.user.outlet,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      const outlet = data.find(
        (item) => item[1] === appState.user.outlet?.current_id
      );

      dispatch({
        type: StaffHomeActionEnum.SetOutletData,
        payload: {
          ...state.outlet,
          form: {
            ...state.outlet.form,
            items: data.map((item) => {
              return {
                id: String(item[1]),
                name: String(item[0]),
              };
            }),
            selected: {
              id: String(appState.user.outlet?.current_id ?? ""),
              name: !outlet ? "-" : String(outlet[0]),
            },
          },
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
