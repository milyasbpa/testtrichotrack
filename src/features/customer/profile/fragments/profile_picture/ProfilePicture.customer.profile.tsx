import { useContext, useRef } from "react";
import clsx from "clsx";
import Webcam from "react-webcam";
import {
  CustomerProfileActionEnum,
  CustomerProfileContext,
} from "../../contexts";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { Button } from "src/core/ui/components/button";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { PhotoCamera } from "src/core/ui/components/photo_camera";

export const ProfilePictureCustomerProfile = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { dispatch } = useContext(CustomerProfileContext);
  const webcamRef = useRef<Webcam>(null);

  const handleClickTakeAPicture = () => {
    if (webcamRef.current !== null) {
      const image = String(webcamRef.current.getScreenshot());

      dispatch({
        type: CustomerProfileActionEnum.ChangeProfilePictureValue,
        payload: image,
      });
      dispatch({
        type: CustomerProfileActionEnum.ClickTakeAPictureProfilePicture,
      });
    }
  };

  const handleClickBack = () => {
    dispatch({
      type: CustomerProfileActionEnum.ClickBackProfilePicture,
    });
  };
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <VerticalFlexGrow>
            <div
              className={clsx(
                "flex flex-col justify-between items-center gap-x-[1.5rem]",
                "w-full"
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
                  className={clsx(
                    "text-[2rem] text-white font-bold text-center"
                  )}
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
          </VerticalFlexGrow>

          <div
            className={clsx(
              "grid grid-cols-2 place-content-center place-items-center gap-x-[1.5rem]",
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
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
