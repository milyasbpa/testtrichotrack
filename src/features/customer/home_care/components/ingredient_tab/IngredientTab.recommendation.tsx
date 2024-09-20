import React, { useState, useRef } from "react";
import clsx from "clsx";
import useOnMouseUpOutside from "src/core/utils/ui/hooks/useOnMouseUpOutside";

export interface IngredientTabCustomerHomeCareProps {
  list?: string[];
  onTab?: (value: number) => void;
}

export const IngredientTabCustomerHomeCare = ({
  list = [],
  onTab = () => {},
}: IngredientTabCustomerHomeCareProps) => {
  const [active, setActive] = useState(0);
  // NOTES: drag and drop
  const [xDownStart, setXDownStart] = useState(0);
  const [capture, setCapture] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActive(parseInt(e.currentTarget.value));

    onTab(parseInt(e.currentTarget.value));
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

  useOnMouseUpOutside(ref, () => {
    setCapture(false);
  });

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
          "w-fit",
          "flex items-center justify-center gap-x-[1.5rem]"
        )}
      >
        {list.map((item, index) => (
          <button
            key={index}
            className={clsx(
              "grid place-content-center place-items-center",
              "w-fit",
              "rounded-[1rem]",
              active === index ? "bg-philippine-green" : "bg-eerie-black",
              "px-[1rem] py-[0.75rem]",
              "min-w-[136px]",
              "flex-nowrap",
              "whitespace-nowrap",
              "text-[1rem]",
              active === index ? "text-white" : "text-white-54",
              active === index ? "font-bold" : "font-regular",
              "text-center"
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
