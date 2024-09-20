import { OutletEditContainer } from "../container/Outlet.edit";
import { EditOutletProvider } from "../contexts/EditOutlet.context";

export const OutletEditPage = () => {
  return (
    <EditOutletProvider>
      <OutletEditContainer />
    </EditOutletProvider>
  );
};
