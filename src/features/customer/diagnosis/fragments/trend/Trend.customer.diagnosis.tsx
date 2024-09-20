import { useContext } from "react";
import clsx from "clsx";
import { NoTrendResultScan } from "../../components/no_trend_result/NoTrendResult.scan";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { Badge } from "src/core/ui/components/badge";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { LineChartDiagnosis } from "../../components/line_chart";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import moment from "moment";
import { LineChartLegendDiagnosis } from "../../components/line_chart_legend";
import { AppContext } from "src/core/modules/app/context";

export const TrendCustomerDiagnosis = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);

  const { state: appState } = useContext(AppContext);

  if (!appState.cases.diagnosis.trends.data) {
    return null;
  }

  if (!appState.cases.data.data.length) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center",
          "pt-[110px]",
          "w-full"
        )}
      >
        <NoTrendResultScan
          message={dictionaries.trends.no_trend.message}
          description={dictionaries.trends.no_trend.description}
        />
      </div>
    );
  }

  const serviceTimes = appState.cases.diagnosis.trends.data.map((item) => {
    const stillUtc = moment.utc(item.svc_time).toDate();
    const result = moment(stillUtc).local().format("YY/MM/DD");
    return result;
  });
  const metrics = !!appState.cases.diagnosis.trends.data.length
    ? Object.keys(appState.cases.diagnosis.trends.data[0].overview)
    : [];
  const lineChartCategories = metrics.map((metric) => {
    return {
      label: metric,
      data: appState.cases.diagnosis.trends.data.map(
        (item) => item.overview[metric]
      ),
      color:
        appDictionaries.cases.diagnosis.metric.items.find(
          (item) => item.name === metric
        )?.color ?? "white",
    };
  });

  const lineChartLegend = metrics.map((metric) => {
    return {
      id:
        appDictionaries.cases.diagnosis.metric.items.find(
          (item) => item.name === metric
        )?.id ?? "",
      name: metric,
      color:
        appDictionaries.cases.diagnosis.metric.items.find(
          (item) => item.name === metric
        )?.color ?? "",
    };
  });

  return (
    <>
      <Badge
        variant="info"
        open
        message={dictionaries.trends.information_banner.message.replace(
          "{{N}}",
          appState.cases.diagnosis.trends.data.length.toString()
        )}
      />
      <VerticalFlexGrow>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-y-[1.5rem]",
            "w-full"
          )}
        >
          <LineChartDiagnosis
            labels={serviceTimes}
            categories={lineChartCategories}
          />

          <LineChartLegendDiagnosis
            title={dictionaries.trends.legend_information.title}
            data={lineChartLegend}
          />
        </div>
      </VerticalFlexGrow>
    </>
  );
};
