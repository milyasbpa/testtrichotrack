import { useMemo } from "react";
import clsx from "clsx";
import { Checkbox } from "src/core/ui/components/checkbox";

export interface IOptionalAgreementQuestionProfileProps {
  id?: number;
  answer?: undefined | string[];
  onAnswer?: (data: { [key: number]: string[] | undefined }) => void;
}

export const OptionalAgreementQuestionProfile = ({
  id = 0,
  answer,
  onAnswer = () => {},
}: IOptionalAgreementQuestionProfileProps) => {
  const value = useMemo(() => {
    return answer === undefined ? false : answer.includes("No") ? false : true;
  }, [answer]);
  const title = useMemo(() => {
    const lastWord = "(Optional)";
    const result =
      "I consent to receive informational and promotional marketing communications from the Company.";
    const resultReformatted = `${result}<span style="font-size:1.125rem; font-weight:400; color: rgba(255,255,255,0.57);">${lastWord}</span>`;
    return resultReformatted;
  }, []);

  const handleChange = () => {
    const data = {
      [id || 0]:
        answer === undefined
          ? ["Yes"]
          : answer?.includes("No")
          ? ["Yes"]
          : ["No"],
    };

    onAnswer(data);
  };

  return (
    <div className={clsx("flex justify-start gap-x-[0.5rem]")}>
      <Checkbox checked={value} onChange={handleChange} />
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
