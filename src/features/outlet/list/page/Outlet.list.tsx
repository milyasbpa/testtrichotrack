import { DisplayListContainer } from "../container";
import { OutletListProvider } from "../contexts/OutletList.context";

export const OutletListPage = () => {
  return (
    <OutletListProvider>
      <DisplayListContainer />
    </OutletListProvider>
  );
};
