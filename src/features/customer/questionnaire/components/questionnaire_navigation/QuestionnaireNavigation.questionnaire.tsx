import { useMemo } from "react";
import clsx from "clsx";

import { Button } from "src/core/ui/components/button";
import SVGIcon from "src/core/ui/icons";

export interface QuestionnaireNavigationCustomerQuestionnaireProps {
  message?: string;
  description?: string;
  totalQuestions?: number;
  windowActive?: number;
  windowLimit?: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export const QuestionnaireNavigationCustomerQuestionnaire = ({
  message = "",
  description = "",
  totalQuestions = 0,
  windowActive = 1,
  windowLimit = 3,
  onPrevious = () => {},
  onNext = () => {},
}: QuestionnaireNavigationCustomerQuestionnaireProps) => {
  const startQuestionIndex = useMemo(() => {
    return 1 + ((windowActive || 0) - 1) * (windowLimit || 0);
  }, [windowActive, windowLimit]);

  const endQuestionIndex = useMemo(() => {
    return (windowActive || 0) * (windowLimit || 0) <= (totalQuestions || 0)
      ? (windowLimit || 0) * (windowActive || 0)
      : (totalQuestions || 0) % (windowLimit || 0);
  }, [windowActive, windowLimit, totalQuestions]);

  const isDisablePreviousNavigation = useMemo(() => {
    return windowActive === 1;
  }, [windowActive]);

  const isDisableNextNavigation = useMemo(() => {
    return (
      (windowActive || 0) >=
      Math.ceil((totalQuestions || 0) / (windowLimit || 0))
    );
  }, [windowActive, windowLimit, totalQuestions]);

  const formattedMessage = useMemo(() => {
    return message
      .replace("{{startQuestionIndex}}", `${startQuestionIndex}`)
      .replace("{{endQuestionIndex}}", `${endQuestionIndex}`)
      .replace("{{totalQuestion}}", `${totalQuestions}`);
  }, [startQuestionIndex, endQuestionIndex, totalQuestions]);

  return (
    <div
      className={clsx(
        "grid justify-between justify-items-start items-center content-center",
        "w-full",
        "grid-cols-[1fr_auto]"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col justify-start justify-items-start items-center content-center gap-x-[1.5rem]"
        )}
      >
        <p className={clsx("text-[1.125rem] text-white font-medium text-left")}>
          {formattedMessage}
        </p>

        <div className={clsx("h-[100%] w-[1px]", "bg-white-12")} />

        <p
          className={clsx(
            "text-[1.125rem] text-spanish-gray font-regular text-left"
          )}
        >
          {description}
        </p>
      </div>

      <div
        className={clsx(
          "grid grid-flow-col justify-end justify-items-end items-center content-center gap-x-[1.5rem]"
        )}
      >
        <Button
          className={clsx("rotate-90")}
          disabled={isDisablePreviousNavigation}
          onClick={onPrevious}
        >
          <SVGIcon
            name="Arrow"
            className={clsx(
              "w-[1.5rem] h-[1.5rem]",
              isDisablePreviousNavigation ? "fill-[#999999]" : "fill-[white]"
            )}
          />
        </Button>
        <Button
          className={clsx("-rotate-90")}
          disabled={isDisableNextNavigation}
          onClick={onNext}
        >
          <SVGIcon
            name="Arrow"
            className={clsx(
              "w-[1.5rem] h-[1.5rem]",
              isDisableNextNavigation ? "fill-[#999999]" : "fill-[white]"
            )}
          />
        </Button>
      </div>
    </div>
  );
};
