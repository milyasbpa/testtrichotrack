import * as React from "react";
import clsx from "clsx";

export interface TreatmentCardIssueProps {
  id?: number;
  issue?: string;
  name?: string;
  description?: string;
  image?: string;
  onClick?: (data: { issue: string; treatment_id: number }) => void;
}

export const TreatmentCardIssue = ({
  id = 0,
  issue = "",
  name = "",
  description = " ",
  image = "",
  onClick = () => {},
}: TreatmentCardIssueProps) => {
  const handleClickSolution = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick({
        issue: issue,
        treatment_id: parseInt(e.currentTarget.value),
      });
    }
  };
  return (
    <button
      className={clsx(
        "bg-eerie-black",
        "rounded-[0.5rem]",
        "p-[1rem]",
        "grid grid-cols-1 place-content-start place-items-start gap-y-[0.5rem]",
        "w-full h-full",
        "rounded-[0.5rem]"
      )}
      value={id}
      onClick={handleClickSolution}
    >
      <img
        src={image}
        className={clsx("object-cover", "w-full h-[232px]", "rounded-[0.5rem]")}
      />
      <p className={clsx("text-[1rem] text-white-80 font-bold text-left")}>
        {name}
      </p>
      <p
        className={clsx("text-[0.875rem] text-white-57 font-regular text-left")}
      >
        {description}
      </p>
    </button>
  );
};
