import { OutletAddContainer } from "../container/Outlet.add.container";
import { OutletAddProvider } from "../contexts/Add.outlet.context";

export const OutletAddPage = () => {
  return (
    <OutletAddProvider>
      <OutletAddContainer />
    </OutletAddProvider>
  );
};
