import { StaffHomeContainer } from "../container";
import { StaffHomeProvider } from "../context";

export const StaffHomePage = () => {
  return (
    <StaffHomeProvider>
      <StaffHomeContainer />
    </StaffHomeProvider>
  );
};
