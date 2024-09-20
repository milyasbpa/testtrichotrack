import { StaffProfileContainer } from "../container/Staff.profile";
import { StaffProfileProvider } from "../context/Profile.staff.context";

export const StaffProfilePage = () => {
  return (
    <StaffProfileProvider>
      <StaffProfileContainer />
    </StaffProfileProvider>
  );
};
