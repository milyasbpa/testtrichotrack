import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { AppReactQueryKey } from "../keys";
import { removeDevice } from "src/core/storage/app";
import { AppActionEnum, AppContext } from "../../context";

export const useAppRemoveDevice = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const query = useMutation({
    mutationKey: AppReactQueryKey.RemoveDevice(),
    mutationFn: () => {
      return removeDevice();
    },
    onSuccess() {
      dispatch({
        type: AppActionEnum.SetAuthData,
        payload: {
          ...state.auth,
          is_authenticated: false,
        },
      });
    },
  });

  return query;
};
