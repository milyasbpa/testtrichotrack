import clsx from "clsx";
import { Card } from "src/core/ui/components/card/Card";
import { useCustomerIssueGetDiagnosisOverview } from "../../react_query/hooks";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { useContext } from "react";
import { CustomerIssueContext } from "../../context";

export const OverviewCustomerIssue = () => {
  const { locale, diagnosis } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const { state } = useContext(CustomerIssueContext);
  const { isLoading } = useCustomerIssueGetDiagnosisOverview();

  if (isLoading || !state.overview.data) {
    return null;
  }
  // diagnosis metric overview
  const metricData = state.overview.data;
  const description = appDictionaries.cases.diagnosis.metric.description
    .replace("{{metric}}", metricData.name)
    .replace(
      "{{target}}",
      appDictionaries.cases.diagnosis.metric.items.find(
        (metricItem) => metricItem.id === diagnosis
      )?.target ?? ""
    )
    .replace("{{metric}}", metricData.name)
    .replace(
      "{{rating_color}}",
      metricData.rating === 5
        ? appDictionaries.cases.diagnosis.rating.items.find(
            (ratingItem) => ratingItem.max === metricData.rating
          )?.color ?? ""
        : appDictionaries.cases.diagnosis.rating.items.find(
            (ratingItem) =>
              metricData.rating < ratingItem.max &&
              metricData.rating >= ratingItem.min
          )?.color ?? ""
    )
    .replace("{{rating}}", metricData.rating.toFixed(1))
    .replace(
      "{{rating_description}}",
      metricData.rating === 5
        ? appDictionaries.cases.diagnosis.rating.items.find(
            (ratingItem) => ratingItem.max === metricData.rating
          )?.description ?? ""
        : appDictionaries.cases.diagnosis.rating.items.find(
            (ratingItem) =>
              metricData.rating < ratingItem.max &&
              metricData.rating >= ratingItem.min
          )?.description ?? ""
    )
    .replace("{{level}}", metricData.level)
    .replace(
      "{{level_color}}",
      metricData.rating === 5
        ? appDictionaries.cases.diagnosis.rating.items.find(
            (ratingItem) => ratingItem.max === metricData.rating
          )?.color ?? ""
        : appDictionaries.cases.diagnosis.rating.items.find(
            (ratingItem) =>
              metricData.rating < ratingItem.max &&
              metricData.rating >= ratingItem.min
          )?.color ?? ""
    )
    .replace(
      "{{issue}}",
      appDictionaries.cases.diagnosis.metric.items.find(
        (metricItem) => metricItem.id === diagnosis
      )?.issue ?? ""
    )
    .replace(
      "{{target}}",
      appDictionaries.cases.diagnosis.metric.items.find(
        (metricItem) => metricItem.id === diagnosis
      )?.target ?? ""
    );
  return (
    <Card elevation="3" className={clsx("!rounded-[0.5rem]")}>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full",
          "px-[1rem] py-[1rem]"
        )}
      >
        <p className={clsx("text-[1.25rem] text-white font-bold text-left")}>
          {dictionaries.overview.title}
        </p>
        <p
          dangerouslySetInnerHTML={{
            __html: description,
          }}
          className={clsx("text-[1rem] text-white-80 font-regular text-left")}
        />
      </div>
    </Card>
  );
};
