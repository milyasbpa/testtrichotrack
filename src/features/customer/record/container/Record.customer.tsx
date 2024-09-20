import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { AppContainer } from "src/core/modules/app/container";
import { CustomerRecordActionEnum, CustomerRecordContext } from "../context";
import { FlowCustomerRecord } from "../fragments/flow";
import { TimelineCustomerRecord } from "../fragments/timeline";
import { getDictionaries } from "../i18n";
import { FooterCustomerRecord } from "../fragments/footer";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { TypeCustomerRecord } from "../fragments/type";
import { GlobalCustomerRecord } from "../fragments/global";
import { RoutineCustomerRecord } from "../fragments/routine";
import { SpotlightCustomerRecord } from "../fragments/spotlight";

export const CustomerRecordContainer = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  const { state, dispatch } = useContext(CustomerRecordContext);

  useEffect(() => {
    dispatch({
      type: CustomerRecordActionEnum.SetTypeData,
      payload: {
        ...state.type,
        selected:
          dictionaries.type.items.find((_, index) => index === 1) ?? null,
      },
    });
  }, []);

  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <FlowCustomerRecord />

          <TimelineCustomerRecord />
          <TypeCustomerRecord />
          <VerticalFlexGrow>
            {state.type.selected?.id === "Global" ? (
              <GlobalCustomerRecord />
            ) : state.type.selected?.id === "Routine" ? (
              <RoutineCustomerRecord />
            ) : (
              <SpotlightCustomerRecord />
            )}
          </VerticalFlexGrow>

          <FooterCustomerRecord />
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
