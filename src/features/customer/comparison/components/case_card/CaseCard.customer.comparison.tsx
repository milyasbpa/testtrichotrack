import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { ScanCanvasCustomerComparison } from "../scan_canvas/ScanCanvas.customer.comparison";

export interface CaseCardCustomerComparisonProps {
  image?: string;
  degree?: number;
  header?: React.ReactNode;
  children?: React.ReactNode;
  constraint?: "width" | "height";
}

export const CaseCardCustomerComparison = ({
  image = "/images/sample-scan.png",
  degree = 0,
  header,
  children,
  constraint = "height",
}: CaseCardCustomerComparisonProps) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const parentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!parentRef.current) {
      return;
    }

    setHeight(parentRef.current.clientHeight);
    setWidth(parentRef.current.clientWidth);
  }, [parentRef.current?.clientHeight, parentRef.current?.clientWidth]);

  return (
    <div
      ref={parentRef}
      className={clsx(
        "w-full",
        "h-full",
        "rounded-[0.5rem]",
        "flex items-center justify-center",
        "border border-granite-gray",
        "relative",
        "overflow-hidden"
      )}
    >
      <div className={clsx("absolute top-[-1px] z-[1]", "w-full")}>
        {header}
      </div>

      <ScanCanvasCustomerComparison
        width={constraint === "width" ? width : (height * 4) / 3}
        height={constraint === "width" ? (width / 3) * 4 : height}
        deg={degree}
        image_url={image}
      />
      <div className={clsx("absolute bottom-[0px] left-[0px] right-[0px]")}>
        {children}
      </div>
    </div>
  );
};
