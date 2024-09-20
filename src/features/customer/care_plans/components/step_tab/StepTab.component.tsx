import React, { useState, useRef } from "react";
import clsx from "clsx";
// import useOnMouseUpOutside from "core/utils/hooks/useOnMouseUpOutside";
// import { useCustomerCarePlansTranslator } from "../../hooks/i18/useCustomerCarePlans.translator";

export interface StepTabRecommendationProps {
  count?: number;
  items?:{id:string;name:string}
  onSelect?: (value: number) => void;
}

export const StepTabRecommendation = ({
  count = 6,
  onSelect = () => {},
}: StepTabRecommendationProps) => {
  const [active, setActive] = useState(0);
  // NOTES: drag and drop
  const [xDownStart, setXDownStart] = useState(0);
  const [capture, setCapture] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const stageList = Array.from(
    { length: count },
    (_, i) => `${i + 1}`
  );

  const handleClickTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActive(parseInt(e.currentTarget.value));

    onSelect(parseInt(e.currentTarget.value));
  };

  // NOTES: drag and drop
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current !== null) {
      setXDownStart(e.clientX);
      setCapture(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current !== null && capture) {
      const scrollPosition = e.clientX - xDownStart;

      const debounceConstant = 12;
      ref.current.scrollLeft =
        ref.current.scrollLeft - scrollPosition < 0
          ? 0
          : ref.current.scrollLeft - scrollPosition / debounceConstant;
    }
  };

  const handleMouseUp = () => {
    setCapture(false);
  };

  // useOnMouseUpOutside(ref, () => {
  //   setCapture(false);
  // });

  return (
    <div
      className={clsx("w-full", "overflow-x-auto")}
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className={clsx(
          "flex items-center justify-start gap-x-[0.5rem]",
          "w-full"
        )}
      >
        {stageList.map((item, index) => (
          <button
            key={index}
            className={clsx(
              "flex items-center justify-center",
              "w-full",
              "rounded-[1rem]",
              active === index ? "bg-philippine-green" : "bg-eerie-black",
              "py-[1rem]",
              "min-w-[136px]",
              "text-[1rem]",
              active === index ? "text-white" : "text-white-54",
              active === index ? "font-bold" : "font-regular"
            )}
            value={index}
            onClick={handleClickTab}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
