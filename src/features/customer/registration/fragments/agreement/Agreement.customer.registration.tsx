import { useContext } from "react";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import {
  CustomerRegistrationActionEnum,
  CustomerRegistrationContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import useNewPostCreateCustomer from "../../react_query/react_query/usePostCreateCustomer.customer_registration";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { Button } from "src/core/ui/components/button";
import { OptionalAgreementQuestionRegistration } from "../../components/optional_agreement_question/OptionalAgreementQuestion.registration";
import { CompulsoryAgreementQuestionRegistration } from "../../components/compulsory_agreement_question/CompulsoryAgreementQuestion.registration";
import { Stepper } from "src/core/ui/components/stepper";

export const AgreementCustomerRegistration = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerRegistrationContext);
  const { mutate: createCustomer } = useNewPostCreateCustomer();

  const handleClickSave = () => {
    createCustomer();
  };

  const handleClickBack = () => {
    dispatch({
      type: CustomerRegistrationActionEnum.ClickBackAgreement,
    });
  };

  const handleAnswer = (data: { [key: number]: undefined | string[] }) => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetAgreementAnswers,
      payload: data,
    });
  };

  const isSaveDisabled =
    !state.agreement.questionnaire.answers[1] ||
    state.agreement.questionnaire.answers[1].includes("No");

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
          <Stepper items={dictionaries.step.items} selected={3} />
          <h2 className={clsx("text-[2rem] text-white font-bold text-left")}>
            {dictionaries.agreement.title}
          </h2>
          <div
            className={clsx(
              "flex flex-grow overflow-y-auto overflow-x-hidden",
              "w-full h-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 gap-y-[2rem] items-start content-start justify-start justify-items-start",
                "w-full"
              )}
            >
              <CompulsoryAgreementQuestionRegistration
                id={1}
                answer={state.agreement.questionnaire.answers[1]}
                onAnswer={handleAnswer}
              />

              <OptionalAgreementQuestionRegistration
                id={2}
                answer={state.agreement.questionnaire.answers[2]}
                onAnswer={handleAnswer}
              />
            </div>
          </div>

          {/* actions */}
          <div
            className={clsx(
              "grid grid-cols-2 gap-x-[1.5rem]",
              "w-full",
              "box-border"
            )}
          >
            <Button variant={"outlined"} onClick={handleClickBack}>
              {dictionaries.agreement.actions.back.toUpperCase()}
            </Button>

            <Button disabled={isSaveDisabled} onClick={handleClickSave}>
              {dictionaries.agreement.actions.save.toUpperCase()}
            </Button>
          </div>
        </div>
      </Card>
    </AppContainer>
  );
};
