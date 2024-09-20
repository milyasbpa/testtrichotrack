import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ClientCameraStorageInterface } from "src/core/models/storage/app";
import { getClientCamera } from "src/core/storage/app";
import { SpotlightScanSelectionAreaReactQueryKey } from "../keys/keys";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";

export const useSpotlightScanSelectionAreaGetClientCamera = () => {
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);

  const query = useQuery<ClientCameraStorageInterface, AxiosError>({
    queryKey: SpotlightScanSelectionAreaReactQueryKey.GetClientCamera(),
    queryFn: () => {
      return getClientCamera();
    },
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      if (typeof data.selected !== "undefined") {
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
      } else {
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
    }
  }, [query.data, query.isFetching]);

  return query;
};
