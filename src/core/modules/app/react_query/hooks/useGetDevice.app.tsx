import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { AppReactQueryKey } from "../keys";
import { getDevice } from "src/core/storage/app";
import { AppActionEnum, AppContext } from "../../context";
import moment from "moment";
import { useAppRemoveDevice } from "./useRemoveDevice.app";
import { DeviceStorageInterface } from "src/core/models/storage/app";

export const useAppGetDevice = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const { mutate: removeDevice } = useAppRemoveDevice();
  const query = useQuery<DeviceStorageInterface | undefined, any>({
    queryKey: AppReactQueryKey.GetDevice(),
    queryFn: () => {
      return getDevice();
    },
  });

  React.useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      const dateToCheck = moment(data.secret_client.expired_time);
      const now = moment();
      if (dateToCheck.isBefore(now)) {
        removeDevice();
      } else {
        dispatch({
          type: AppActionEnum.SetAuthData,
          payload: {
            ...state.auth,
            is_authenticated: true,
          },
        });
        dispatch({
          type: AppActionEnum.SetAuthData,
          payload: {
            ...state.auth,
            is_authenticated: true,
          },
        });
      }
    }
    if (query.data === null) {
      dispatch({
        type: AppActionEnum.SetAuthData,
        payload: {
          ...state.auth,
          is_authenticated: false,
        },
      });
    }
  }, [query?.data]);

  return query;
};
