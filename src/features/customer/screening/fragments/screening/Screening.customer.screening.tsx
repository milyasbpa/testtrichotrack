import { useParams } from "react-router-dom";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import clsx from "clsx";
import { useContext } from "react";
import { CustomerScreeningContext } from "../../context";
import { ScreeningCardCustomerScreening } from "../../components/screening_card";
import { ColorSizeGradientBar } from "src/core/ui/components/color_size_gradient_bar";
import { ColorGradientBar } from "src/core/ui/components/color_gradient_bar";

export const ScreeningCustomerScreening = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const { state } = useContext(CustomerScreeningContext);

  const screeningData = state.screening.data;
  if (!screeningData) {
    return null;
  }

  const groupScreeningData = Object.fromEntries(
    Object.entries(screeningData).filter(
      ([key]) => key === state.group.selected?.id
    )
  );

  const individualGroupScreeningData =
    groupScreeningData[state.group.selected?.id ?? ""];

  return (
    <div
      className={clsx(
        "grid place-content-start place-items-start gap-x-[1.5rem] gap-y-[1rem]",
        state.group.selected?.id === "scalp" ? "grid-cols-2" : "grid-cols-1",
        "w-full"
      )}
    >
      {Object.keys(individualGroupScreeningData)?.map((item, index) => {
        if (item === "hair_pigmentation" || item === "follicle_capacity") {
          return (
            <ScreeningCardCustomerScreening
              key={index}
              name={individualGroupScreeningData[item]?.name}
              description={individualGroupScreeningData[item]?.description}
            >
              <div className={clsx("w-full")}>
                <ColorSizeGradientBar
                  data={(
                    appDictionaries.cases.screening.items.find(
                      (screening) => screening.id === item
                    )?.members ?? []
                  ).map((screening) => {
                    return {
                      id: screening.id,
                      name: screening.name,
                      color: screening.color,
                      value:
                        ((
                          individualGroupScreeningData[item]?.value as {
                            [key: string]: number;
                          }
                        )[screening.id] ?? 0) * 100,
                    };
                  })}
                />
              </div>
            </ScreeningCardCustomerScreening>
          );
        }

        if (
          item === "stratum_corneum" ||
          item === "dead_skin" ||
          item === "scalp_wrinkle" ||
          item === "scalp_irritation" ||
          item === "scalp_secretion"
        ) {
          return (
            <ScreeningCardCustomerScreening
              key={index}
              name={individualGroupScreeningData[item]?.name}
              description={individualGroupScreeningData[item]?.description}
            >
              <div className={clsx("w-full")}>
                <ColorGradientBar
                  data={
                    appDictionaries.cases.screening.items.find(
                      (screening) => screening.id === item
                    )?.levels ?? []
                  }
                  value={
                    ((individualGroupScreeningData[item]?.value as number) ??
                      0) * 100
                  }
                />
              </div>
            </ScreeningCardCustomerScreening>
          );
        }
        return (
          <ScreeningCardCustomerScreening
            key={index}
            name={individualGroupScreeningData[item]?.name}
            description={individualGroupScreeningData[item]?.description}
            value={`${
              typeof individualGroupScreeningData[item]?.value === "number"
                ? (individualGroupScreeningData[item]?.value ?? 0).toFixed(1)
                : ""
            } ${individualGroupScreeningData[item]?.unit}`}
          />
        );
      })}
    </div>
  );
};
