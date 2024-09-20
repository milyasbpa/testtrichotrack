import { useMemo } from "react";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { Checkbox } from "src/core/ui/components/checkbox";

export interface OptionalAgreementQuestionRegistrationProps {
  id?: number;
  answer?: undefined | string[];
  onAnswer?: (data: { [key: number]: string[] | undefined }) => void;
}

export const OptionalAgreementQuestionRegistration = ({
  id = 0,
  answer,
  onAnswer = () => {},
}: OptionalAgreementQuestionRegistrationProps) => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const agreement = dictionaries.agreement;
  const value = useMemo(() => {
    return answer === undefined ? false : answer.includes("No") ? false : true;
  }, [answer]);

  const title = useMemo(() => {
    const lastWord = agreement.optional.optional;
    const result = agreement.optional.statement;
    const resultReformatted = `${result}<span style="font-size:1.125rem; font-weight:400; color: rgba(255,255,255,0.57);">${lastWord}</span>`;
    return resultReformatted;
  }, [agreement.optional.optional, agreement.optional.statement]);

  const handleChange = () => {
    const data = {
      [id || 0]:
        answer === undefined
          ? ["Yes"]
          : answer?.includes("No")
          ? ["Yes"]
          : ["No"],
    };

    if (onAnswer) {
      onAnswer(data);
    }
  };

  return (
    <div className={clsx("flex justify-start gap-x-[0.5rem]")}>
      <Checkbox checked={value} onChange={() => handleChange()} />
      <div>
        <p
          className={clsx("text-[1.125rem] text-white font-bold text-left")}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
      </div>
    </div>
  );
};
