import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { ScanCanvasScreening } from "../scan_canvas/ScanCanvas.screening";

export interface GlobalScanCustomerScreeningProps {
  image?: string;
}

export const GlobalScanCustomerScreening = ({
  image = "/images/sample-scan.png",
}: GlobalScanCustomerScreeningProps) => {
  const [height, setHeight] = useState(0);
  const parentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!parentRef.current) {
      return;
    }

    setHeight(parentRef.current.clientHeight);
  }, [parentRef.current?.clientHeight, parentRef.current?.clientWidth]);

  return (
    <div
      className={clsx(
        "border border-spanish-gray",
        "rounded-[1rem]",
        "flex items-center justify-center",
        "w-full",
        "h-[860px]",
        "relative"
      )}
      ref={parentRef}
    >
      <ScanCanvasScreening
        image_url={image}
        height={height}
        width={(height * 3) / 4}
        deg={0}
      />
    </div>
  );
};
