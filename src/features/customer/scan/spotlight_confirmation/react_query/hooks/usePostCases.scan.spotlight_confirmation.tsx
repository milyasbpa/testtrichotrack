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
  GlobalScanStorageInterface,
  PartialScanImageInvalidStorageInterface,
} from "src/core/models/storage/app";
import { AxiosError } from "axios";
import { GetDeviceResponseInterface } from "src/core/models/api/device";
import { SpotlightScanConfirmationReactQueryKey } from "../keys/keys";
import { useSpotlightScanConfirmationSetAllScanImageInvalid } from "./useSetAllScanImageInvalid.spotlight_confirmation";
import { useSpotlightScanConfirmationSetPartialScanImageInvalid } from "./useSetPartialScanImageInvalid.spotlight_confirmation";
import { queryClient } from "src/core/utils/react_query";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { ENVIRONMENT } from "src/core/constants";
import { useContext } from "react";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";

export const useSpotlightScanConfirmationPostCases = () => {
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);

  const { mutateAsync: setAllScanImageInvalid } =
    useSpotlightScanConfirmationSetAllScanImageInvalid();
  const { mutateAsync: setPartialScanImageInvalid } =
    useSpotlightScanConfirmationSetPartialScanImageInvalid();

  const device = queryClient.getQueryData(
    SpotlightScanConfirmationReactQueryKey.GetDevices()
  ) as GetDeviceResponseInterface;
  const clientCamera = queryClient.getQueryData(
    SpotlightScanConfirmationReactQueryKey.GetClientCamera()
  ) as ClientCameraStorageInterface;
  const compulsoryScan = queryClient.getQueryData(
    SpotlightScanConfirmationReactQueryKey.GetCompulsoryScan()
  ) as CompulsoryScanStorageInterface;
  const globalScan = queryClient.getQueryData(
    SpotlightScanConfirmationReactQueryKey.GetGlobalScan()
  ) as GlobalScanStorageInterface;

  const navigate = useNavigate();
  const { locale } = useParams();

  const isWirelessCamera =
    clientCamera?.selected?.connection?.includes("WiFi") ||
    ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true";

  const mutation = useMutation<
    PostCasesResponseInterface,
    AxiosError<PostCasesErrorResponseInterface>
  >({
    mutationKey: SpotlightScanConfirmationReactQueryKey.PostCases(),
    mutationFn: () => {
      const scans = [
        ...globalScan.data.map((item) => {
          return {
            image: item.image.replace("data:image/jpeg;base64,", ""),
            region: item.region,
          };
        }),
        ...compulsoryScan.data.map((item) => {
          return {
            image: item.image.replace("data:image/jpeg;base64,", ""),
            region: item.region,
          };
        }),
      ];
      const payload: PostCasesRequestInterface = {
        customer_id: appState.user.customer?.id ?? -1,
        camera_id:
          ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true"
            ? 1
            : ENVIRONMENT.MOCK_USB_MICROSCOPE === "true"
            ? 1
            : clientCamera.selected?.id ?? -1,
        device_mac: device?.device_mac ?? "6C:E5:C9:BB:73:37",
        scans: scans,
        // NOTE: need ask parameter cleanse state
        cleanse_state: "Not Cleansed",
        // NOTE: need integrate outlet_id
        outlet_id: 2,
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

          const allScan = [...compulsoryScan.data];
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
          navigate(
            PrivateRouteURL.routeToCustomerScanViewPartialImageInvalidURL({
              locale: locale,
            })
          );
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
      if (!!data) {
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
