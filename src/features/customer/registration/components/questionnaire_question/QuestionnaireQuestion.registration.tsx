import { useMemo } from "react";
import { QuestionnaireMultipleQuestionRegistration } from "../questionnaire_multiple_question/QuestionnaireMultipleQuestion.registration";
import { QuestionnaireSingleDetailRegistration } from "../questionnaire_single_detail_question/QuestionnaireSingleDetailQuestion.registration";
import { QuestionnaireOpenQuestionRegistration } from "../questionnaire_open_question/QuestionnaireOpenQuestion.registration";
import { QuestionnaireSingleQuestionRegistration } from "../questionnaire_single_question/QuestionnaireSingleQuestion.registration";

export interface QuestionnaireQuestionRegistrationProps {
  id?: number;
  number?: number;
  options?: string[];
  maskOptions?: string[];
  title?: string;
  type?: string;
  answer?: undefined | string[];
  onAnswer?: (data: { [key: number]: string[] | undefined }) => void;
}

export const QuestionnaireQuestionRegistration = ({
  options = [],
  type = "",
  ...otherProps
}: QuestionnaireQuestionRegistrationProps) => {
  const isContainDetail = useMemo(() => {
    return options.reduce((acc, item) => {
      const counter = item.includes("*");
      return acc || counter;
    }, false);
  }, [options]);

  if (type === "Multiple") {
    return (
      <QuestionnaireMultipleQuestionRegistration
        {...otherProps}
        options={options}
      />
    );
  }

  if (type === "Single" && isContainDetail) {
    return (
      <QuestionnaireSingleDetailRegistration
        {...otherProps}
        options={options}
      />
    );
  }

  if (type === "Single" && !isContainDetail) {
    return (
      <QuestionnaireSingleQuestionRegistration
        {...otherProps}
        options={options}
      />
    );
  }

  if (type === "Text") {
    return <QuestionnaireOpenQuestionRegistration {...otherProps} />;
  }

  return null;
};
