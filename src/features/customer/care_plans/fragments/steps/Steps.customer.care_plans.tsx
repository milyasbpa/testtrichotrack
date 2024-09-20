import { useContext, useEffect } from "react";
import {
  CustomerCarePlansContext,
  CustomerCarePlansActionEnum,
} from "../../context";
import clsx from "clsx";
import { Tabs } from "src/core/ui/components/tabs";
import { Button } from "src/core/ui/components/button";
import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
export const StepsCustomerCarePlans = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerCarePlansContext);

  const handleSelectStep = (value: { id: string; name: string }) => {
    dispatch({
      type: CustomerCarePlansActionEnum.SetCarePlansValue,
      payload: {
        ...state.careplans,
        procedure: {
          ...state.careplans.procedure,
          selected: value,
        },
      },
    });
  };
  const carePlansData = state.careplans.data;

  useEffect(() => {
    if (carePlansData) {
      const firstKey = Object.keys(carePlansData.procedures)[0] ?? "";
      dispatch({
        type: CustomerCarePlansActionEnum.SetCarePlansValue,
        payload: {
          ...state.careplans,
          procedure: {
            selected: {
              id: firstKey ?? "",
              name: `${dictionaries.step_tab.step} ${firstKey}`,
            },
          },
        },
      });
    }
  }, [carePlansData]);
  if (!carePlansData) {
    return null;
  }
  const stepItems = Object.keys(carePlansData.procedures).map((item) => {
    return {
      id: item,
      name: `${dictionaries.step_tab.step} ${item}`,
    };
  });

  const image =
    carePlansData.procedures[state.careplans.procedure.selected?.id ?? ""]
      ?.photo;
  const name =
    carePlansData.procedures[state.careplans.procedure.selected?.id ?? ""]
      ?.name;
  const description =
    carePlansData.procedures[state.careplans.procedure.selected?.id ?? ""]
      ?.description;
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
      <Tabs scrollable>
        {stepItems.map((item, index) => (
          <Button
            className={clsx(
              "!whitespace-nowrap",
              "!text-[0.875rem]",
              "!min-w-[136px]",
              state.careplans.procedure.selected?.id === item.id
                ? "!border !border-[#017948]"
                : "border !border-[#1B1B1B]",
              state.careplans.procedure.selected?.id === item.id
                ? "!bg-[#017948]"
                : "!bg-[#1B1B1B]",
              state.careplans.procedure.selected?.id === item.id
                ? "!text-[white]"
                : "!text-[#FFFFFF8A]"
            )}
            key={index}
            variant="contained"
            onClick={() => handleSelectStep(item)}
          >
            {item.name}
          </Button>
        ))}
      </Tabs>

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
