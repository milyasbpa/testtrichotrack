import { useContext } from "react";
import clsx from "clsx";
import {
  CustomerProfileActionEnum,
  CustomerProfileContext,
} from "../../contexts";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { Button } from "src/core/ui/components/button";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";

export const ProfilePicturePreviewCustomerProfile = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerProfileContext);

  const handleClickRetake = () => {
    dispatch({
      type: CustomerProfileActionEnum.ClickRetakeProfilePicturePreview,
    });
  };
  const handleClickNext = () => {
    dispatch({
      type: CustomerProfileActionEnum.ClickYesProfilePicturePreview,
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
                  "grid items-start content-start justify-center justify-items-center gap-y-[1.5rem] grid-cols-1",
                  "w-full",
                  "box-border"
                )}
              >
                <p
                  className={clsx(
                    "text-[2rem] text-white font-bold text-center"
                  )}
                >
                  {dictionaries.profile_picture_preview.message}
                </p>
                <p
                  className={clsx(
                    "text-[1.25rem] text-white-60 font-regular text-center"
                  )}
                >
                  {dictionaries.profile_picture_preview.description}
                </p>

                <img
                  className={clsx(
                    "rounded-[1rem]",
                    "w-[480px] h-[640px]",
                    "object-cover",
                    "scale-x-[-1]"
                  )}
                  src={state.global.profile_picture.new_value}
                />
              </div>
            </div>
          </VerticalFlexGrow>

          <div
            className={clsx(
              "grid grid-cols-2 gap-x-[1.5rem]",
              "w-full",
              "box-border"
            )}
          >
            <Button variant={"outlined"} onClick={handleClickRetake}>
              {dictionaries.profile_picture_preview.retake.toUpperCase()}
            </Button>

            <Button onClick={handleClickNext}>
              {dictionaries.profile_picture_preview.yes.toUpperCase()}
            </Button>
          </div>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
