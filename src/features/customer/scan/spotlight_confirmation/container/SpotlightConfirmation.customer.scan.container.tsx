import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";

import { getDictionaries } from "../i18n";
import { FunFactModalSpotlightScanConfirmation } from "../components/fun_fact_modal";
import {
  useSpotlightScanConfirmationGetCompulsoryScan,
  useSpotlightScanConfirmationGetDevices,
  useSpotlightScanConfirmationPostCases,
  useSpotlightScanConfirmationSetSpotlightScan,
} from "../react_query/hooks";
import { useSpotlightScanConfirmationGetClientCamera } from "../react_query/hooks/useGetClientCamera.scan.spotlight_confirmation";
import { USBMicroscopeCamera } from "src/core/ui/components/usb_microscope_camera";
import { useSpotlightScanConfirmationGetGlobalScan } from "../react_query/hooks/useGetGlobalScan.scan.spotlight_confirmation";
import { AppContext } from "src/core/modules/app/context";
import { ENVIRONMENT } from "src/core/constants";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { Card } from "src/core/ui/components/card/Card";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const CustomerScanSpotlightConfirmationContainer = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const { state: appState } = useContext(AppContext);

  useSpotlightScanConfirmationGetClientCamera();
  useSpotlightScanConfirmationGetDevices();
  useSpotlightScanConfirmationGetCompulsoryScan();
  useSpotlightScanConfirmationGetGlobalScan();
  const { mutateAsync: setSpotlightScan } =
    useSpotlightScanConfirmationSetSpotlightScan();

  const isWirelessCamera =
    (appState.device.microscope.selected !== null &&
      appState.device.microscope.selected?.connection?.includes("WiFi")) ||
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

  const { mutateAsync: postCases, isPending: isLoadingPostCases } =
    useSpotlightScanConfirmationPostCases();

  const handleClickNo = async () => {
    await postCases();
  };
  const handleClickYes = async () => {
    await setSpotlightScan();
    const videos = document.querySelectorAll("video");
    if (!isWirelessCamera) {
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

  const isDinoLiteCamera =
    appState.device.microscope.selected?.name.includes("Dino-Lite") ||
    ENVIRONMENT.MOCK_DINO_LITE_MISCROSCOPE === "true";

  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <div />
          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center gap-y-[2rem]",
                "w-full"
              )}
            >
              <h3
                className={clsx("text-[2rem] text-white font-bold text-center")}
              >
                {dictionaries.confirmation.message}
              </h3>

              <img
                src={"/illustrations/scalp-scan.illustration.svg"}
                alt={"spotlight-another-confirmation"}
              />
            </div>
          </VerticalFlexGrow>

          <div
            className={clsx(
              "grid grid-cols-2 gap-x-[1.5rem]",
              "w-full",
              "box-border"
            )}
          >
            <Button variant={"outlined"} onClick={handleClickNo}>
              {dictionaries.confirmation.actions.secondary.toUpperCase()}
            </Button>

            <Button disabled={isLoadingPostCases} onClick={handleClickYes}>
              {dictionaries.confirmation.actions.primary.toUpperCase()}
            </Button>
          </div>
        </VerticalFlexContainer>
      </Card>

      <FunFactModalSpotlightScanConfirmation
        open={isLoadingPostCases}
        message={dictionaries.confirmation.fun_fact.message}
        description={dictionaries.confirmation.fun_fact.description}
        item={{
          title: dictionaries.confirmation.fun_fact.item.title,
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
