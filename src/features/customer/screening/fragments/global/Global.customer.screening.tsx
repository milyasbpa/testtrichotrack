import { useContext } from "react";
import clsx from "clsx";

import { GlobalScanCustomerScreening } from "../../components/global_scan/GlobalScan.customer.screening";
import { CustomerScreeningContext } from "../../context";

export const GlobalCustomerScreening = () => {
  const { state } = useContext(CustomerScreeningContext);

  return (
    <div className={clsx("grid grid-cols-[1fr] gap-x-[1.5rem]", "w-full")}>
      <GlobalScanCustomerScreening image={state.scan.image} />
    </div>
  );
};
