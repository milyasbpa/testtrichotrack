import React, { useContext, useMemo } from "react";
import clsx from "clsx";
import { QuestionnaireQuestionRegistration } from "../../components/questionnaire_question";
import { QuestionnaireNavigationRegistration } from "../../components/questionnaire_navigation/QuestionnaireNavigation.registration";
import { GetQuestionnaireResponseInterface } from "src/core/models/api/configuration";
import { CustomerRegistrationReactQueryKey } from "../../react_query/keys";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import {
  CustomerRegistrationActionEnum,
  CustomerRegistrationContext,
} from "../../context";
import { queryClient } from "src/core/utils/react_query";
import { AppContainer } from "src/core/modules/app/container";
import { Stepper } from "src/core/ui/components/stepper";
import { Card } from "src/core/ui/components/card/Card";
import { Button } from "src/core/ui/components/button";

export const QuestionnaireCustomerRegistration = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  const { state, dispatch } = useContext(CustomerRegistrationContext);

  const questionnaireRawData = queryClient.getQueryData(
    CustomerRegistrationReactQueryKey.GetQuestionnaire({
      language: locale === "zh" ? "Chinese" : "English",
    })
  ) as GetQuestionnaireResponseInterface | undefined;

  const questionnaireData = useMemo(() => {
    const data = questionnaireRawData?.questions
      .filter((item) =>
        item.audience.includes(
          state.required_information.gender.value?.id ?? ""
        )
      )
      ?.filter((item) => item.type !== "Optional" && item.type !== "Compulsory")
      ?.map((item) => {
        return {
          audience: item.audience,
          id: item.id,
          options: item.options,
          title: item.title,
          type: item.type,
        };
      });
    let questionWindow: {
      audience: string[];
      id: number;
      options: string[];
      title: string;
      type: string;
    }[][] = [];
    for (
      let window = 0;
      window <
      Math.ceil((data || []).length / state.questionnaire.window.limit);
      window++
    ) {
      questionWindow = [
        ...questionWindow,
        (data || []).filter(
          (_, index) =>
            index + 1 > state.questionnaire.window.limit * window &&
            index + 1 <= state.questionnaire.window.limit * (window + 1)
        ),
      ];
    }
    return questionWindow;
  }, [
    state.required_information.gender.value?.id,
    questionnaireRawData,
    locale,
  ]);

  const questions = useMemo(() => {
    return questionnaireData
      .filter((_, index) => index + 1 === state.questionnaire.window.active)
      .flat(1);
  }, [questionnaireData, state.questionnaire.window.active, locale]);

  const englishQuestionnaireRawData = queryClient.getQueryData(
    CustomerRegistrationReactQueryKey.GetEnglishQuestionnaire()
  ) as GetQuestionnaireResponseInterface | undefined;

  const englishQuestionnaireData = useMemo(() => {
    const data = englishQuestionnaireRawData?.questions
      .filter((item) =>
        item.audience.includes(
          state.required_information.gender.value?.id ?? ""
        )
      )
      .filter((item) => item.type !== "Optional" && item.type !== "Compulsory")
      .map((item) => {
        return {
          audience: item.audience,
          id: item.id,
          options: item.options,
          title: item.title,
          type: item.type,
        };
      });
    let questionWindow: {
      audience: string[];
      id: number;
      options: string[];
      title: string;
      type: string;
    }[][] = [];
    for (
      let window = 0;
      window <
      Math.ceil((data || []).length / state.questionnaire.window.limit);
      window++
    ) {
      questionWindow = [
        ...questionWindow,
        (data || []).filter(
          (_, index) =>
            index + 1 > state.questionnaire.window.limit * window &&
            index + 1 <= state.questionnaire.window.limit * (window + 1)
        ),
      ];
    }
    return questionWindow;
  }, [state.required_information.gender.value, englishQuestionnaireRawData]);

  const englishQuestions = useMemo(() => {
    return englishQuestionnaireData
      .filter((_, index) => index + 1 === state.questionnaire.window.active)
      .flat(1);
  }, [englishQuestionnaireData, state.questionnaire.window.active]);

  const totalQuestions = useMemo(() => {
    return questionnaireData.reduce((acc, question) => {
      return acc + question.length;
    }, 0);
  }, [questionnaireData]);

  const handleAnswerQuestionnaire = (data: {
    [key: number]: undefined | string[];
  }) => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetQuestionnaireAnswers,
      payload: data,
    });
  };

  const handleNextNavigation = () => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetWindowActiveToNext,
    });
  };

  const handlePreviousNavigation = () => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetWindowActiveToPrevious,
    });
  };

  const handleClickSkip = (_: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: CustomerRegistrationActionEnum.ClickNextQuestionnaire,
    });
  };

  const handleClickBack = (_: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: CustomerRegistrationActionEnum.ClickBackQuestionnaire,
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
          <Stepper items={dictionaries.step.items} selected={2} />
          <h2 className={clsx("text-white text-[2rem] font-bold text-left")}>
            {dictionaries.questionnaire.title}
          </h2>

          <div
            className={clsx(
              "flex flex-grow overflow-y-auto overflow-x-hidden",
              "w-full h-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 justify-start justify-items-start items-start content-start gap-y-[2rem]",
                "w-full",
                "box-border"
              )}
            >
              {questions.map((question, index) => (
                <QuestionnaireQuestionRegistration
                  key={index}
                  id={question.id}
                  number={
                    (state.questionnaire.window.active - 1) *
                      state.questionnaire.window.limit +
                    (index + 1)
                  }
                  options={englishQuestions[index].options}
                  maskOptions={question.options}
                  answer={state.questionnaire.answers[question.id]}
                  title={question.title}
                  type={question.type}
                  onAnswer={handleAnswerQuestionnaire}
                />
              ))}
            </div>
          </div>

          <QuestionnaireNavigationRegistration
            message={dictionaries.questionnaire.navigation.message}
            description={dictionaries.questionnaire.navigation.description}
            totalQuestions={totalQuestions}
            windowActive={state.questionnaire.window.active}
            windowLimit={state.questionnaire.window.limit}
            onNext={handleNextNavigation}
            onPrevious={handlePreviousNavigation}
          />

          <div
            className={clsx(
              "grid grid-cols-2 gap-x-[1.5rem]",
              "w-full",
              "box-border"
            )}
          >
            <Button variant={"outlined"} onClick={handleClickBack}>
              {dictionaries.questionnaire.actions.back.toUpperCase()}
            </Button>

            <Button onClick={handleClickSkip}>
              {dictionaries.questionnaire.actions.next.toUpperCase()}
            </Button>
          </div>
        </div>
      </Card>
    </AppContainer>
  );
};
