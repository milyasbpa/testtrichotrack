import { useContext } from "react";
import clsx from "clsx";
import {
  CustomerRegistrationActionEnum,
  CustomerRegistrationContext,
} from "../../context";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { Card } from "src/core/ui/components/card/Card";

export const ProfilePicturePreviewCustomerRegistration = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerRegistrationContext);

  const handleClickRetake = () => {
    dispatch({
      type: CustomerRegistrationActionEnum.ClickRetakeProfilePicturePreview,
    });
  };
  const handleClickNext = () => {
    dispatch({
      type: CustomerRegistrationActionEnum.ClickYesProfilePicturePreview,
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
                "grid items-start content-start justify-center justify-items-center gap-y-[1.5rem] grid-cols-1",
                "w-full",
                "box-border"
              )}
            >
              <p
                className={clsx("text-[2rem] text-white font-bold text-center")}
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
        </div>
      </Card>
    </AppContainer>
  );
};
