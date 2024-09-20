import clsx from "clsx";
import { HeaderStaffEdit } from "../fragments/header/Header.staff.edit";
import { FormStaffEdit } from "../fragments/form/Form.staff.edit";
import { useStaffEditGetUser } from "../react_query/hooks/useGetUser.staff.edit";
import { AppContainer } from "src/core/modules/app/container";
import { Divider } from "src/core/ui/components/divider";
import { Card } from "src/core/ui/components/card/Card";
import { FooterStaffEdit } from "../fragments/footer";

export const StaffEditContainer = () => {
  const { isLoading: isLoadingGetUser } = useStaffEditGetUser();
  if (isLoadingGetUser) {
    return null;
  }
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
          <HeaderStaffEdit />
          <Divider />
          <div
            className={clsx(
              "flex flex-grow overflow-y-auto overflow-x-hidden",
              "w-full h-full"
            )}
          >
            <FormStaffEdit />
          </div>
          <FooterStaffEdit />
        </div>
      </Card>
    </AppContainer>
  );
};
