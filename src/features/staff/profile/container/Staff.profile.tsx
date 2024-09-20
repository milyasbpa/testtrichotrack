import { useContext } from "react";
import clsx from "clsx";
import { StaffHeaderProfile } from "../fragments/header/Header.staff.profile";
import { AdminFormStaffProfile } from "../fragments/admin_form/AdminForm.profile";
import { ManagerFormStaffProfile } from "../fragments/manager_form/ManagerForm.profile";
import { EmployeeFormStaffProfile } from "../fragments/employee_form/EmployeeForm.profile";
import { AppContext } from "src/core/modules/app/context";
import { AppContainer } from "src/core/modules/app/container";
import { Divider } from "src/core/ui/components/divider";
import { FooterStaffProfile } from "../fragments/footer";
import { Card } from "src/core/ui/components/card/Card";
import { ConfirmationStaffProfile } from "../fragments/confirmation";
import { ReloginStaffProfile } from "../fragments/relogin";

export const StaffProfileContainer = () => {
  const { state: appState } = useContext(AppContext);

  const role = appState.auth.role;

  if (role === "ADMIN") {
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
            <StaffHeaderProfile />
            <Divider />
            <div
              className={clsx(
                "flex flex-grow overflow-y-auto overflow-x-hidden",
                "w-full h-full"
              )}
            >
              <AdminFormStaffProfile />
            </div>

            <FooterStaffProfile />
          </div>
        </Card>
        <ConfirmationStaffProfile />
        <ReloginStaffProfile />
      </AppContainer>
    );
  }

  if (role === "MANAGER") {
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
            <StaffHeaderProfile />
            <Divider />
            <div
              className={clsx(
                "flex flex-grow overflow-y-auto overflow-x-hidden",
                "w-full h-full"
              )}
            >
              <ManagerFormStaffProfile />
            </div>

            <FooterStaffProfile />
          </div>
        </Card>
        <ConfirmationStaffProfile />
        <ReloginStaffProfile />
      </AppContainer>
    );
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
          <StaffHeaderProfile />
          <Divider />
          <div
            className={clsx(
              "flex flex-grow overflow-y-auto overflow-x-hidden",
              "w-full h-full"
            )}
          >
            <EmployeeFormStaffProfile />
          </div>
        </div>
      </Card>
      <ConfirmationStaffProfile />
      <ReloginStaffProfile />
    </AppContainer>
  );
};
