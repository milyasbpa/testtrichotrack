import clsx from "clsx";
import { useMemo } from "react";
import { CheckboxButton } from "src/core/ui/components/checkbox_button";
import { CheckboxGroup } from "src/core/ui/components/checkbox_group";
import { Question } from "src/core/ui/components/question";
import { Textfield } from "src/core/ui/components/textfield";

export interface QuestionnaireSingleDetailCustomerQuestionnaireProps {
  id?: number;
  number?: number;
  options?: string[];
  maskOptions?: string[];
  title?: string;

  answer?: undefined | string[];
  onAnswer?: (data: { [key: number]: string[] | undefined }) => void;
}

export const QuestionnaireSingleDetailCustomerQuestionnaire = ({
  id = 0,
  number = 0,
  options = [],
  maskOptions = [],
  title = "",
  answer,
  onAnswer = () => {},
}: QuestionnaireSingleDetailCustomerQuestionnaireProps) => {
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
      options.filter((item) => item.includes("*"))[0].replace("*", "") || ""
    );
  }, [options]);

  const gridColumn = useMemo(() => {
    return options.length === 2 ? 2 : 3;
  }, [options]);

  const value = useMemo(() => {
    return answer !== undefined &&
      answer?.length > 0 &&
      answer?.filter((item) => {
        return !options.includes(item);
      }).length > 0
      ? othersLabel
      : answer !== undefined &&
        answer?.length > 0 &&
        answer?.filter((item) => {
          return options.includes(item);
        }).length > 0
      ? answer[0]
      : "";
  }, [options, answer]);

  const detailValue = useMemo(() => {
    return answer !== undefined &&
      answer?.length > 0 &&
      answer?.filter((item) => {
        return !options.includes(item);
      }).length > 0
      ? answer?.filter((item) => {
          return !options.includes(item);
        })[0]
      : answer !== undefined &&
        answer?.length > 0 &&
        answer?.filter((item) => {
          return options.includes(item);
        }).length > 0
      ? ""
      : answer !== undefined &&
        answer?.length > 0 &&
        !answer?.filter((item) => {
          return !options.includes(item);
        }).length &&
        !answer?.includes(othersLabel)
      ? answer[0]
      : "";
  }, [options, answer]);

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

  const handleChangeDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = {
      [id || 0]: [e.currentTarget.value],
    };
    if (onAnswer) {
      onAnswer(data);
    }
  };

  return (
    <Question questionNumber={number} question={title}>
      {/* <CheckboxButtonGroupDetailComponent
        list={options}
        activeId={value}
        othersPlaceholder={questionnaire.single_question.others_placeholder}
        column={gridColumn}
        listPlaceholder={maskOptions}
        othersLabel={othersLabel}
        othersValue={detailValue}
        onChangeCheckbox={handleChangeCheckbox}
        onClickCheckbox={handleClickCheckbox}
        onChangeOthers={handleChangeDetail}
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
      {value.includes(othersLabel) && othersLabel.length > 0 && (
        <Textfield
          value={detailValue}
          // placeholder={questionnaire.multiple_question.others_placeholder}
          onChange={handleChangeDetail}
        />
      )}
    </Question>
  );
};
