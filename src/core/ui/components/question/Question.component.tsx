import * as React from "react";
import clsx from "clsx";

export interface QuestionProps {
  children?: React.ReactNode;
  questionNumber?: number;
  question: string;
}

export const Question = ({
  question = "",
  questionNumber = 0,
  children,
}: QuestionProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-start justify-items-start gap-y-[1.5rem]",
        "w-full",
        "box-border"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-[auto_1fr] items-start content-start gap-x-[0.5rem]",
          "pb-[1.25rem]",
          "w-full",
          "border-b border-b-white-12"
        )}
      >
        <p className={clsx("text-left text-[1rem] text-white-87 font-bold")}>
          {`${questionNumber}. `}
        </p>

        <div className={clsx("grid grid-cols-1 gap-y-[1rem]")}>
          <p className={clsx("text-left text-[1rem] text-white-87 font-bold")}>
            {question}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
};
