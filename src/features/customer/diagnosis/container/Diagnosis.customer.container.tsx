import clsx from "clsx";
import { AppContainer } from "src/core/modules/app/container";
import { FlowCustomerDiagnosis } from "../fragments/flow/Flow.customer.diagnosis";
import { TimelineCustomerDiagnosis } from "../fragments/timeline";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { useContext, useEffect } from "react";
import {
  CustomerDiagnosisActionEnum,
  CustomerDiagnosisContext,
} from "../context";
import { OverviewCustomerDiagnosis } from "../fragments/overview/Overview.customer.diagnosis";
import { TypeCustomerDiagnosis } from "../fragments/type";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../i18n";
import { ScreeningCustomerDiagnosis } from "../fragments/screening";
import { TrendCustomerDiagnosis } from "../fragments/trend";

export const CustomerDiagnosisContainer = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerDiagnosisContext);
  useEffect(() => {
    dispatch({
      type: CustomerDiagnosisActionEnum.SetTypeData,
      payload: {
        ...state.type,
        selected:
          dictionaries.type.items.find((_, index) => index === 0) ?? null,
      },
    });
  }, []);
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <FlowCustomerDiagnosis />

          {/* timeline */}

          <TimelineCustomerDiagnosis />

          <TypeCustomerDiagnosis />

          {state.type.selected?.id === "Overview" ? (
            <OverviewCustomerDiagnosis />
          ) : state.type.selected?.id === "Screening" ? (
            <ScreeningCustomerDiagnosis />
          ) : (
            <TrendCustomerDiagnosis />
          )}
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
