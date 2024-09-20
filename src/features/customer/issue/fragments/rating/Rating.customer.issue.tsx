import { useContext } from "react";
import clsx from "clsx";
import { CustomerIssueActionEnum, CustomerIssueContext } from "../../context";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { useParams, useSearchParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import {
  useCustomerIssueGetDiagnosisDetails,
  useCustomerIssueGetFactorLevelInfo,
  useCustomerIssueSetScanScreening,
} from "../../react_query/hooks";
import { Tabs } from "src/core/ui/components/tabs";
import { Tab } from "src/core/ui/components/tab";
import { ScanEvidenceCardIssue } from "../../components/scan_evidence_card/ScanEvidenceCard.issue";
import { GaugeChart } from "src/core/ui/components/gauge_chart/GaugeChart";
import { Markdown } from "src/core/ui/components/markdown";
import { CustomerIssueRouterQuery } from "../../router/query";
import { WeightBarChart } from "src/core/ui/components/weight_horizontal_bar";

export const RatingCustomerIssue = () => {
  const { locale } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const { isFetching: isFetchingGetDiagnosisDetails } =
    useCustomerIssueGetDiagnosisDetails();
  useCustomerIssueGetFactorLevelInfo();

  const { state, dispatch } = useContext(CustomerIssueContext);
  const { mutate: setScreening } = useCustomerIssueSetScanScreening();

  const title = dictionaries.rating.title;

  const handleSelectFactor = (data: { id: string; name: string }) => {
    setSearchParams(
      data.id === "overall"
        ? undefined
        : {
            [CustomerIssueRouterQuery.FACTOR]: data.id,
          }
    );
  };

  const handleClickScan = (data: {
    scan_id: number;
    value: number;
    region: string;
    image: string;
    svc_time: string;
  }) => {
    setScreening({
      id: data.scan_id,
      region: data.region,
      image: data.image,
      svc_time: data.svc_time,
    });
  };

  if (isFetchingGetDiagnosisDetails || !state.overview.data) {
    return null;
  }

  const factors = [
    ...dictionaries.rating.factor.items,
    ...state.rating.data.factors.map((item) => {
      return {
        id: item.factor,
        name: item.name,
      };
    }),
  ];

  const metricData = state.overview.data;
  const overallValue =
    (metricData.rating / appDictionaries.cases.diagnosis.rating.items.length) *
    100;
  const selectedFactorId = searchParams.get(CustomerIssueRouterQuery.FACTOR);

  const handleClickSegment = (value: number) => {
    dispatch({
      type: CustomerIssueActionEnum.SetLevelInfoValue,
      payload: {
        ...state.level_info,
        selected: {
          ...state.level_info.selected,
          id: String(value + 1),
          name: String(value + 1),
        },
      },
    });
  };

  const selectedFactor =
    appDictionaries.cases.screening.items.find(
      (item) => item.id === selectedFactorId
    ) ?? null;
  state.rating.data.factors.find((item) => item.factor === selectedFactorId)
    ?.value ?? 0;
  const selectedFactorValue =
    state.rating.data.factors.find((item) => item.factor === selectedFactorId)
      ?.value ?? 0;
  const maxFactorValue = 1;
  const selectedFactorColors =
    appDictionaries.cases.screening.items
      .find((item) => item.id === selectedFactorId)
      ?.levels.map((item) => item.color) ?? [];
  const selectedFactorSegment =
    appDictionaries.cases.screening.items.find(
      (item) => item.id === selectedFactorId
    )?.levels.length ?? 1;
  const selectedFactorLevel =
    (selectedFactorValue / maxFactorValue) * selectedFactorSegment;
  const selectedFactorLabel = selectedFactor?.levels.find((_, index) =>
    selectedFactorLevel === selectedFactor.levels.length
      ? index === selectedFactor.levels.length - 1
      : Math.floor(selectedFactorLevel) === index
  )?.name;

  return (
    <div
      className={clsx(
        "px-[1rem] py-[1rem]",
        "rounded-[0.5rem]",
        "bg-charleston-green",
        "grid grid-cols-1 place-content-start place-items-start gap-y-[1.75rem]",
        "w-full"
      )}
    >
      {/* overview */}
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-y-[1.5rem]",
          "w-full"
        )}
      >
        <div className={clsx("flex items-center justify-between", "w-full")}>
          <h3 className={clsx("text-[1.25rem] text-white font-bold")}>
            {title}
          </h3>
        </div>

        {/* factors */}
        <div className={clsx("w-full overflow-auto")}>
          <Tabs
            className={clsx(
              "!grid-flow-col !gap-[1rem]",
              "!overflow-auto",
              "!rounded-none"
            )}
            style={{
              gridTemplateColumns: undefined,
            }}
          >
            {factors.map((item, index) => {
              const isSelected = !searchParams.get(
                CustomerIssueRouterQuery.FACTOR
              )
                ? index === 0
                : searchParams.get(CustomerIssueRouterQuery.FACTOR) === item.id;
              return (
                <Tab
                  key={index}
                  selected={isSelected}
                  className={clsx(
                    "min-w-[200px] !h-[2.5rem]",
                    !isSelected && "!border !border-[#666666]",
                    "!text-[0.875rem]"
                  )}
                  onClick={() => handleSelectFactor(item)}
                >
                  {item.name}
                </Tab>
              );
            })}
          </Tabs>
        </div>
        {/* end factors */}

        {/* overall rating */}
        {!selectedFactorId && (
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <WeightBarChart
              name={
                dictionaries.rating.factor.items.find(
                  (item) => item.id === "overall"
                )?.name ?? ""
              }
              label={
                appDictionaries.cases.diagnosis.rating.items.map(
                  (item) => item.name
                ) ?? []
              }
              value={metricData.rating}
              style={{
                width: `${overallValue}%`,
                backgroundColor:
                  metricData.rating === 5
                    ? appDictionaries.cases.diagnosis.rating.items.find(
                        (ratingItem) => ratingItem.max === metricData.rating
                      )?.color ?? "white"
                    : appDictionaries.cases.diagnosis.rating.items.find(
                        (ratingItem) =>
                          metricData.rating < ratingItem.max &&
                          metricData.rating >= ratingItem.min
                      )?.color ?? "white",
              }}
            />
            <Markdown markdown={state.rating.data.description} />
          </div>
        )}
        {/* end overall rating */}

        {!!selectedFactorId && (
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <GaugeChart
              value={selectedFactorValue}
              maxValue={maxFactorValue}
              colors={selectedFactorColors}
              segments={selectedFactorSegment}
              label={selectedFactorLabel}
              onSegmentClick={handleClickSegment}
            />

            <Markdown
              markdown={
                state.rating.data.factors.find(
                  (item) => item.factor === selectedFactorId
                )?.description ?? ""
              }
            />
            <div
              className={clsx(
                "grid place-content-center place-items-center",
                "w-full"
              )}
            >
              <img
                src={
                  state.rating.data.factors.find(
                    (item) => item.factor === selectedFactorId
                  )?.mapping_figure ?? ""
                }
                className={clsx("w-[380px]")}
              />
            </div>

            {/* scan evidence */}
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
                "w-full"
              )}
            >
              <p className={clsx("text-[1rem] font-bold text-[white]")}>
                {dictionaries.rating.evidence.title.replace(
                  "{{factor}}",
                  state.rating.data.factors.find(
                    (item) => item.factor === selectedFactorId
                  )?.name ?? ""
                )}
              </p>
              <div
                className={clsx(
                  "grid grid-cols-2 place-content-start place-items-start gap-[1rem]",
                  "w-full"
                )}
              >
                {state.rating.data.factors
                  .find((item) => item.factor === selectedFactorId)
                  ?.evidences.map((item, index) => (
                    <ScanEvidenceCardIssue
                      key={index}
                      region={item.region}
                      image={item.image}
                      icon={
                        appDictionaries.cases.region.items.find(
                          (regionItem) => regionItem.name === item.region
                        )?.image_url ?? ""
                      }
                      factor={dictionaries.rating.evidence.factor.label.replace(
                        "{{factor}}",
                        state.rating.data.factors.find(
                          (item) => item.factor === selectedFactorId
                        )?.name ?? ""
                      )}
                      rating={item.value.toFixed(1)}
                      onClick={() => handleClickScan(item)}
                    />
                  ))}
              </div>
            </div>

            {/* end scan evidence */}
          </div>
        )}
      </div>
    </div>
  );
};
