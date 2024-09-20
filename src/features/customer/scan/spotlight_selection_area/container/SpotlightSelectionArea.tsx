import { useContext, useEffect } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../i18n";
import { FaceAreaSpotlightScanSelectionArea } from "../components/face_area";
import { SpotlightPreviewPictureSpotlightScanSelectionArea } from "../components/spotlight_preview_picture";
import { useForm } from "react-hook-form";
import { SpotlightScanAreaSelectionForm } from "../react_hook_form/data";
import { useSpotlightScanSelectionAreaSetSpotlightScan } from "../react_query/hooks";

import { useSpotlightScanSelectionAreaGetSpotlightScan } from "../react_query/hooks/useGetSpotlightScan.scan.spotlight_selection_area";
import { USBMicroscopeCamera } from "src/core/ui/components/usb_microscope_camera";
import { useSpotlightScanSelectionAreaGetClientCamera } from "../react_query/hooks/useGetClientCamera.scan.spotlight_selection_area";
import { useSpotlightScanSelectionAreaGetGlobalScan } from "../react_query/hooks/useGetGlobalScan.scan.spotlight_selection_area";
import { AppContext } from "src/core/modules/app/context";
import { ENVIRONMENT } from "src/core/constants";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { Card } from "src/core/ui/components/card/Card";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const SpotlightScanSelectionAreaContainer = () => {
  const navigate = useNavigate();
  const { watch, setValue } = useForm<SpotlightScanAreaSelectionForm>();

  useSpotlightScanSelectionAreaGetClientCamera();
  const { data: globalScan } = useSpotlightScanSelectionAreaGetGlobalScan();
  const { data: spotlightScan } =
    useSpotlightScanSelectionAreaGetSpotlightScan();

  const { mutateAsync: setSpotlightScan } =
    useSpotlightScanSelectionAreaSetSpotlightScan();

  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);

  const { state: appState } = useContext(AppContext);

  const isWirelessCamera =
    (appState.device.microscope.selected !== null &&
      appState.device.microscope.selected?.connection.includes("WiFi")) ||
    ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true";

  useEffect(() => {
    if (spotlightScan) {
      setValue("index", spotlightScan.index);
      setValue("data", spotlightScan.data);
    }
  }, [spotlightScan]);

  const handleClickRetake = async () => {
    const payload = watch("data").map((item, index) => {
      return {
        ...item,
        order:
          index === watch("index")
            ? (!!globalScan?.data && !globalScan.data.length ? 4 : 6) +
              watch("data").length
            : item.order,
        id: index === watch("index") ? -1 : item.id,
        icon: index === watch("index") ? "" : item.icon,
        region: index === watch("index") ? "" : item.region,
        image: index === watch("index") ? "" : item.image,
      };
    });
    await setSpotlightScan(payload);
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

    navigate(
      PrivateRouteURL.routeToCustomerScanSpotlightAreaURL({ locale: locale })
    );
  };

  const handleClickSave = async () => {
    await setSpotlightScan(watch("data"));
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

    navigate(
      PrivateRouteURL.routeToCustomerScanAnotherTakeConfirmationURL({
        locale: locale,
      })
    );
  };

  const handleClickSelectionArea = (value: string) => {
    if (parseInt(value) <= 4) {
      return;
    }
    const inclusion = watch("data")
      .map((item) => item.region)
      .includes(value);

    const payload = watch("data").map((item, index) => {
      return {
        ...item,
        id:
          index === watch("index") && !inclusion
            ? appDictionaries.cases.region.items.find(
                (regionItem) => regionItem.region_number === item.id
              )?.region_number ?? -1
            : item.id,
        icon:
          index === watch("index") && !inclusion
            ? `/icons/face_area/face-area-${
                appDictionaries.cases.region.items.find(
                  (regionItem) => regionItem.region_number === item.id
                )?.region_number ?? -1
              }.icon.svg`
            : item.icon,
        region: index === watch("index") && !inclusion ? value : item.region,
      };
    });
    setValue("data", payload);
  };

  if (watch("data") === undefined) {
    return null;
  }

  const isDinoLiteCamera =
    appState.device.microscope.selected?.name.includes("Dino-Lite") ||
    ENVIRONMENT.MOCK_DINO_LITE_MISCROSCOPE === "true";

  const selectedSpotlight =
    watch("data").length > 0 ? watch("data").map((item) => item.region) : [];

  const spotlightItems = appDictionaries.cases.region.items
    .filter((item) => !!item.position)
    .sort((a, b) => a.position.order - b.position.order)
    .map((item) => {
      return {
        id: item.region_number.toString(),
        style: {
          opacity:
            item.region_number <= 4
              ? 1
              : selectedSpotlight.includes(String(item.region_number))
              ? 1
              : 0.4,
          top: item.position.top,
          left: item.position.left,
        },
        image_url: `/illustrations/face_area/area${item.region_number}.illustration.svg`,
      };
    });
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <div
          className={clsx(
            "flex flex-col justify-between gap-y-[1.5rem]",
            "relative",
            "min-h-[calc(100vh_-_200px)] h-auto w-full",
            "p-[1.5rem]",
            "box-border",
            "rounded-[1.5rem]"
          )}
          style={{
            background:
              "linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04)), #121212",
          }}
        >
          <div
            className={clsx(
              "grid grid-cols-1 justify-center justify-items-center gap-y-[94px]",
              "pt-[154px]"
            )}
          >
            <p className={clsx("text-[2rem] text-white font-bold text-center")}>
              {dictionaries.message}
            </p>

            <div
              className={clsx(
                "grid grid-cols-1 justify-center justify-items-center items-start content-start gap-y-[2rem]"
              )}
            >
              <div
                className={clsx(
                  "grid grid-cols-2 justify-center justify-items-center items-center content-center gap-x-[2rem]",
                  "w-full"
                )}
              >
                <SpotlightPreviewPictureSpotlightScanSelectionArea
                  image={
                    watch("data").length > 0
                      ? watch("data")[watch("index")].image
                      : ""
                  }
                />

                <FaceAreaSpotlightScanSelectionArea
                  items={spotlightItems}
                  onClick={handleClickSelectionArea}
                />
              </div>

              <p
                className={clsx(
                  "text-[1.5rem] font-bold text-center",
                  watch("data").length > 0 &&
                    watch("data")[watch("index")].region.length > 0
                    ? "text-philippine-green"
                    : "text-white-80"
                )}
              >
                {watch("data").length > 0 &&
                watch("data")[watch("index")].region.length > 0
                  ? appDictionaries.cases.region.items.find(
                      (regionItem) =>
                        regionItem.id === watch("data")[watch("index")].region
                    )?.name ?? ""
                  : dictionaries.no_area_selected}
              </p>
            </div>
          </div>

          <div
            className={clsx(
              "grid grid-cols-2 place-content-center place-items-center gap-x-[2rem]",
              "w-full"
            )}
          >
            <Button variant={"outlined"} onClick={handleClickRetake}>
              {dictionaries.actions.secondary.toUpperCase()}
            </Button>

            <Button
              disabled={
                !watch("data").length
                  ? true
                  : !watch("data")[watch("index")].region.length
              }
              onClick={handleClickSave}
            >
              {dictionaries.actions.primary.toUpperCase()}
            </Button>
          </div>
        </div>
      </Card>

      {!isDinoLiteCamera && !isWirelessCamera && (
        <div className={clsx("hidden")}>
          <USBMicroscopeCamera />
        </div>
      )}
    </AppContainer>
  );
};
