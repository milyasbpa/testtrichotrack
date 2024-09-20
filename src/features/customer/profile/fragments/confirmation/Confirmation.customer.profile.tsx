import { useContext } from "react";

import {
  CustomerProfileActionEnum,
  CustomerProfileContext,
} from "../../contexts";
import { AppContainer } from "src/core/modules/app/container";
import clsx from "clsx";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { Button } from "src/core/ui/components/button";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { useCustomerProfilePutUpdateCustomer } from "../../react_query/hooks/usePutUpdateCustomer.customer_profile";

export const ConfirmationCustomerProfile = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { mutate: updatePersonalData } = useCustomerProfilePutUpdateCustomer();
  const { dispatch } = useContext(CustomerProfileContext);

  const handleClickBack = () => {
    dispatch({
      type: CustomerProfileActionEnum.ClickNoConfirmation,
    });
  };
  const handleClickNext = () => {
    updatePersonalData();
  };

  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <div />

          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-1 place-items-center place-content-center gap-[58px]",
                "relative"
              )}
            >
              <p
                className={clsx("text-center text-[2rem] text-white font-bold")}
              >
                {dictionaries.profile_confirmation.message}
              </p>
              <img src={dictionaries.profile_confirmation.image_url} />
              <p
                className={clsx(
                  "text-center text-[1.25rem] text-white-60 font-normal"
                )}
              >
                {dictionaries.profile_confirmation.description}
              </p>
            </div>
          </VerticalFlexGrow>

          <div
            className={clsx(
              "grid grid-cols-2 place-content-start place-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <Button variant="outlined" onClick={handleClickBack}>
              {dictionaries.profile_confirmation.check_again}
            </Button>
            <Button onClick={handleClickNext}>
              {dictionaries.profile_confirmation.save}
            </Button>
          </div>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
