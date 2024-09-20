import { useContext } from "react";
import clsx from "clsx";
import { useCustomerIssueGetRecommendationsMetric } from "../../react_query/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { CustomerIssueContext } from "../../context";
import { NoRecommendationCardIssue } from "../../components/no_recommendation_card/NoRecommendationCard.issue";
import { TreatmentCardIssue } from "../../components/treatment_card/TreatmentCard.issue";
import { PreventionIssue } from "../../components/prevention/Prevention.issue";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const RecommendationCustomerIssue = () => {
  const navigate = useNavigate();
  const { locale, diagnosis, id } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const { isError: isErrorGetRecommendationsMetric } =
    useCustomerIssueGetRecommendationsMetric();

  const { state } = useContext(CustomerIssueContext);

  const handleSelectCarePlansSolution = (value: {
    issue: string;
    treatment_id: number;
  }) => {
    navigate(
      PrivateRouteURL.routeToCustomerCarePlansURL({
        locale: locale,
        care_plans_id: String(value.treatment_id),
        diagnosis_id: diagnosis ?? "",
        case_id: id,
      })
    );
  };

  const handleSelectHomeCaresSolution = (value: {
    issue: string;
    treatment_id: number;
  }) => {
    navigate(
      PrivateRouteURL.routeToCustomerHomeCareURL({
        locale: locale,
        id: String(value.treatment_id),
      })
    );
  };

  const formattedMessage = dictionaries.recommendation_card.message.replace(
    "{{issue}}",
    appDictionaries.cases.diagnosis.metric.items.find(
      (item) => item.id === diagnosis
    )?.issue ?? ""
  );
  if (
    isErrorGetRecommendationsMetric &&
    !state.recommendations.care_plans.length &&
    !state.recommendations.home_cares.length
  ) {
    return (
      <NoRecommendationCardIssue
        message={dictionaries.recommendation_card.no_recommendation}
        image_url={dictionaries.recommendation_card.image_url}
      />
    );
  }

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
      <PreventionIssue
        name={state.detail.prevention.name}
        description={state.detail.prevention.description}
      />

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-y-[1.5rem]",
          "w-full"
        )}
      >
        <p
          dangerouslySetInnerHTML={{
            __html: formattedMessage,
          }}
          className={clsx("text-[1rem] text-white-80 font-regular text-left")}
        />
        <div
          className={clsx(
            "grid grid-cols-2 place-content-start place-items-start gap-x-[1.5rem] gap-y-[1.5rem]",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-y-[0.5rem] w-full"
            )}
          >
            <p className={clsx("text-[1rem] text-white-80 font-bold")}>
              {dictionaries.recommendation_card.treatment_types.care_plans}
            </p>
            {state.recommendations.care_plans.map((item, index) => (
              <TreatmentCardIssue
                key={index}
                id={item.id}
                issue={state.recommendations.issue}
                name={item.name}
                image={item.image}
                description={item.description}
                onClick={handleSelectCarePlansSolution}
              />
            ))}
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-y-[0.5rem] w-full"
            )}
          >
            <p className={clsx("text-[1rem] text-white-80 font-bold")}>
              {dictionaries.recommendation_card.treatment_types.home_cares}
            </p>
            {state.recommendations.home_cares.map((item, index) => (
              <TreatmentCardIssue
                key={index}
                id={item.id}
                issue={state.recommendations.issue}
                name={item.name}
                image={item.image}
                description={item.description}
                onClick={handleSelectHomeCaresSolution}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
