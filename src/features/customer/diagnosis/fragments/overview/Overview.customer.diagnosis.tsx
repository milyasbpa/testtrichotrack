import clsx from "clsx";
import { Badge } from "src/core/ui/components/badge";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { CategoryRadarChartDiagnosis } from "../../components/category_radar_chart/CategoryRadarChart.diagnosis";
import { useContext } from "react";
import { MetricDescriptionCardCustomerDiagnosis } from "../../components/metric_description_card";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { AppContext } from "src/core/modules/app/context";

export const OverviewCustomerDiagnosis = () => {
  const { locale } = useParams();
  const navigate = useNavigate();

  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const { state: appState } = useContext(AppContext);

  const overviewData = appState.cases.diagnosis.overview.data;
  if (!overviewData) {
    return null;
  }

  const chartData = !Object.keys(overviewData).length
    ? []
    : Object.keys(overviewData).map((item, index) => {
        return {
          id: item,
          label: {
            name:
              dictionaries.overview.radar.label.position.items.find(
                (item) => item.id === index
              )?.id === 0 ||
              dictionaries.overview.radar.label.position.items.find(
                (item) => item.id === index
              )?.id === 3
                ? overviewData[item]?.name
                : dictionaries.overview.radar.label.position.items.find(
                    (item) => item.id === index
                  )?.text.position === "left"
                ? overviewData[item]?.name?.replace(" ", "<br />")
                : dictionaries.overview.radar.label.position.items.find(
                    (item) => item.id === index
                  )?.text.position === "right"
                ? overviewData[item]?.name?.replace(" ", "<br />")
                : overviewData[item]?.name,
            icon: {
              name:
                overviewData[item].rating > 4
                  ? "CheckCircle"
                  : "ExclamationCircle",
              color:
                overviewData[item].rating === 5
                  ? appDictionaries.cases.diagnosis.rating.items.find(
                      (ratingItem) =>
                        ratingItem.max === overviewData[item].rating
                    )?.color ?? "white"
                  : appDictionaries.cases.diagnosis.rating.items.find(
                      (ratingItem) =>
                        overviewData[item].rating < ratingItem.max &&
                        overviewData[item].rating >= ratingItem.min
                    )?.color ?? "white",
            },
            position: {
              top:
                dictionaries.overview.radar.label.position.items.find(
                  (item) => item.id === index
                )?.top ?? "0%",
              left:
                dictionaries.overview.radar.label.position.items.find(
                  (item) => item.id === index
                )?.left ?? "0%",
            },
            text: {
              position:
                dictionaries.overview.radar.label.position.items.find(
                  (item) => item.id === index
                )?.text.position ?? "left",
            },
          },
          value: overviewData[item].rating,
        };
      });

  const handleClickToIssue = (data: { value: string }) => {
    navigate(
      PrivateRouteURL.routeToCustomerIssueURL({
        locale: locale,
        diagnosis: data.value,
        case_id: appState.cases.data.selected?.id ?? "",
      })
    );
  };

  // metric description
  const sortedMetricsData = Object.fromEntries(
    Object.entries(overviewData).sort((a, b) => a[1].rating - b[1].rating)
  );

  const sortedMetricsExplanation = Object.keys(sortedMetricsData).map(
    (item) => {
      return {
        id: item,
        name: sortedMetricsData[item].name,
        description: appDictionaries.cases.diagnosis.metric.description
          .replace("{{metric}}", sortedMetricsData[item].name)
          .replace(
            "{{target}}",
            appDictionaries.cases.diagnosis.metric.items.find(
              (metricItem) => metricItem.id === item
            )?.target ?? ""
          )
          .replace("{{metric}}", sortedMetricsData[item].name)
          .replace(
            "{{rating_color}}",
            sortedMetricsData[item].rating === 5
              ? appDictionaries.cases.diagnosis.rating.items.find(
                  (ratingItem) => ratingItem.max === overviewData[item].rating
                )?.color ?? ""
              : appDictionaries.cases.diagnosis.rating.items.find(
                  (ratingItem) =>
                    sortedMetricsData[item].rating < ratingItem.max &&
                    sortedMetricsData[item].rating >= ratingItem.min
                )?.color ?? ""
          )
          .replace("{{rating}}", sortedMetricsData[item].rating.toFixed(1))
          .replace(
            "{{rating_description}}",
            sortedMetricsData[item].rating === 5
              ? appDictionaries.cases.diagnosis.rating.items.find(
                  (ratingItem) => ratingItem.max === overviewData[item].rating
                )?.description ?? ""
              : appDictionaries.cases.diagnosis.rating.items.find(
                  (ratingItem) =>
                    sortedMetricsData[item].rating < ratingItem.max &&
                    sortedMetricsData[item].rating >= ratingItem.min
                )?.description ?? ""
          )
          .replace("{{level}}", sortedMetricsData[item].level)
          .replace(
            "{{level_color}}",
            sortedMetricsData[item].rating === 5
              ? appDictionaries.cases.diagnosis.rating.items.find(
                  (ratingItem) => ratingItem.max === overviewData[item].rating
                )?.color ?? ""
              : appDictionaries.cases.diagnosis.rating.items.find(
                  (ratingItem) =>
                    sortedMetricsData[item].rating < ratingItem.max &&
                    sortedMetricsData[item].rating >= ratingItem.min
                )?.color ?? ""
          )
          .replace(
            "{{issue}}",
            appDictionaries.cases.diagnosis.metric.items.find(
              (metricItem) => metricItem.id === item
            )?.issue ?? ""
          )
          .replace(
            "{{target}}",
            appDictionaries.cases.diagnosis.metric.items.find(
              (metricItem) => metricItem.id === item
            )?.target ?? ""
          ),
      };
    }
  );

  const handleClickMetricDescription = (data: { value: string }) => {
    navigate(
      PrivateRouteURL.routeToCustomerIssueURL({
        locale: locale,
        diagnosis: data.value,
        case_id: appState.cases.data.selected?.id ?? "",
      })
    );
  };

  return (
    <>
      <Badge
        variant="info"
        open
        message={dictionaries.overview.information_banner.message}
      />
      <VerticalFlexGrow>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-y-[1.5rem]",
            "w-full"
          )}
        >
          <CategoryRadarChartDiagnosis
            data={chartData}
            onClick={handleClickToIssue}
          />

          <div
            className={clsx(
              "grid grid-flow-col gap-[1.5rem]",
              "overflow-auto",
              "w-full"
            )}
          >
            {sortedMetricsExplanation.map((item, index) => (
              <MetricDescriptionCardCustomerDiagnosis
                key={index}
                name={item.name}
                description={item.description}
                cta={{
                  primary: {
                    children:
                      dictionaries.overview.actions.read_more.toUpperCase(),
                    onClick: () =>
                      handleClickMetricDescription({ value: item.id }),
                  },
                }}
              />
            ))}
          </div>
        </div>
      </VerticalFlexGrow>
    </>
  );
};
