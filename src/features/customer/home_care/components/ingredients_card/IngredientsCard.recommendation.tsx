import clsx from "clsx";
import { IngredientTabCustomerHomeCare } from "../ingredient_tab/IngredientTab.recommendation";

export interface IngredientsCardCustomerHomeCareProps {
  title?: string;
  effectText?: string;
  description?: string;
  ingredients?: string[];
  image?: string;
  onTab?: (value: number) => void;
}

export const IngredientsCardCustomerHomeCare = ({
  title = "",
  effectText = "",
  description = "",
  ingredients = [],
  image = "",
  onTab = () => {},
}: IngredientsCardCustomerHomeCareProps) => {
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

      <IngredientTabCustomerHomeCare list={ingredients} onTab={onTab} />

      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-x-[1.5rem]",
          "w-full h-full"
        )}
      >
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
            {effectText}
          </p>
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
