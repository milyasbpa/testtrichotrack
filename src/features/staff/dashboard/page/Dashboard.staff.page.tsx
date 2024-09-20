import { StaffDashboardContainer } from "../container";
import { DashboardStaffProvider } from "../context";

export const StaffDashboardPage = () => {
  return (
    <DashboardStaffProvider>
      <StaffDashboardContainer />
    </DashboardStaffProvider>
  );
};
