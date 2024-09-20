import * as React from "react";
import clsx from "clsx";

export interface OutletPictureListProps {
  children?: React.ReactNode;
  src: string;
}

export const OutletPictureList = ({
  src = "",
  children,
}: OutletPictureListProps) => {
  if (!src.length) {
    return (
      <div
        className={clsx(
          "grid place-content-center place-items-center",
          "bg-aero-blue",
          "rounded-[0.5rem]",
          "w-full aspect-square",
          "font-bold text-[2rem] text-philippine-green"
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <img
      src={src}
      className={clsx(
        "rounded-[0.5rem] object-cover object-center",
        "w-full aspect-square"
      )}
    />
  );
};
