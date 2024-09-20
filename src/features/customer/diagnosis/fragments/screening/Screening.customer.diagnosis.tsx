import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { Badge } from "src/core/ui/components/badge";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { useContext } from "react";
import { ScreeningCardCustomerDiagnosis } from "../../components/screening_card/ScreeningCard.customer.diagnosis";
import { ColorGradientBar } from "src/core/ui/components/color_gradient_bar";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { ColorSizeGradientBar } from "src/core/ui/components/color_size_gradient_bar";
import { AppContext } from "src/core/modules/app/context";

export const ScreeningCustomerDiagnosis = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const { state: appState } = useContext(AppContext);

  const screeningData = appState.cases.diagnosis.screening.data;
  if (!screeningData) {
    return null;
  }

  const firstGroup = [
    "hair_density",
    "hair_diameter",
    "follicle_density",
    "follicle_miniaturization",
    "dandruff_count",
    "dandruff_coverage",
  ];
  const firstGroupData = Object.keys(screeningData).filter((item) =>
    firstGroup.includes(item)
  );

  const secondGroup = ["pimple_count", "pimple_coverage"];
  const secondGroupData = Object.keys(screeningData).filter((item) =>
    secondGroup.includes(item)
  );

  const thirdGroup = [
    "hair_pigmentation",
    "follicle_capacity",
    "dead_skin",
    "scalp_wrinkle",
    "scalp_secretion",
    "scalp_irritation",
  ];
  const thirdGroupData = Object.keys(screeningData).filter((item) =>
    thirdGroup.includes(item)
  );

  return (
    <>
      <Badge
        variant="info"
        open
        message={dictionaries.biometrics.information_banner.message}
      />
      <VerticalFlexGrow>
        <div
          className={clsx(
            "grid grid-cols-1 gap-[1.5rem] items-start content-start",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-2 gap-x-[1.5rem] items-start content-start gap-y-[1.5rem]",
              "w-full"
            )}
          >
            {firstGroupData.map((item, index) => (
              <ScreeningCardCustomerDiagnosis
                key={index}
                name={screeningData[item].name}
                description={screeningData[item].description}
                value={`${
                  typeof screeningData[item].value === "number"
                    ? screeningData[item].value.toFixed(1)
                    : ""
                } ${screeningData[item].unit}`}
              />
            ))}
          </div>

          {/* pimple_count, pimple_coverage stratum_corneum */}
          <div
            className={clsx(
              "grid grid-cols-2 gap-[1.5rem] items-start content-start",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 gap-[1.5rem] items-start content-start",
                "w-full"
              )}
            >
              {secondGroupData.map((item) => (
                <ScreeningCardCustomerDiagnosis
                  key={screeningData[item].name}
                  name={screeningData[item].name}
                  description={screeningData[item].description}
                  value={`${
                    typeof screeningData[item].value === "number"
                      ? screeningData[item].value.toFixed(1)
                      : ""
                  } ${screeningData[item].unit}`}
                />
              ))}
            </div>

            <ScreeningCardCustomerDiagnosis
              name={screeningData["stratum_corneum"]?.name ?? ""}
              description={screeningData["stratum_corneum"]?.description ?? ""}
            >
              <div className={clsx("w-full")}>
                <ColorGradientBar
                  data={
                    appDictionaries.cases.screening.items.find(
                      (item) => item.id === "stratum_corneum"
                    )?.levels ?? []
                  }
                  value={
                    ((screeningData["stratum_corneum"]?.value as number) ?? 0) *
                    100
                  }
                />
              </div>
            </ScreeningCardCustomerDiagnosis>
          </div>

          {/* hair_pigmentation, follicle_capacity, dead_skin, scalp_wrinkle, scalp_secretion, scalp_irritation */}
          <div
            className={clsx(
              "grid grid-cols-2 gap-[1.5rem] items-start content-start",
              "w-full"
            )}
          >
            {thirdGroupData.map((screening) => {
              if (
                ["hair_pigmentation", "follicle_capacity"].includes(screening)
              ) {
                return (
                  <ScreeningCardCustomerDiagnosis
                    key={screeningData[screening]?.name ?? ""}
                    name={screeningData[screening]?.name ?? ""}
                    description={screeningData[screening]?.description ?? ""}
                  >
                    <div className={clsx("w-full")}>
                      <ColorSizeGradientBar
                        data={(
                          appDictionaries.cases.screening.items.find(
                            (item) => item.id === screening
                          )?.members ?? []
                        )
                          // NOTES: remove 0 value from gradient display
                          .filter(
                            (item) =>
                              ((
                                screeningData[screening]?.value as {
                                  [key: string]: number;
                                }
                              )[item.id] ?? 0) *
                                100 !==
                              0
                          )
                          .map((item) => {
                            return {
                              id: item.id,
                              name: item.name,
                              color: item.color,
                              value:
                                ((
                                  screeningData[screening]?.value as {
                                    [key: string]: number;
                                  }
                                )[item.id] ?? 0) * 100,
                            };
                          })}
                      />
                    </div>
                  </ScreeningCardCustomerDiagnosis>
                );
              }
              return (
                <ScreeningCardCustomerDiagnosis
                  key={screeningData[screening]?.name ?? ""}
                  name={screeningData[screening]?.name ?? ""}
                  description={screeningData[screening]?.description ?? ""}
                >
                  <div className={clsx("w-full")}>
                    <ColorGradientBar
                      data={
                        appDictionaries.cases.screening.items.find(
                          (item) => item.id === screening
                        )?.levels ?? []
                      }
                      value={
                        ((screeningData[screening]?.value as number) ?? 0) * 100
                      }
                    />
                  </div>
                </ScreeningCardCustomerDiagnosis>
              );
            })}
          </div>
        </div>
      </VerticalFlexGrow>
    </>
  );
};
