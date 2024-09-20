import clsx from "clsx";
import { InstructionTabCustomerHomeCare } from "../instruction_tab/InstructionTab.recommendation";

export interface InstructionCardCustomerHomeCareProps {
  title?: string;
  description?: string;
  image?: string;
  count?: number;
  onTab?: (value: number) => void;
}

export const InstructionCardCustomerHomeCare = ({
  title = "Instructions for use",
  description = "Lorem ipsum dolor sit amet consectetur. Imperdiet malesuada massa faucibus hac neque sed leo. Erat felis nam odio sed pretium mauris eu proin. ",
  image = "/images/sample-scan.png",
  count = 1,
  onTab = () => {},
}: InstructionCardCustomerHomeCareProps) => {
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
      <h3 className={clsx("text-[1.25rem] text-white font-bold text-left")}>
        {title}
      </h3>

      <div className={clsx("w-full", "overflow-auto")}>
        <InstructionTabCustomerHomeCare count={count} onTab={onTab} />
      </div>

      <div className={clsx("grid grid-flow-col gap-x-[1.5rem]", "w-full")}>
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
          <p
            className={clsx(
              "text-[0.875rem] text-white-57 font-regular text-left"
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
