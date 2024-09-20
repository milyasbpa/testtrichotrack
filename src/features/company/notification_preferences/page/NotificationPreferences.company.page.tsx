import { CompanyNotificationPreferencesContainer } from "../container";
import { ClientNotificationPreferencesProvider } from "../contexts/NotificationPreferences.company.context";

export const CompanyNotificationPreferencesPage = () => {
  return (
    <ClientNotificationPreferencesProvider>
      <CompanyNotificationPreferencesContainer />
    </ClientNotificationPreferencesProvider>
  );
};
