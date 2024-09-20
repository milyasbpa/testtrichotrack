import React, { useRef, useState } from "react";
import clsx from "clsx";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  scrollable?: boolean;
}

export const Tabs = ({
  variant = "primary",
  children,
  className,
  scrollable = false,
  ...otherProps
}: TabsProps) => {
  const childCount = React.Children.count(children);

  // NOTES: This state is for dragging tab purpose
  const divRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  if (scrollable) {
    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      const div = divRef.current;
      if (div) {
        setStartX(e.pageX - div.offsetLeft);
        setScrollLeft(div.scrollLeft);
      }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;
      const div = divRef.current;
      if (div) {
        const x = e.pageX - div.offsetLeft;
        const walk = (x - startX) * 2; // Adjust the multiplier for sensitivity
        div.scrollLeft = scrollLeft - walk;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };
    return (
      <div
        {...otherProps}
        ref={divRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={clsx(
          "grid grid-flow-col gap-x-[0.5rem] items-center content-center justify-start justify-items-start",
          "w-full",
          "overflow-auto",
          className
        )}
        style={{ userSelect: "none" }}
      >
        {children}
      </div>
    );
  }
  if (variant === "secondary") {
    return (
      <div
        className={clsx(
          "grid justify-start gap-x-[1.5rem] place-content-center place-items-center",
          "w-full",
          "border-b border-b-charleston-green",
          className
        )}
        style={{
          gridTemplateColumns: `repeat(${childCount},1fr)`,
        }}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      className={clsx(
        "grid",
        "w-full h-[54px] rounded-[100px]",
        "bg-charleston-green",
        "border-[0.125rem] border-charleston-green",
        "box-border",
        className
      )}
      style={{ gridTemplateColumns: `repeat(${childCount},1fr)` }}
      {...otherProps}
    >
      {children}
    </div>
  );
};
