import clsx from "clsx";
import { StepTabRecommendation } from "../step_tab/StepTab.component";

export interface SolutionStepsCardCustomerCarePlansProps {
  stepCount?: number;
  name?: string;
  description?: string;
  image?: string;
  onSelect?: (value: number) => void;
}

export const SolutionStepsCardCustomerCarePlans = ({
  stepCount = 0,
  name = "Detoxifying Treatment",
  description = "Lorem ipsum dolor sit amet consectetur. Imperdiet malesuada massa faucibus hac neque sed leo. Erat felis nam odio sed pretium mauris eu proin. ",
  image = "/images/sample-scan.png",
  onSelect = () => {},
}: SolutionStepsCardCustomerCarePlansProps) => {
  return (
    <div
      className={clsx(
        "bg-charleston-green",
        "rounded-[0.5rem]",
        "p-[1rem]",
        "grid grid-cols-1 place-content-start place-items-start gap-y-[1.5rem]",
        "w-full",
        "rounded-[0.5rem]"
      )}
    >
      <StepTabRecommendation count={stepCount} onSelect={onSelect} />

      <div className={clsx("flex items-start justify-start", "gap-x-[1rem]")}>
        <img
          src={image}
          className={clsx("w-[284px] h-[284px]", "rounded-[0.5rem]")}
        />

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-y-[0.5rem]",
            "w-full"
          )}
        >
          <p className={clsx("text-[1rem] text-white-87 font-bold text-left")}>
            {name}
          </p>
          <p
            className={clsx("text-[1rem] text-white-57 font-regular text-left")}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
