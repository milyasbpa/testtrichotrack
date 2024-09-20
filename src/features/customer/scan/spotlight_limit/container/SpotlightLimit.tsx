import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { FunFactModalSpotlightScanLimit } from "../components/fun_fact_modal";
import {
  useSpotlightScanLimitGetCompulsoryScan,
  useSpotlightScanLimitGetSpotlightScan,
  useSpotlightScanLimitScalpGetDevices,
  useSpotlightScanLimitScalpPostCases,
} from "../react_query/hooks";
import { useSpotlightScanLimitGetClientCamera } from "../react_query/hooks/useGetClientCamera.scan.spotlight_limit";
import { USBMicroscopeCamera } from "src/core/ui/components/usb_microscope_camera";
import { useSpotlightScanLimitGetGlobalScan } from "../react_query/hooks/useGetGlobalScan.scan.spotlight_limit";
import { useParams } from "react-router-dom";
import { AppContext } from "src/core/modules/app/context";
import { ENVIRONMENT } from "src/core/constants";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const SpotlightLimitScanContainer = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const { state: appState } = useContext(AppContext);

  useSpotlightScanLimitGetClientCamera();
  useSpotlightScanLimitScalpGetDevices();
  useSpotlightScanLimitGetCompulsoryScan();
  useSpotlightScanLimitGetSpotlightScan();
  useSpotlightScanLimitGetGlobalScan();

  const isWirelessCamera =
    (appState.device.microscope.selected !== null &&
      appState.device.microscope.selected?.connection.includes("WiFi")) ||
    ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true";

  const { mutateAsync: postCases, isPending: isLoadingPostCases } =
    useSpotlightScanLimitScalpPostCases();

  const [selectedFunFact, setSelectedFunFact] = useState(
    Math.floor(Math.random() * 20)
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedFunFact(Math.floor(Math.random() * 20));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleClickYes = async () => {
    await postCases();
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
                "grid grid-cols-1 justify-center justify-items-center gap-y-[108px]",
                "pt-[154px]"
              )}
            >
              <p
                className={clsx("text-[2rem] text-white font-bold text-center")}
              >
                {dictionaries.limit.message}
              </p>
              <img src={"/illustrations/scalp-scan.illustration.svg"} />
            </div>
          </VerticalFlexGrow>

          <Button disabled={isLoadingPostCases} onClick={handleClickYes}>
            {dictionaries.limit.actions.primary.toUpperCase()}
          </Button>
        </VerticalFlexContainer>
      </Card>

      <FunFactModalSpotlightScanLimit
        open={!isLoadingPostCases}
        message={dictionaries.limit.fun_fact.message}
        description={dictionaries.limit.fun_fact.description}
        item={{
          title: dictionaries.limit.fun_fact.item.title,
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
