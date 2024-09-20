import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../i18n";
import { useAllScanImageInvalidGetAllScanImageInvalid } from "../react_query/hooks";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";

export const AllScanImageInvalidContainer = () => {
  const { data: allScanImageInvalid } =
    useAllScanImageInvalidGetAllScanImageInvalid();
  const navigate = useNavigate();
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  const handleClickTryAgain = () => {
    navigate(
      PrivateRouteURL.routeToCustomerScanAllImageInvalidURL({ locale: locale })
    );
  };

  const message =
    locale === "zh"
      ? allScanImageInvalid?.error.message.chinese
      : allScanImageInvalid?.error.message.english;

  return (
    <AppContainer>
      <VerticalFlexContainer>
        <div />

        <VerticalFlexGrow>
          <div
            className={clsx(
              "grid grid-cols-1 justify-center justify-items-center gap-y-[108px]",
              "pt-[154px]"
            )}
          >
            <div>
              <p
                className={clsx("text-[2rem] text-white font-bold text-center")}
              >
                {message}
              </p>
              <p
                className={clsx("text-[2rem] text-white font-bold text-center")}
              >
                {dictionaries.error.description}
              </p>
            </div>

            <img src={"/illustrations/invalid-scan.illustration.svg"} />
          </div>
        </VerticalFlexGrow>

        <Button variant="contained" onClick={handleClickTryAgain}>
          {dictionaries.error.actions.primary.toUpperCase()}
        </Button>
      </VerticalFlexContainer>
    </AppContainer>
  );
};
