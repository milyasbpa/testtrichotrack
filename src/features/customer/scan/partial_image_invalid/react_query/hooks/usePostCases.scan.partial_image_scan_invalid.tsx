import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  PostCasesErrorResponseInterface,
  PostCasesRequestInterface,
  PostCasesResponseInterface,
} from "src/core/models/api/cases";
import { fetchPostCases } from "src/core/services/case";
import {
  AllScanImageInvalidStorageInterface,
  ClientCameraStorageInterface,
  CompulsoryScanStorageInterface,
  CustomerIDStorageInterface,
  GlobalScanStorageInterface,
  PartialScanImageInvalidStorageInterface,
  SpotlightScanStorageInterface,
} from "src/core/models/storage/app";
import { AxiosError } from "axios";
import { GetDeviceResponseInterface } from "src/core/models/api/device";
import { PartialScanImageInvalidReactQueryKey } from "../keys/keys";
import { usePartialScanImageInvalidSetAllScanImageInvalid } from "./useSetAllScanImageInvalid.partial_image_invalid";
import { usePartialScanImageInvalidSetPartialScanImageInvalid } from "./useSetPartialScanimageInvalid.scan.partial_image_scan_invalid";
import { ENVIRONMENT } from "src/core/constants";
import { queryClient } from "src/core/utils/react_query";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";
import { useContext } from "react";

