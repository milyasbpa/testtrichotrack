import { useContext } from "react";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import clsx from "clsx";
import {
  CustomerQuestionnaireActionEnum,
  CustomerQuestionnaireContext,
} from "../../context";
import useUpdateConfirmationPutUpdateCustomerQuestionnaire from "../../react_query/hooks/usePutUpdateQuestionnaire.customer_questionnaire";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { Button } from "src/core/ui/components/button";

export const ConfirmationCustomerQuestionnaire = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { mutate: updateCustomerQuestionnaire } =
    useUpdateConfirmationPutUpdateCustomerQuestionnaire();
  const { dispatch } = useContext(CustomerQuestionnaireContext);

  const handleClickBack = () => {
    dispatch({
      type: CustomerQuestionnaireActionEnum.ClickBackUpdateConfirmation,
    });
  };
  const handleClickNext = () => {
    updateCustomerQuestionnaire();
  };

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
              <div>
                <p
                  className={clsx(
                    "text-[2rem] text-white font-bold text-center"
                  )}
                >
                  {dictionaries.edit_confirmation.message}
                </p>
                <p
                  className={clsx(
                    "text-[2rem] text-white font-bold text-center"
                  )}
                >
                  {dictionaries.edit_confirmation.description}
                </p>
              </div>

              <img src={dictionaries.edit_confirmation.image_url} />
            </div>
          </VerticalFlexGrow>

          <div
            className={clsx(
              "grid grid-cols-2 gap-[1.5rem] place-content-center place-items-center",
              "w-full"
            )}
          >
            <Button variant={"outlined"} onClick={handleClickBack}>
              {dictionaries.edit_confirmation.actions.check_again.toUpperCase()}
            </Button>

            <Button onClick={handleClickNext}>
              {dictionaries.edit_confirmation.actions.save.toUpperCase()}
            </Button>
          </div>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
