import { OutletViewContainer } from "../container/View.outlet.container";
import { ViewOutletProvider } from "../context/ViewOutlet.context";

export const OutletViewPage = () => {
  return (
    <ViewOutletProvider>
      <OutletViewContainer />
    </ViewOutletProvider>
  );
};
