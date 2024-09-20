import { useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";

import { QuestionnaireQuestionCustomerQuestionnaire } from "../../components/questionnaire_question/QuestionnaireQuestion.questionnaire";
import { QuestionnaireNavigationCustomerQuestionnaire } from "../../components/questionnaire_navigation/QuestionnaireNavigation.questionnaire";
import { useQueryClient } from "@tanstack/react-query";
import {
  GetQuestionnaireRequestInterface,
  GetQuestionnaireResponseInterface,
} from "src/core/models/api/configuration";
import { CustomerQuestionnaireReactQueryKey } from "../../react_query/keys";
import {
  CustomerQuestionnaireActionEnum,
  CustomerQuestionnaireContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import { Button } from "src/core/ui/components/button";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const FormCustomerQuestionnaire = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerQuestionnaireContext);

  const queryClient = useQueryClient();

  const questionnairePayload: GetQuestionnaireRequestInterface = {
    language: locale === "zh" ? "Chinese" : "English",
  };

  const questionnaireRawData = queryClient.getQueryData(
    CustomerQuestionnaireReactQueryKey.GetQuestionnaire(questionnairePayload)
  ) as GetQuestionnaireResponseInterface | undefined;

  const englishQuestionnaireRawData = queryClient.getQueryData(
    CustomerQuestionnaireReactQueryKey.GetEnglishQuestionnaire()
  ) as GetQuestionnaireResponseInterface | undefined;

  const handleClickSkip = () => {
    dispatch({
      type: CustomerQuestionnaireActionEnum.ClickSaveQuestionnaire,
    });
  };

  const handleClickBack = () => {
    navigate(PrivateRouteURL.routeToCustomerHomeURL({ locale: locale }));
  };

  const questionnaire = useMemo(() => {
    const filter = questionnaireRawData?.questions
      .filter((item) =>
        item.audience.includes(state.questionnaire.gender as string)
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
      Math.ceil((filter || []).length / state.questionnaire.window.limit);
      window++
    ) {
      questionWindow = [
        ...questionWindow,
        (filter || []).filter(
          (_, index) =>
            index + 1 > state.questionnaire.window.limit * window &&
            index + 1 <= state.questionnaire.window.limit * (window + 1)
        ),
      ];
    }
    return questionWindow;
  }, [questionnaireRawData, state.questionnaire.gender]);

  const questions = useMemo(() => {
    return questionnaire
      ?.filter((_, index) => index + 1 === state.questionnaire.window.active)
      .flat(1);
  }, [questionnaire, state.questionnaire.window.active]);

  const englishQuestionnaire = useMemo(() => {
    const filter = englishQuestionnaireRawData?.questions
      .filter((item) =>
        item.audience.includes(state.questionnaire.gender as string)
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
      Math.ceil((filter || []).length / state.questionnaire.window.limit);
      window++
    ) {
      questionWindow = [
        ...questionWindow,
        (filter || []).filter(
          (_, index) =>
            index + 1 > state.questionnaire.window.limit * window &&
            index + 1 <= state.questionnaire.window.limit * (window + 1)
        ),
      ];
    }
    return questionWindow;
  }, [questionnaireRawData, state.questionnaire.gender]);

  const englishQuestions = useMemo(() => {
    return englishQuestionnaire
      ?.filter((_, index) => index + 1 === state.questionnaire.window.active)
      .flat(1);
  }, [questionnaire, state.questionnaire.window.active]);

  const totalQuestions = useMemo(() => {
    return questionnaire?.reduce((acc, question) => {
      return acc + question.length;
    }, 0);
  }, [questionnaire]);

  const handleAnswerQuestionnaire = (data: {
    [key: number]: undefined | string[];
  }) => {
    dispatch({
      type: CustomerQuestionnaireActionEnum.SetQuestionnaireAnswers,
      payload: data,
    });
  };

  const handleNextNavigation = () => {
    dispatch({
      type: CustomerQuestionnaireActionEnum.SetWindowActiveToNext,
    });
  };

  const handlePreviousNavigation = () => {
    dispatch({
      type: CustomerQuestionnaireActionEnum.SetWindowActiveToPrevious,
    });
  };

  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <h2 className={clsx("text-white text-[2rem] font-bold text-left")}>
            {dictionaries.edit_questionnaire.title}
          </h2>
          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-1 justify-start justify-items-start gap-y-[1.5rem]",
                "w-full",
                "box-border"
              )}
            >
              {questions.map((question, index) => (
                <QuestionnaireQuestionCustomerQuestionnaire
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

              <QuestionnaireNavigationCustomerQuestionnaire
                totalQuestions={totalQuestions}
                windowActive={state.questionnaire.window.active}
                windowLimit={state.questionnaire.window.limit}
                onNext={handleNextNavigation}
                onPrevious={handlePreviousNavigation}
              />
            </div>
          </VerticalFlexGrow>

          {/* actions */}
          <div
            className={clsx(
              "grid grid-cols-2 gap-x-[1.5rem]",
              "w-full",
              "box-border"
            )}
          >
            <Button variant={"outlined"} onClick={handleClickBack}>
              {dictionaries.edit_questionnaire.actions.back.toUpperCase()}
            </Button>

            <Button onClick={handleClickSkip}>
              {dictionaries.edit_questionnaire.actions.next.toUpperCase()}
            </Button>
          </div>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
