import { useContext, useRef } from "react";
import clsx from "clsx";
import Webcam from "react-webcam";
import { useParams } from "react-router-dom";
import {
  CustomerRegistrationActionEnum,
  CustomerRegistrationContext,
} from "../../context";
import { AppContainer } from "src/core/modules/app/container";
import { getDictionaries } from "../../i18n";
import { Button } from "src/core/ui/components/button";
import { PhotoCamera } from "src/core/ui/components/photo_camera";
import { Card } from "src/core/ui/components/card/Card";

export const ProfilePictureCustomerRegistration = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { dispatch } = useContext(CustomerRegistrationContext);
  const webcamRef = useRef<Webcam>(null);

  const handleClickTakeAPicture = () => {
    if (webcamRef.current !== null) {
      const image = String(webcamRef.current.getScreenshot());

      dispatch({
        type: CustomerRegistrationActionEnum.ChangeProfilePictureValue,
        payload: image,
      });
    }
  };

  const handleClickBack = () => {
    dispatch({
      type: CustomerRegistrationActionEnum.ClickBackProfilePicture,
    });
  };

  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <div
          className={clsx(
            "flex flex-col items-start justify-start gap-[1.5rem]",
            "w-full h-full",
            "px-[1.5rem] py-[1.5rem]"
          )}
        >
          <div
            className={clsx(
              "flex flex-grow overflow-y-auto overflow-x-hidden",
              "w-full h-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-y-[1.5rem]",
                "w-full",
                "box-border"
              )}
            >
              <p
                className={clsx("text-[2rem] text-white font-bold text-center")}
              >
                {dictionaries.profile_picture.message}
              </p>
              <p
                className={clsx(
                  "text-[1.25rem] text-white-60 font-regular text-center"
                )}
              >
                {dictionaries.profile_picture.description}
              </p>

              <PhotoCamera webcamRef={webcamRef} watermark={true} />
            </div>
          </div>

          <div
            className={clsx(
              "grid grid-cols-2 gap-x-[1.5rem]",
              "w-full",
              "box-border"
            )}
          >
            <Button variant={"outlined"} onClick={handleClickBack}>
              {dictionaries.profile_picture.back.toUpperCase()}
            </Button>

            <Button onClick={handleClickTakeAPicture}>
              {dictionaries.profile_picture.take_a_picture.toUpperCase()}
            </Button>
          </div>
        </div>
      </Card>
    </AppContainer>
  );
};
