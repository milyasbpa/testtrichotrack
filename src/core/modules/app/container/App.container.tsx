import clsx from "clsx";
import { NavigationApp } from "../fragments/navigation/Navigation.app";
import { NotificationApp } from "../fragments/notification";
import {
  useAppGetReadUserStaff,
  useAppGetReadUserCustomer,
  useAppSetClientCamera,
} from "../react_query/hooks";
import { VersionApp } from "../fragments/version";
import { MenuApp } from "../fragments/menu";
import { useAppPlatform } from "../utils/platform/hooks";
import { LanguageApp } from "../fragments/language";
import { useAppLanguage } from "../utils/language/hooks";
import { UserGuideApp } from "../fragments/user_guide";
import { useContext } from "react";
import { AppContext } from "../context";
import { ErrorApp } from "../fragments/error";
import { ReportApp } from "../fragments/report";

export interface AppContainerProps {
  children?: React.ReactNode;
}

export const AppContainer = ({ children }: AppContainerProps) => {
  useAppSetClientCamera();
  useAppPlatform();
  useAppLanguage();

  // NOTES: Need to check API condition when route is changed as Global Validation
  useAppGetReadUserStaff();
  useAppGetReadUserCustomer();

  const { state } = useContext(AppContext);

  if (!!state.error.status) {
    return (
      <div className={clsx("w-full", "min-h-[100vh]")}>
        <NotificationApp />
        <NavigationApp />
        <MenuApp />
        <div className={clsx("w-full h-[100vh]", "pt-[124px]")}>
          <div className={clsx("w-full h-full", "p-[2rem]")}>
            <ErrorApp />
          </div>
        </div>
        <VersionApp />
        <LanguageApp />
        <UserGuideApp />
      </div>
    );
  }

  return (
    <div className={clsx("w-full", "min-h-[100vh]")}>
      <NotificationApp />
      <NavigationApp />
      <MenuApp />
      <div className={clsx("w-full h-[100vh]", "pt-[124px]")}>
        <div className={clsx("w-full h-full", "p-[2rem]")}>{children}</div>
      </div>
      <VersionApp />
      <LanguageApp />
      <UserGuideApp />
      <ReportApp />
    </div>
  );
};
