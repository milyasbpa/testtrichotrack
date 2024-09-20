import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GlobalScanExamplesReactQueryKey } from "../keys/keys";
import { GlobalScanStorageInterface } from "src/core/models/storage/app";
import { setGlobalScan } from "src/core/storage/app";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const useGlobalScanExamplesSetGlobalScan = () => {
  const { locale } = useParams();
  const navigate = useNavigate();
  const mutation = useMutation<
    GlobalScanStorageInterface,
    AxiosError,
    { skip: boolean }
  >({
    mutationKey: GlobalScanExamplesReactQueryKey.SetGlobalScan(),
    mutationFn: (data: { skip: boolean }) => {
      const payload: GlobalScanStorageInterface = {
        image: "",
        counter_modal: {
          is_open: false,
        },
        active_region: 0,
        data: data.skip
          ? []
          : [
              {
                order: 1,
                id: 17,
                icon: "/icons/face_area/face-area-17.icon.svg",
                image: "",
                region: "Frontal Overhead",
              },
              {
                order: 2,
                id: 18,
                icon: "/icons/face_area/face-area-18.icon.svg",
                image: "",
                region: "Rear Overhead",
              },
            ],
      };
      return setGlobalScan(payload);
    },
    onSuccess(data) {
      if (!data.data.length) {
        navigate(
          PrivateRouteURL.routeToCustomerScanGlobalSkipURL({ locale: locale })
        );
      } else {
        navigate(
          PrivateRouteURL.routeToCustomerScanGlobalURL({ locale: locale })
        );
      }
    },
  });

  return mutation;
};
