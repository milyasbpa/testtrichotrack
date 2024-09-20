import { useContext } from "react";
import { getDictionaries } from "../../i18n";
import { CustomerCarePlansContext } from "../../context";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { Divider } from "src/core/ui/components/divider";
import { WeightBarChart } from "src/core/ui/components/weight_horizontal_bar";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const ScheduleCustomerCarePlans = () => {
  const { locale, diagnosis_id } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const { state } = useContext(CustomerCarePlansContext);

  const metricData = state.diagnosis.overview.data;

  const isDeepCleansing = !state.careplans.data?.schedule.length;
  if (isDeepCleansing || !metricData) {
    return null;
  }

  // NOTES: Rating Logic
  const overallValue =
    (metricData.rating / appDictionaries.cases.diagnosis.rating.items.length) *
    100;

  // NOTES: Description Logic
  // diagnosis metric overview

  const description = appDictionaries.cases.diagnosis.metric.description
    .replace("{{metric}}", metricData.name)
    .replace(
      "{{target}}",
      appDictionaries.cases.diagnosis.metric.items.find(
        (metricItem) => metricItem.id === diagnosis_id
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
        (metricItem) => metricItem.id === diagnosis_id
      )?.issue ?? ""
    )
    .replace(
      "{{target}}",
      appDictionaries.cases.diagnosis.metric.items.find(
        (metricItem) => metricItem.id === diagnosis_id
      )?.target ?? ""
    );

  // TODO: fixing logic on recommendation description template

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
      <p className={clsx("text-[1.25rem] text-white-80 font-bold text-left")}>
        {dictionaries.schedule_card.title}
      </p>

      {/* chart */}
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem]",
          "w-full"
        )}
      >
        <WeightBarChart
          name={
            appDictionaries.cases.diagnosis.metric.items.find(
              (item) => item.id === diagnosis_id
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
      </div>

      <Divider />

      <p
        dangerouslySetInnerHTML={{
          __html: description,
        }}
        className={clsx("text-[1rem] text-white-80 font-regular text-left")}
      />
    </div>
  );
};
