import * as React from "react";
import clsx from "clsx";

export interface TreatmentCardRecommendationProps {
  id?: number;
  issue?: string;
  name?: string;
  description?: string;
  image?: string;
  treatment?: string;
  onClick?: (data: {
    issue: string;
    treatment_id: number;
    treatment_type: string;
  }) => void;
}

export const TreatmentCardRecommendation = ({
  id = 0,
  issue = "",
  name = "",
  description = "",
  treatment = "",
  image = "",
  onClick,
}: TreatmentCardRecommendationProps) => {
  // const { translateHairTreatmentType } = useTranslateHairTreatmentType();
  const handleClickSolution = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick({
        issue: issue,
        treatment_id: parseInt(e.currentTarget.value),
        treatment_type: treatment,
      });
    }
  };
  return (
    <button
      className={clsx(
        "bg-dark-charcoal",
        "rounded-[0.5rem]",
        "p-[1rem]",
        "grid grid-cols-1 place-content-start place-items-start gap-y-[0.5rem]",
        "w-full h-full",
        "rounded-[0.5rem]"
      )}
      value={id}
      onClick={handleClickSolution}
    >
      <p className={clsx("text-[1rem] text-white-80 font-bold")}>
        {/* {translateHairTreatmentType(treatment)} */}
      </p>
      <img
        src={image}
        className={clsx(
          "object-cover",
          "w-full",
          "aspect-[3/2]",
          "rounded-[0.5rem]"
        )}
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
