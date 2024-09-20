import { StaffListContainer } from "../container";
import { StaffListProvider } from "../contexts/StaffList.context";

export const StaffListPage = () => {
  return (
    <StaffListProvider>
      <StaffListContainer />
    </StaffListProvider>
  );
};
