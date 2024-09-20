import clsx from "clsx";
import { useMemo } from "react";
import { CheckboxButton } from "src/core/ui/components/checkbox_button";
import { CheckboxGroup } from "src/core/ui/components/checkbox_group";
import { Question } from "src/core/ui/components/question";
import { Textfield } from "src/core/ui/components/textfield";

export interface QuestionnaireMultipleQuestionRegistrationProps {
  id?: number;
  number?: number;
  options?: string[];
  maskOptions?: string[];
  title?: string;
  answer?: undefined | string[];
  onAnswer?: (data: { [key: number]: string[] | undefined }) => void;
}

export const QuestionnaireMultipleQuestionRegistration = ({
  id = 0,
  number = 0,
  options = [],
  maskOptions = [],
  title = "",
  answer,
  onAnswer = () => {},
}: QuestionnaireMultipleQuestionRegistrationProps) => {
  const formattedOptions = useMemo(() => {
    return options.map((item) =>
      item.includes("*") ? item.replace("*", "") : item
    );
  }, [options]);

  const formattedMaskOptions = useMemo(() => {
    return maskOptions.map((item) =>
      item.includes("*") ? item.replace("*", "") : item
    );
  }, [maskOptions]);

  const othersLabel = useMemo(() => {
    return (
      options?.filter((item) => item.includes("*"))[0].replace("*", "") || ""
    );
  }, [options]);

  const value = useMemo(() => {
    return answer !== undefined &&
      answer?.length > 0 &&
      answer?.filter((item) => {
        return !options.includes(item);
      }).length > 0
      ? [
          ...answer?.filter((item) => {
            return options.includes(item);
          }),
          othersLabel,
        ]
      : answer !== undefined &&
        answer?.length > 0 &&
        answer?.filter((item) => {
          return options.includes(item);
        }).length > 0 &&
        answer?.includes(othersLabel)
      ? answer
      : answer !== undefined &&
        answer?.length > 0 &&
        !answer?.filter((item) => {
          return !options.includes(item);
        }).length &&
        !answer?.includes(othersLabel)
      ? answer
      : [];
  }, [options, answer]);

  const detailValue = useMemo(() => {
    return answer === undefined
      ? ""
      : answer?.filter((item) => {
          return !options.includes(item) && item !== othersLabel;
        })?.length > 0
      ? answer
          ?.filter((item) => {
            return !options.includes(item);
          })
          .toString()
      : answer !== undefined &&
        answer?.length > 0 &&
        answer?.filter((item) => {
          return options.includes(item);
        }).length > 0 &&
        answer?.includes(othersLabel)
      ? ""
      : answer !== undefined &&
        answer?.length > 0 &&
        !answer?.filter((item) => {
          return !options.includes(item);
        }).length &&
        !answer?.includes(othersLabel)
      ? ""
      : "";
  }, [options, answer]);

  const gridColumn = useMemo(() => {
    return options.length === 2 ? 2 : 3;
  }, [options]);

  const handleChangeCheckbox = (payload: { id: string }) => {
    const data = {
      [id || 0]: !(
        value.includes(payload.id)
          ? value.filter((item) => item !== payload.id)
          : [...value, payload.id]
      ).length
        ? undefined
        : value.includes(payload.id) && detailValue.length > 0
        ? [...value.filter((item) => item !== payload.id), detailValue]
        : value.includes(payload.id)
        ? value.filter((item) => item !== payload.id)
        : !value.includes(payload.id) && detailValue.length > 0
        ? [
            ...value.filter((item) => item !== othersLabel),
            detailValue,
            payload.id,
          ]
        : [...value, payload.id],
    };
    if (onAnswer) {
      onAnswer(data);
    }
  };

  const handleChangeDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = {
      [id || 0]: [
        ...value.filter((item) => item !== othersLabel),
        ...e.currentTarget.value.split(","),
      ],
    };

    if (onAnswer) {
      onAnswer(data);
    }
  };

  return (
    <Question questionNumber={number} question={title}>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        <CheckboxGroup>
          <div
            className={clsx(
              "grid justify-items-start gap-y-[1.5rem] gap-x-[1.5rem]",
              "w-full"
            )}
            style={{ gridTemplateColumns: `repeat(${gridColumn},1fr)` }}
          >
            {formattedOptions.map((item, index) => (
              <CheckboxButton
                key={index}
                checked={value.includes(item)}
                label={formattedMaskOptions[index]}
                onChange={() => handleChangeCheckbox({ id: item })}
              />
            ))}
          </div>
        </CheckboxGroup>
        {value.includes(othersLabel) && othersLabel.length > 0 && (
          <Textfield
            value={detailValue}
            // placeholder={questionnaire.multiple_question.others_placeholder}
            onChange={handleChangeDetail}
          />
        )}
      </div>
    </Question>
  );
};
