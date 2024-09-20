import clsx from "clsx";
import { AppContainer } from "src/core/modules/app/container";
import { HeaderStaffList } from "../fragments/header";
import { SearchStaffList } from "../fragments/search";
import { useDisplayGetUser } from "../react_query/hooks/useGetUser.list";
import { useDisplayGetOutlets } from "../react_query/hooks/useGetOutlets.list";
import { Card } from "src/core/ui/components/card/Card";
import { FilterStaffList } from "../fragments/filter";
import { SortStaffList } from "../fragments/sort";
import { ItemsStaffList } from "../fragments/items";
import { DeleteConfirmationStaffList } from "../fragments/delete_confirmation";

export const StaffListContainer = () => {
  useDisplayGetUser();
  useDisplayGetOutlets();

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
          <HeaderStaffList />

          <SearchStaffList />
          <FilterStaffList />
          <SortStaffList />
          <div
            className={clsx(
              "flex flex-grow overflow-y-auto overflow-x-hidden",
              "w-full h-full"
            )}
          >
            <ItemsStaffList />
          </div>
        </div>
      </Card>
      <DeleteConfirmationStaffList />
    </AppContainer>
  );
};
