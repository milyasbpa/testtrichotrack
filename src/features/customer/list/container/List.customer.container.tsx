import clsx from "clsx";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { HeaderCustomerList } from "../fragments/header";
import { SearchCustomerList } from "../fragments/search";
import { SortCustomerList } from "../fragments/sort";
import { ItemsCustomerList } from "../fragments/items";
import { FooterCustomerList } from "../fragments/footer";

export const CustomerListContainer = () => {
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <div
          className={clsx(
            "flex flex-col items-start justify-start gap-[1.5rem]",
            "w-full h-full",
            "px-[1.5rem] py-[1.5rem]"
          )}
        >
          <HeaderCustomerList />
          <SearchCustomerList />
          <SortCustomerList />
          <div
            className={clsx(
              "flex flex-grow overflow-y-auto overflow-x-hidden",
              "w-full h-full"
            )}
          >
            <ItemsCustomerList />
          </div>

          <FooterCustomerList />
        </div>
      </Card>
    </AppContainer>
  );
};
