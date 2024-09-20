import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { AxiosError } from "axios";

import { ClientCameraStorageInterface } from "src/core/models/storage/app";
import { getClientCamera } from "src/core/storage/app";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";
import { StaffDeviceReactQueryKey } from "../keys";

export const useCameraGetClientCamera = () => {
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);

  const query = useQuery<ClientCameraStorageInterface, AxiosError>({
    queryKey: StaffDeviceReactQueryKey.GetClientCamera(),
    queryFn: () => {
      return getClientCamera();
    },
  });

  useEffect(() => {
    if (!!query.data && !!query.isFetching) {
      const data = query.data;
      dispatchApp({
        type: AppActionEnum.SetDeviceData,
        payload: {
          ...appState.device,
          microscope: {
            ...appState.device.microscope,
            selected: data.selected,
          },
        },
      });
    }
    if (!query.data && !query.isFetching) {
      dispatchApp({
        type: AppActionEnum.SetDeviceData,
        payload: {
          ...appState.device,
          microscope: {
            ...appState.device.microscope,
            selected: null,
          },
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
