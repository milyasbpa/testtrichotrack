import { useQuery } from "@tanstack/react-query";

import { ClientCameraStorageInterface } from "src/core/models/storage/app";
import { setClientCamera } from "src/core/storage/app";
import { useLocation, useParams } from "react-router-dom";
import { LocaleRoute, PrivateRouteURL } from "src/core/utils/router/constants";
import { AppReactQueryKey } from "../keys";

export const useAppSetClientCamera = () => {
  const { locale } = useParams();
  const location = useLocation();
  const payload: ClientCameraStorageInterface = {
    selected: null,
  };

  const query = useQuery<ClientCameraStorageInterface, any>({
    queryKey: AppReactQueryKey.SetClientCamera(),
    queryFn: () => {
      return setClientCamera(payload);
    },
    enabled:
      location.pathname ===
      PrivateRouteURL.routeToStaffLoginURL({
        locale: locale ?? LocaleRoute.default,
      }),
  });

  return query;
};
