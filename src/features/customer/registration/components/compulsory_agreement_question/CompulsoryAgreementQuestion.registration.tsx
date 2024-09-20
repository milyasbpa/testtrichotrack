import { useMemo } from "react";
import clsx from "clsx";
import { Checkbox } from "src/core/ui/components/checkbox";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export interface CompulsoryAgreementQuestionRegistrationProps {
  id?: number;

  answer?: undefined | string[];
  onAnswer?: (data: { [key: number]: string[] | undefined }) => void;
}

export const CompulsoryAgreementQuestionRegistration = ({
  id = 0,
  answer,
  onAnswer = () => {},
}: CompulsoryAgreementQuestionRegistrationProps) => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const agreement = dictionaries.agreement;

  const value = useMemo(() => {
    return answer === undefined ? false : answer.includes("No") ? false : true;
  }, [answer]);

  const formattedTitle = useMemo(() => {
    const lastWord = agreement.compulsory.required;
    const result = agreement.compulsory.statement;
    const resultReformatted = `${result}<span style="font-size:1.125rem; font-weight:400; color: rgba(255,255,255,0.57);">${lastWord}</span>`;
    return resultReformatted;
  }, [agreement.compulsory.required, agreement.compulsory.statement]);

  const compulsory = useMemo(() => {
    return [
      agreement.compulsory["1"],
      agreement.compulsory["2"],
      agreement.compulsory["3"],
    ];
  }, [
    agreement.compulsory["1"],
    agreement.compulsory["2"],
    agreement.compulsory["3"],
  ]);

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
    <>
      <div className={clsx("flex justify-start gap-x-[0.5rem]")}>
        <Checkbox checked={value} onChange={() => handleChange()} />

        <div>
          <p
            className={clsx("text-[1.125rem] text-white font-bold text-left")}
            dangerouslySetInnerHTML={{ __html: formattedTitle }}
          />
        </div>
      </div>

      <div
        className={clsx(
          "grid grid-cols-[auto_1fr] gap-x-[1rem] place-content-start place-items-start",
          "px-[2rem]"
        )}
      >
        <ol className={clsx("list-decimal")}>
          {compulsory.map((item, index) => (
            <li
              key={index}
              className={clsx(
                "text-[1.125rem] text-white-57 font-normal text-left"
              )}
            >
              {item}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};
