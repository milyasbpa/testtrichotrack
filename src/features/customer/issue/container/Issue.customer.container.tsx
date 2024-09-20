import clsx from "clsx";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { HeaderCustomerIssue } from "../fragments/header";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { OverviewCustomerIssue } from "../fragments/overview";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { DescriptionCustomerIssue } from "../fragments/description";
import { RecommendationCustomerIssue } from "../fragments/recommendation";
import { RatingCustomerIssue } from "../fragments/rating";
import { LevelInfoCustomerIssue } from "../fragments/level_info";

export const CustomerIssueContainer = () => {
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          {/* header */}
          <HeaderCustomerIssue />
          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
                "w-full"
              )}
            >
              <OverviewCustomerIssue />
              <RatingCustomerIssue />
              <DescriptionCustomerIssue />
              <RecommendationCustomerIssue />
            </div>
          </VerticalFlexGrow>
        </VerticalFlexContainer>
      </Card>
      <LevelInfoCustomerIssue />
    </AppContainer>
  );
};
