import { StaffLoginContainer } from "../container";
import { StaffLoginProvider } from "../context/StaffLogin.context";

export const StaffLoginPage = () => {
  return (
    <StaffLoginProvider>
      <StaffLoginContainer />
    </StaffLoginProvider>
  );
};