export const usePartialScanImageInvalidScalpPostCases = () => {
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);
  const { mutateAsync: setAllScanImageInvalid } =
    usePartialScanImageInvalidSetAllScanImageInvalid();
  const { mutateAsync: setPartialScanImageInvalid } =
    usePartialScanImageInvalidSetPartialScanImageInvalid();

  const clientCamera = queryClient.getQueryData(
    PartialScanImageInvalidReactQueryKey.GetClientCamera()
  ) as ClientCameraStorageInterface;
  const device = queryClient.getQueryData(
    PartialScanImageInvalidReactQueryKey.GetDevices()
  ) as GetDeviceResponseInterface;
  const customerID = queryClient.getQueryData(
    PartialScanImageInvalidReactQueryKey.GetCustomerID()
  ) as CustomerIDStorageInterface;
  const compulsoryScan = queryClient.getQueryData(
    PartialScanImageInvalidReactQueryKey.GetCompulsoryScan()
  ) as CompulsoryScanStorageInterface;
  const spotlightScan = queryClient.getQueryData(
    PartialScanImageInvalidReactQueryKey.GetSpotlightScan()
  ) as SpotlightScanStorageInterface;
  const globalScan = queryClient.getQueryData(
    PartialScanImageInvalidReactQueryKey.GetGlobalScan()
  ) as GlobalScanStorageInterface;

  const navigate = useNavigate();
  const { locale } = useParams();

  const isWirelessCamera =
    clientCamera?.selected?.connection.includes("WiFi") ||
    ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true";

  const mutation = useMutation<
    PostCasesResponseInterface,
    AxiosError<PostCasesErrorResponseInterface>
  >({
    mutationKey: PartialScanImageInvalidReactQueryKey.PostCases(),
    mutationFn: () => {
      const scans = [
        ...globalScan.data.map((item) => {
          return {
            image: item.image.replace("data:image/jpeg;base64,", ""),
            region: item.region,
          };
        }),
        ...compulsoryScan.data
          .sort((a, b) => a.order - b.order)
          .map((item) => {
            return {
              image: item.image.replace("data:image/jpeg;base64,", ""),
              region: item.region,
            };
          }),
        ...spotlightScan.data
          .sort((a, b) => a.order - b.order)
          .map((item) => {
            return {
              image: item.image.replace("data:image/jpeg;base64,", ""),
              region: item.region,
            };
          }),
      ];
      const payload: PostCasesRequestInterface = {
        customer_id: customerID?.id,
        camera_id:
          ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true"
            ? 1
            : ENVIRONMENT.MOCK_USB_MICROSCOPE === "true"
            ? 1
            : clientCamera.selected?.id ?? -1,
        device_mac: device.device_mac,
        scans: scans,
        // NOTE: need ask parameter cleanse state
        cleanse_state: "",
        // NOTE: need integrate outlet_id
        outlet_id: -1,
        with_global: !!globalScan.data.length,
      };
      return fetchPostCases(payload);
    },

    async onError(err) {
      if (!isWirelessCamera) {
        const videos = document.querySelectorAll("video");
        videos.forEach((video) => {
          const mediaStream = video.srcObject;
          const tracks = (mediaStream as any).getTracks();
          tracks.forEach((track: any) => {
            track.stop();
          });
        });
      }

      if (err.response?.status === 406) {
        const isImagesNotPartialError = err.response.data.detail.reduce(
          (acc, item) => {
            return acc || item.error_code < 200;
          },
          false
        );

        if (!isImagesNotPartialError) {
          let invalidScans: {
            error_message: {
              [key: string]: string;
            };
            order: number;
            id: number;
            icon: string;
            image: string;
            region: string;
          }[] = [];

          const allScan = [
            ...globalScan.data,
            ...compulsoryScan.data,
            ...spotlightScan.data,
          ];
          for (let i = 0; i < err.response?.data.detail.length; i++) {
            const scans = err.response?.data.detail[i].images;
            if (scans !== null) {
              for (let j = 0; j < allScan.length; j++) {
                if (scans.includes(allScan[j].order)) {
                  invalidScans = [
                    ...invalidScans,
                    {
                      ...allScan[j],
                      error_message: {
                        ...err.response.data.detail[i].description,
                      },
                    },
                  ];
                }
              }
            }
          }

          const payload: PartialScanImageInvalidStorageInterface = {
            retake_region_order: -1,
            orders: invalidScans.map((scan) => scan.order),
            scans: invalidScans,
          };
          await setPartialScanImageInvalid(payload);
          // reset get partial invalid image
          queryClient.invalidateQueries({
            queryKey:
              PartialScanImageInvalidReactQueryKey.GetPartialScanImageInvalid(),
          });
        } else {
          const payload: AllScanImageInvalidStorageInterface = {
            error: {
              message: {
                chinese: err.response.data.detail.reduce((acc, item, index) => {
                  return `${acc}${item.description} ${
                    index ===
                    (err.response?.data.detail.length
                      ? err.response.data.detail.length - 1
                      : 0)
                      ? ""
                      : ","
                  }`;
                }, ""),
                english: err.response.data.detail.reduce((acc, item, index) => {
                  return `${acc}${item.description} ${
                    index ===
                    (err.response?.data.detail.length
                      ? err.response.data.detail.length - 1
                      : 0)
                      ? ""
                      : ","
                  }`;
                }, ""),
              },
            },
          };
          await setAllScanImageInvalid(payload);
          navigate(
            PrivateRouteURL.routeToCustomerScanAllImageInvalidURL({
              locale: locale,
            })
          );
        }
      } else if (err.response?.status === 423) {
        navigate(
          PrivateRouteURL.routeToCustomerScanErrorURL({
            locale: locale,
          })
        );
      } else if (err.response?.status === 400) {
        navigate(
          PrivateRouteURL.routeToCustomerScanErrorURL({
            locale: locale,
          })
        );
      } else if (err.response?.status === 500) {
        navigate(
          PrivateRouteURL.routeToCustomerScanErrorURL({
            locale: locale,
          })
        );
      } else if (err.response?.status === 405) {
        if (String(err.response?.data.detail) === "The maximum limit reached") {
          navigate(
            PrivateRouteURL.routeToCustomerScanErrorMaximumLimitReachedURL({
              locale: locale,
            })
          );
        }
        if (
          String(err.response?.data.detail) === "Insufficient credit balance"
        ) {
          navigate(
            PrivateRouteURL.routeToCustomerScanErrorInsufficientCreditBalanceURL(
              {
                locale: locale,
              }
            )
          );
        }
      } else {
        navigate(
          PrivateRouteURL.routeToCustomerScanErrorURL({
            locale: locale,
          })
        );
      }
    },
    async onSuccess(data) {
      if (!isWirelessCamera) {
        const videos = document.querySelectorAll("video");
        videos.forEach((video) => {
          const mediaStream = video.srcObject;
          const tracks = (mediaStream as any).getTracks();
          tracks.forEach((track: any) => {
            track.stop();
          });
        });
      }

      if (!!data) {
        await dispatchApp({
          type: AppActionEnum.SetCasesData,
          payload: {
            ...appState.cases,
            data: {
              ...appState.cases.data,
              page: 0,
              data: [],
              selected: null,
            },
          },
        });
        navigate(PrivateRouteURL.routeToCustomerRecordURL({ locale: locale }));
      }
    },
  });

  return mutation;
};
