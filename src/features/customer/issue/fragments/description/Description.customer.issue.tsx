import { useContext } from "react";
import { CustomerIssueContext } from "../../context";
import { DescriptionCardCustomerIssue } from "../../components/description_card/DescriptionCard.customer.issue";
import { useCustomerIssueGetDiagnosisIssue } from "../../react_query/hooks/useGetDiagnosisIssue.customer.issue";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export const DescriptionCustomerIssue = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  const { state } = useContext(CustomerIssueContext);
  const { isLoading } = useCustomerIssueGetDiagnosisIssue();
  if (isLoading) {
    return null;
  }
  return (
    <DescriptionCardCustomerIssue
      cta={{
        primary: {
          children: dictionaries.description.read_more,
        },
        secondary: {
          children: dictionaries.description.read_less,
        },
      }}
      name={`${dictionaries.description.title} ${state.detail.name}`}
      photo={state.detail.photo}
      introduction={state.detail.introduction}
      prevalence={state.detail.prevalence}
      symptoms={state.detail.symptoms}
      causes={state.detail.causes}
    />
  );
};
