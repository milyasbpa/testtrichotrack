import { StaffEditContainer } from "../container/Edit.staff.container";
import { StaffEditProvider } from "../contexts/Edit.staff.context";

export const StaffEditPage = () => {
  return (
    <StaffEditProvider>
      <StaffEditContainer />
    </StaffEditProvider>
  );
};
