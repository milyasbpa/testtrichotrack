import { useMemo } from "react";
import { QuestionnaireMultipleQuestionCustomerQuestionnaire } from "../questionnaire_multiple_question/QuestionnaireMultipleQuestion.questionnaire";
import { QuestionnaireSingleDetailCustomerQuestionnaire } from "../questionnaire_single_detail_question/QuestionnaireSingleDetailQuestion.questionnaire";
import { QuestionnaireSingleQuestionCustomerQuestionnaire } from "../questionnaire_single_question/QuestionnaireSingleQuestion.questionnaire";
import { QuestionnaireOpenQuestionCustomerQuestionnaire } from "../questionnaire_open_question/QuestionnaireOpenQuestion.questionnaire";

export interface QuestionnaireQuestionCustomerQuestionnaireProps {
  id?: number;
  number?: number;
  options?: string[];
  maskOptions?: string[];
  title?: string;
  type?: string;
  answer?: undefined | string[];
  onAnswer?: (data: { [key: number]: string[] | undefined }) => void;
}

export const QuestionnaireQuestionCustomerQuestionnaire = ({
  options = [],
  type = "",
  ...otherProps
}: QuestionnaireQuestionCustomerQuestionnaireProps) => {
  const isContainDetail = useMemo(() => {
    return options.reduce((acc, item) => {
      const counter = item.includes("*");
      return acc || counter;
    }, false);
  }, [options]);

  if (type === "Multiple") {
    return (
      <QuestionnaireMultipleQuestionCustomerQuestionnaire
        {...otherProps}
        options={options}
      />
    );
  }

  if (type === "Single" && isContainDetail) {
    return (
      <QuestionnaireSingleDetailCustomerQuestionnaire
        {...otherProps}
        options={options}
      />
    );
  }

  if (type === "Single" && !isContainDetail) {
    return (
      <QuestionnaireSingleQuestionCustomerQuestionnaire
        {...otherProps}
        options={options}
      />
    );
  }

  if (type === "Text") {
    return <QuestionnaireOpenQuestionCustomerQuestionnaire {...otherProps} />;
  }

  return null;
};
