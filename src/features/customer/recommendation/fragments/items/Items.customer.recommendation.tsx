import { useContext } from "react";
import clsx from "clsx";
import { OverallAccordionRecommendation } from "../../components/overall_accordion/OverallAccordion.recommendation";
import { useOverviewGetOverallRecommendation } from "../../react_query/hooks/useGetOverallRecommendation.customer.recommendation";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { CustomerRecommendationContext } from "../../context";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const ItemsCustomerRecommendation = () => {
  const { locale } = useParams();
  const navigate = useNavigate();
  const appDictionaries = getAppDictionaries(locale);
  const dictionaries = getDictionaries(locale);

  const { state } = useContext(CustomerRecommendationContext);

  const { isFetching: isFetchingGetOverallRecommendation } =
    useOverviewGetOverallRecommendation();

  const handleSelectTreatment = (data: {
    issue: string;
    treatment_id: number;
    treatment_type: string;
  }) => {
    if (data.treatment_type === "Home Care") {
      navigate(
        PrivateRouteURL.routeToCustomerHomeCareURL({
          locale: locale,
          id: String(data.treatment_id),
        })
      );
    } else {
      navigate(
        PrivateRouteURL.routeToCustomerCarePlansURL({
          locale: locale,
          care_plans_id: String(data.treatment_id),
          diagnosis_id:
            appDictionaries.cases.diagnosis.metric.items.find(
              (item) => item.issue === data.issue
            )?.id ?? "",
        })
      );
    }
  };

  if (isFetchingGetOverallRecommendation) {
    return null;
  }
  if (!isFetchingGetOverallRecommendation && !state.overall.data.length) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center w-full gap-y-[76px]",
          "py-[136px]"
        )}
      >
        <h3 className={clsx("text-[2rem] font-bold text-white")}>
          {dictionaries.healthy_condition.message}
        </h3>

        <img
          src={"/illustrations/healthy-condition.illustration.svg"}
          width={320}
          height={320}
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start w-full"
      )}
    >
      {state.overall.data.map((data, dataIndex) => (
        <OverallAccordionRecommendation
          key={dataIndex}
          data={data}
          issueID={dataIndex}
          totalIssue={state.overall.data.length}
          onSelectTreatment={handleSelectTreatment}
        />
      ))}
    </div>
  );
};
