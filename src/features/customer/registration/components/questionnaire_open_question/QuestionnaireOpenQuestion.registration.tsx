import { useMemo } from "react";
import { Question } from "src/core/ui/components/question";
import { Textarea } from "src/core/ui/components/textarea";

export interface QuestionnaireOpenQuestionRegistrationProps {
  id?: number;
  number?: number;
  title?: string;
  type?: string;
  answer?: undefined | string[];
  onAnswer?: (data: { [key: number]: string[] | undefined }) => void;
}

export const QuestionnaireOpenQuestionRegistration = ({
  id = 0,
  number = 0,
  title = "",
  answer,
  onAnswer = () => {},
}: QuestionnaireOpenQuestionRegistrationProps) => {
  // const { questionnaire } = useCustomerRegistrationTranslator();
  const value = useMemo(() => {
    return answer === undefined ? "" : !answer?.length ? "" : answer[0];
  }, [answer]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const data = {
      [id || 0]: !e.currentTarget.value.length
        ? undefined
        : [e.currentTarget.value],
    };
    if (onAnswer) {
      onAnswer(data);
    }
  };
  return (
    <Question questionNumber={number} question={title}>
      <Textarea
        value={value}
        // placeholder={questionnaire.open_question.placeholder}
        onChange={handleChange}
      />
    </Question>
  );
};
