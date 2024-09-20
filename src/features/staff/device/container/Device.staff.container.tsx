import clsx from "clsx";
import { HeaderStaffDevice } from "../fragments/header/Header.staff.device";

import { useNavigate, useParams } from "react-router-dom";
import { useCameraGetCameras } from "../react_query/hooks/useGetCameras.camera";
import { useCameraGetClientCamera } from "../react_query/hooks/useGetClientCamera.camera";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { Card } from "src/core/ui/components/card/Card";
import { getDictionaries } from "../i18n";
import { USBStaffDevice } from "../fragments/usb";
import { WirelessStaffDevice } from "../fragments/wireless";

export const StaffDeviceContainer = () => {
  useCameraGetClientCamera();
  useCameraGetCameras();
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  };
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem] w-full"
          )}
        >
          <HeaderStaffDevice />
          <USBStaffDevice />
          <WirelessStaffDevice />
        </div>
        <Button variant={"outlined"} onClick={handleClickBack}>
          {dictionaries.actions.back.toUpperCase()}
        </Button>
      </Card>
    </AppContainer>
  );
};
