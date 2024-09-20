import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import ScanCanvasIssue from "../scan_canvas/ScanCanvas.issue";

export interface IScanEvidenceCardIssueProps {
  region?: string;
  image?: string;
  icon?: string;
  factor?: string;
  rating?: string;
  value?: number;
  onClick?: () => void;
}

export const ScanEvidenceCardIssue = ({
  region = "Left Pariental",
  image = "/images/sample-scan.png",
  icon = "/icons/face_area/face-area-1.icon.svg",
  factor = "Scalp Texture",
  rating = "4.5",
  value = -1,
  onClick = () => {},
}) => {
  const [height, setHeight] = useState(0);
  const parentRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!parentRef.current) {
      return;
    }

    setHeight(parentRef.current.clientHeight);
  }, [parentRef.current?.clientHeight, parentRef.current?.clientWidth]);

  const handleClickScan = (_: React.MouseEvent<HTMLButtonElement>) => {
    onClick();
  };

  return (
    <button
      ref={parentRef}
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center",
        "w-full",
        "border border-granite-gray",
        "rounded-[0.5rem]",
        "min-h-[332px]",
        "relative"
      )}
      value={value}
      onClick={handleClickScan}
    >
      {/* header */}
      <div
        className={clsx(
          "grid grid-cols-[auto_1fr_auto] content-center items-center justify-start justify-items-start gap-x-[1rem]",
          "p-[0.5rem]",
          "box-border",
          "bg-black-60",
          "absolute top-0",
          "z-10"
        )}
        style={{ width: (height / 4) * 3 }}
      >
        <img src={icon} className={clsx("w-[2rem] h-[2rem]")} />

        <h3 className={clsx("text-[0.875rem] text-white-87 font-bold")}>
          {region}
        </h3>
      </div>

      <div
        className={clsx(
          "flex items-center justify-between",
          "p-[0.5rem]",
          "box-border",
          "bg-black-60",
          "absolute bottom-0",
          "z-10"
        )}
        style={{ width: (height / 4) * 3 }}
      >
        <p className={clsx("text-[0.875rem] text-white-87 font-regular")}>
          {factor}
        </p>

        <p className={clsx("text-[0.875rem] text-white-87 font-bold")}>
          {rating}
        </p>
      </div>

      <ScanCanvasIssue
        image={image}
        width={(height * 4) / 3}
        height={height}
        deg={90}
      />
    </button>
  );
};
