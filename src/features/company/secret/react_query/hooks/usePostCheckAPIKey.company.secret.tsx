import { useMutation } from "@tanstack/react-query";

import { useContext } from "react";
import { UserLoginClientSecretReactQueryKey } from "../keys";
import { SecretCompanyContext } from "../../context";
import {
  PostCheckAPIKeyRequestInterface,
  PostCheckAPIKeySuccessResponseInterface,
} from "src/core/models/api/login";
import { fetchPostCheckAPIKey } from "src/core/services/login";
import {
  DeviceStorageInterface,
  RoleStorageInterface,
} from "src/core/models/storage/app";
import moment from "moment";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";
import { setDevice, setRole } from "src/core/storage/app";
import { LocaleRoute, PrivateRouteURL } from "src/core/utils/router/constants";
import { useNavigate, useParams } from "react-router-dom";
import { AppReactQueryKey } from "src/core/modules/app/react_query/keys";
import { queryClient } from "src/core/utils/react_query";

export const useClientSecretPostCheckAPIKey = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);
  const { state } = useContext(SecretCompanyContext);

  const { isPending: isPendingPostCheckAPIKey, mutateAsync: postCheckAPIKey } =
    useMutation<PostCheckAPIKeySuccessResponseInterface, undefined>({
      mutationKey: UserLoginClientSecretReactQueryKey.PostCheckAPIKey(),
      mutationFn: () => {
        const payload: PostCheckAPIKeyRequestInterface = {
          client_secret: state.form.secret.value,
        };
        return fetchPostCheckAPIKey(payload);
      },
    });

  const { isPending: isPendingSetDevice, mutateAsync: setDeviceStorage } =
    useMutation<DeviceStorageInterface, any, string>({
      mutationKey: UserLoginClientSecretReactQueryKey.SetAPIKey(),
      mutationFn: (data: string) => {
        const payload: DeviceStorageInterface = {
          mac_address: "",
          secret_client: {
            value: data,
            expired_time: moment()
              .add(1, "month")
              .format("YYYY-MM-DD HH:mm:ss"),
          },
        };
        return setDevice(payload);
      },
    });

  const { isPending: isPendingRoleStorage, mutateAsync: setRoleStorage } =
    useMutation<RoleStorageInterface>({
      mutationKey: UserLoginClientSecretReactQueryKey.SetRole(),
      mutationFn: () => {
        const payload: RoleStorageInterface = {
          name: null,
        };
        return setRole(payload);
      },
    });

  const onSubmit = async () => {
    await postCheckAPIKey()
      .then(() => {
        return setDeviceStorage(state.form.secret.value).then(() => {
          return setRoleStorage().then(() => {
            queryClient.invalidateQueries({
              queryKey: AppReactQueryKey.GetDevice(),
            });

            navigate(
              PrivateRouteURL.routeToStaffLoginURL({
                locale: locale ?? LocaleRoute.default,
              })
            );
          });
        });
      })
      .catch(() => {
        dispatchApp({
          type: AppActionEnum.SetNotificationData,
          payload: {
            ...appState.notification,
            items: [
              ...appState.notification.items,
              {
                variant: "danger",
                id: "ERROR_CLIENT_SECRET",
              },
            ],
          },
        });
      });
  };

  const isPending =
    isPendingPostCheckAPIKey || isPendingSetDevice || isPendingRoleStorage;
  return {
    isPending: isPending,
    onSubmit: onSubmit,
  };
};
