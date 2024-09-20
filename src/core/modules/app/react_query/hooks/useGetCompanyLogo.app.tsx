import { useQuery } from "@tanstack/react-query";
import { fetchGetCompanyLogo } from "src/core/services/configuration";
import {
  GetCompanyLogoRequestInterface,
  GetCompanyLogoResponseInterface,
} from "src/core/models/api/configuration";
import { queryClient } from "src/core/utils/react_query";
import { AppReactQueryKey } from "../keys";
import { DeviceStorageInterface } from "src/core/models/storage/app";
import { useContext, useEffect } from "react";
import { AppActionEnum, AppContext } from "../../context";
import { useLocation, useParams } from "react-router-dom";
import { LocaleRoute, PublicRouteURL } from "src/core/utils/router/constants";

export const useAppGetCompanyLogo = () => {
  const { state, dispatch } = useContext(AppContext);
  const device = queryClient.getQueryData(AppReactQueryKey.GetDevice()) as
    | DeviceStorageInterface
    | undefined;
  const { locale } = useParams();
  const location = useLocation();
  const pathname = location.pathname;

  const query = useQuery<GetCompanyLogoResponseInterface>({
    queryKey: AppReactQueryKey.GetCompanyLogo(),
    queryFn: () => {
      const payload: GetCompanyLogoRequestInterface = {
        apiKey: device?.secret_client.value ?? "",
      };
      return fetchGetCompanyLogo(payload);
    },
    enabled:
      !!device &&
      pathname !==
        PublicRouteURL.routeToClientSecretURL({
          locale: locale ?? LocaleRoute.default,
        }),
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      dispatch({
        type: AppActionEnum.SetCompanyData,
        payload: {
          ...state.company,
          image_url: data.detail,
        },
      });
    }
  }, [query.data]);

  return query;
};
