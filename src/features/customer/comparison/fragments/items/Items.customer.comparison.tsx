import { useContext } from "react";
import clsx from "clsx";
import { CaseCardCustomerComparison } from "../../components/case_card";
import { CustomerComparisonContext } from "../../context/Comparison.customer.context";
import { useCustomerComparisonGetScreenings } from "../../react_query/hooks/useGetScreenings.customer.comparison";
import { useCustomerComparisonGetScanComparisonItems } from "../../react_query/hooks";
import moment from "moment";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { useParams } from "react-router-dom";
import { CaseCardHeaderCustomerComparison } from "../../components/case_card_header";
import { ScreeningCardCustomerComparison } from "../../components/screening_card";
import { ColorGradientBar } from "src/core/ui/components/color_gradient_bar";
import { ColorSizeGradientBar } from "src/core/ui/components/color_size_gradient_bar";
import { getDictionaries } from "../../i18n";
import { GlobalScreeningCardCustomerComparison } from "../../components/global_screening_card";

export const ScanRawComparison = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  useCustomerComparisonGetScanComparisonItems();
  const { isLoading } = useCustomerComparisonGetScreenings();
  const { state } = useContext(CustomerComparisonContext);

  if (isLoading || !state.cases.data.length) {
    return null;
  }

  return (
    <div
      className={clsx(
        "grid gap-y-[1.5rem]",
        "w-full",
        "h-full",
        state.cases.data.length > 2 ? "grid-cols-2" : "grid-cols-1"
      )}
    >
      {state.cases.data.map((item, index) => {
        const stillUtc = moment.utc(item.svc_time).toDate();
        const serviceTime = moment(stillUtc)
          .local()
          .format("DD MMM YYYY, h:mm A");
        const selectedRegion = appDictionaries.cases.region.items.find(
          (region) => region.id === item.region
        );
        const screening = item.screening;
        const rotationDegree = !screening
          ? 0
          : state.cases.data.length > 2
          ? 90
          : 0;
        // NOTE: !screening means global case
        if (!screening) {
          return (
            <CaseCardCustomerComparison
              degree={rotationDegree}
              image={item.image_url}
              key={index}
              header={
                <CaseCardHeaderCustomerComparison
                  image_url={!selectedRegion ? "" : selectedRegion.image_url}
                  name={!selectedRegion ? "" : selectedRegion.name}
                  description={serviceTime}
                />
              }
            >
              {!!state.options.selected && (
                <div className={clsx("w-full", "bg-[#262626]", "px-[1rem]")}>
                  <GlobalScreeningCardCustomerComparison
                    image={dictionaries.coming_soon.image_url}
                    message={dictionaries.coming_soon.message}
                  />
                </div>
              )}
            </CaseCardCustomerComparison>
          );
        }
        if (!state.options.selected) {
          return (
            <CaseCardCustomerComparison
              degree={rotationDegree}
              image={item.image_url}
              key={index}
              header={
                <CaseCardHeaderCustomerComparison
                  image_url={!selectedRegion ? "" : selectedRegion.image_url}
                  name={!selectedRegion ? "" : selectedRegion.name}
                  description={serviceTime}
                />
              }
            />
          );
        }

        const individualGroupScreeningData =
          screening[state.options.selected.id];

        return (
          <CaseCardCustomerComparison
            degree={rotationDegree}
            image={item.image_url}
            key={index}
            header={
              <CaseCardHeaderCustomerComparison
                image_url={!selectedRegion ? "" : selectedRegion.image_url}
                name={!selectedRegion ? "" : selectedRegion.name}
                description={serviceTime}
              />
            }
          >
            <div className={clsx("w-full", "bg-[#262626]", "px-[1rem]")}>
              <div
                className={clsx(
                  "grid place-content-start place-items-start gap-x-[1.5rem]",
                  state.cases.data.length > 2
                    ? "grid-cols-1"
                    : state.options.selected.id === "scalp"
                    ? "grid-cols-2"
                    : "grid-cols-1",
                  "max-h-[200px]",
                  "overflow-auto"
                )}
              >
                {Object.keys(individualGroupScreeningData).map(
                  (screening, screeningIndex) => {
                    if (
                      screening === "hair_pigmentation" ||
                      screening === "follicle_capacity"
                    ) {
                      return (
                        <ScreeningCardCustomerComparison
                          key={screeningIndex}
                          name={individualGroupScreeningData[screening]?.name}
                          description={
                            individualGroupScreeningData[screening]?.description
                          }
                        >
                          <div className={clsx("w-full")}>
                            <ColorSizeGradientBar
                              data={(
                                appDictionaries.cases.screening.items.find(
                                  (screeningItem) =>
                                    screeningItem.id === screening
                                )?.members ?? []
                              )
                                // NOTES: remove 0 value from gradient display
                                .filter(
                                  (screeningItem) =>
                                    ((
                                      individualGroupScreeningData[screening]
                                        ?.value as {
                                        [key: string]: number;
                                      }
                                    )[screeningItem.id] ?? 0) *
                                      100 !==
                                    0
                                )
                                .map((screeningItem) => {
                                  return {
                                    id: screeningItem.id,
                                    name: screeningItem.name,
                                    color: screeningItem.color,
                                    value:
                                      ((
                                        individualGroupScreeningData[screening]
                                          ?.value as {
                                          [key: string]: number;
                                        }
                                      )[screeningItem.id] ?? 0) * 100,
                                  };
                                })}
                            />
                          </div>
                        </ScreeningCardCustomerComparison>
                      );
                    }

                    if (
                      screening === "stratum_corneum" ||
                      screening === "dead_skin" ||
                      screening === "scalp_wrinkle" ||
                      screening === "scalp_irritation" ||
                      screening === "scalp_secretion"
                    ) {
                      return (
                        <ScreeningCardCustomerComparison
                          key={screeningIndex}
                          name={individualGroupScreeningData[screening]?.name}
                          description={
                            individualGroupScreeningData[screening]?.description
                          }
                        >
                          <div className={clsx("w-full")}>
                            <ColorGradientBar
                              data={
                                appDictionaries.cases.screening.items.find(
                                  (screeningItem) =>
                                    screeningItem.id === screening
                                )?.levels ?? []
                              }
                              value={
                                ((individualGroupScreeningData[screening]
                                  ?.value as number) ?? 0) * 100
                              }
                            />
                          </div>
                        </ScreeningCardCustomerComparison>
                      );
                    }
                    return (
                      <ScreeningCardCustomerComparison
                        key={screeningIndex}
                        name={individualGroupScreeningData[screening]?.name}
                        description={
                          individualGroupScreeningData[screening]?.description
                        }
                        value={`${
                          typeof individualGroupScreeningData[screening]
                            ?.value === "number"
                            ? (
                                individualGroupScreeningData[screening]
                                  ?.value ?? 0
                              ).toFixed(1)
                            : ""
                        } ${individualGroupScreeningData[screening]?.unit}`}
                      />
                    );
                  }
                )}
              </div>

              {/*  */}
            </div>
          </CaseCardCustomerComparison>
        );
      })}
    </div>
  );
};
