import clsx from "clsx";
import { ItemsOutletList } from "../fragments/items/Items.outlet.list";
import { SortOutletList } from "../fragments/sort/Sort.outlet.list";
import { SearchOutletList } from "../fragments/search/Search.outlet.list";
import { HeaderOutletList } from "../fragments/header/Header.outlet.list";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { DeleteConfirmationOutletList } from "../fragments/delete_confirmation";

export const DisplayListContainer = () => {
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full",
            "px-[1.5rem] py-[1.5rem]"
          )}
        >
          <HeaderOutletList />

          <SearchOutletList />

          <SortOutletList />

          <ItemsOutletList />
        </div>
      </Card>
      <DeleteConfirmationOutletList />
    </AppContainer>
  );
};
