import { useQuery } from "@tanstack/react-query";
import { GetRootResponseInterface } from "src/core/models/api/default";
import { fetchGetDefaultRoot } from "src/core/services/default";
import { AppReactQueryKey } from "../keys";
import { useContext, useEffect } from "react";
import { AppActionEnum, AppContext } from "../../context";

export const useAppGetVersion = () => {
  const { state, dispatch } = useContext(AppContext);
  const query = useQuery<GetRootResponseInterface>({
    queryKey: AppReactQueryKey.GetVersion(),
    queryFn: () => {
      return fetchGetDefaultRoot();
    },
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      dispatch({
        type: AppActionEnum.SetVersionData,
        payload: {
          ...state.version,
          api: data.message,
        },
      });
    }
  }, [query.data]);

  return query;
};
