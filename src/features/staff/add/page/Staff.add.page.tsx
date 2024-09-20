import { StaffAddContainer } from "../container";
import { StaffAddProvider } from "../contexts";

export const StaffAddPage = () => {
  return (
    <StaffAddProvider>
      <StaffAddContainer />
    </StaffAddProvider>
  );
};
