import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";

import { getDictionaries } from "../i18n";
import {
  usePartialScanImageInvalidGetPartialScanImageInvalid,
  usePartialScanImageInvalidScalpPostCases,
} from "../react_query/hooks";
import { PreviewCardPartialScanImageInvalid } from "../components/preview_card/PreviewCard.scan.partial_image_invalid";
import { FunFactModalPartialScanImageInvalid } from "../components/fun_fact_modal";
import { usePartialScanImageInvalidSetPartialScanImageInvalid } from "../react_query/hooks/useSetPartialScanimageInvalid.scan.partial_image_scan_invalid";
import { PartialScanImageInvalidStorageInterface } from "src/core/models/storage/app";
import { usePartialScanImageInvalidGetSpotlightScan } from "../react_query/hooks/useGetSpotlightScan.scan.partial_image_scan_invalid";
import { usePartialScanImageInvalidGetCompulsoryScan } from "../react_query/hooks/useGetCompulsoryScan.scan.partial_image_invalid";
import { usePartialScanImageInvalidGetDevices } from "../react_query/hooks/useGetDevices.scan.partial_image_scan_invalid";
import { usePartialScanImageInvalidGetClientCamera } from "../react_query/hooks/useGetClientCamera.scan.partial_image_invalid";
import { usePartialScanImageInvalidGetGlobalScan } from "../react_query/hooks/useGetGlobalScan.scan.partial_image_invalid";
import { ENVIRONMENT } from "src/core/constants";
import { AppContext } from "src/core/modules/app/context";
import { AppContainer } from "src/core/modules/app/container";
import { USBMicroscopeCamera } from "src/core/ui/components/usb_microscope_camera";
import { Card } from "src/core/ui/components/card/Card";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const PartialInvalidImageScanContainer = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const { state: appState } = useContext(AppContext);

  usePartialScanImageInvalidGetClientCamera();
  usePartialScanImageInvalidGetDevices();
  usePartialScanImageInvalidGetCompulsoryScan();
  usePartialScanImageInvalidGetSpotlightScan();
  usePartialScanImageInvalidGetGlobalScan();

  const { mutateAsync: postCases, isPending: isLoadingPostCases } =
    usePartialScanImageInvalidScalpPostCases();

  const isWirelessCamera =
    (appState.device.microscope.selected !== null &&
      appState.device.microscope.selected?.connection.includes("WiFi")) ||
    ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true";

  const [selectedFunFact, setSelectedFunFact] = useState(
    Math.floor(Math.random() * 20)
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedFunFact(Math.floor(Math.random() * 20));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { data: partialScanImageInvalid } =
    usePartialScanImageInvalidGetPartialScanImageInvalid();
  const { mutateAsync: setPartialScanImageInvalid } =
    usePartialScanImageInvalidSetPartialScanImageInvalid();

  const handleClickRetake = async (value: number) => {
    if (partialScanImageInvalid) {
      const payload: PartialScanImageInvalidStorageInterface = {
        ...partialScanImageInvalid,
        retake_region_order: value,
      };
      await setPartialScanImageInvalid(payload);
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
        PrivateRouteURL.routeToCustomerScanRetakePartialInvalidImageURL({
          locale: locale,
        }),
        {
          replace: true,
        }
      );
    }
  };

  const handleClickNext = async () => {
    await postCases();
  };

  const invalidScans =
    partialScanImageInvalid?.scans.map((scan) => {
      return {
        ...scan,
        valid: partialScanImageInvalid?.orders.includes(scan.order)
          ? false
          : true,
      };
    }) || [];

  const isDinoLiteCamera =
    appState.device.microscope.selected?.name.includes("Dino-Lite") ||
    ENVIRONMENT.MOCK_DINO_LITE_MISCROSCOPE === "true";

  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <div
          className={clsx(
            "grid grid-cols-2 place-content-start place-items-start gap-[1.5rem]",
            "w-full"
          )}
        >
          {invalidScans.map((item, index) => (
            <PreviewCardPartialScanImageInvalid
              key={index}
              region={item.region}
              image={item.image}
              icon={item.icon}
              value={item.order}
              valid={item.valid}
              description={
                locale === "zh"
                  ? item.error_message["Chinese"]
                  : item.error_message["English"]
              }
              message={dictionaries.error.message}
              actions={dictionaries.error.card.actions}
              onRetake={handleClickRetake}
            />
          ))}
        </div>

        <button
          className={clsx(
            "flex items-center justify-center",
            "w-full",
            "p-[1rem]",
            "bg-dartmouth-green disabled:bg-granite-gray",
            "rounded-[0.5rem]"
          )}
          disabled={(partialScanImageInvalid?.orders ?? []).length > 0}
          onClick={handleClickNext}
        >
          <p className={clsx("text-[1.25rem] text-white font-bold uppercase")}>
            {dictionaries.error.actions.primary}
          </p>
        </button>
      </Card>
      <FunFactModalPartialScanImageInvalid
        open={isLoadingPostCases}
        message={dictionaries.error.fun_fact.message}
        description={dictionaries.error.fun_fact.description}
        item={{
          title: dictionaries.error.fun_fact.item.title,
          message: (
            appDictionaries.cases.fun_facts as { [key: string]: string }
          )[String(selectedFunFact)],
        }}
      />
      {!isDinoLiteCamera && !isWirelessCamera && (
        <div className={clsx("hidden")}>
          <USBMicroscopeCamera />
        </div>
      )}
    </AppContainer>
  );
};
