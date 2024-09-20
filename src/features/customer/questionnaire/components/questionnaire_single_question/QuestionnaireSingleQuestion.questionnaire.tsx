import clsx from "clsx";
import { useMemo } from "react";
import { CheckboxButton } from "src/core/ui/components/checkbox_button";
import { CheckboxGroup } from "src/core/ui/components/checkbox_group";
import { Question } from "src/core/ui/components/question";

export interface IQuestionnaireSingleQuestionCustomerQuestionnaireProps {
  id?: number;
  number?: number;
  options?: string[];
  maskOptions?: string[];
  title?: string;
  answer?: undefined | string[];
  onAnswer?: (data: { [key: number]: string[] | undefined }) => void;
}

export const QuestionnaireSingleQuestionCustomerQuestionnaire = ({
  id = 0,
  number = 0,
  options = [],
  maskOptions = [],
  title = "",
  answer,
  onAnswer = () => {},
}: IQuestionnaireSingleQuestionCustomerQuestionnaireProps) => {
  const formattedOptions = useMemo(() => {
    return (
      options.map((item) =>
        item.includes("*") ? item.replace("*", "") : item
      ) || []
    );
  }, [options]);

  const formattedMaskOptions = useMemo(() => {
    return (
      maskOptions?.map((item) =>
        item.includes("*") ? item.replace("*", "") : item
      ) || []
    );
  }, [maskOptions]);

  const value = useMemo(() => {
    return answer === undefined ? "" : !answer?.length ? "" : answer[0];
  }, [options, answer]);

  const gridColumn = useMemo(() => {
    return options.length === 2 ? 2 : 3;
  }, [options]);

  const handleChangeCheckbox = (payload: { id: string }) => {
    const data = {
      [id || 0]:
        value.toLowerCase() === payload.id.toLowerCase()
          ? undefined
          : [payload.id],
    };
    if (onAnswer) {
      onAnswer(data);
    }
  };

  return (
    <Question questionNumber={number} question={title}>
      {/* <CheckboxButtonGroupComponent
        list={options}
        column={gridColumn}
        activeId={value}
        listPlaceholder={maskOptions}
        onChange={handleChangeCheckbox}
        onClick={handleClickCheckbox}
      /> */}
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
    </Question>
  );
};
