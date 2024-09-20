import * as React from "react";
import clsx from "clsx";
import { Skeleton } from "../skeleton";

export interface AvatarProps {
  children?: React.ReactNode;
  alt?: string;
  src?: string;
  size?: "lg" | "md" | "sm" | "xs";
  isLoading?: boolean;
}

export const Avatar = ({
  children,
  src = "",
  alt = "",
  size = "lg",
  isLoading = false,
}: AvatarProps) => {
  if (isLoading) {
    return (
      <Skeleton
        width={
          size === "lg" ? 190 : size === "md" ? 80 : size === "xs" ? 44 : 74
        }
        height={
          size === "lg" ? 190 : size === "md" ? 80 : size === "xs" ? 44 : 74
        }
        circle
      />
    );
  }
  if (!src.length) {
    return (
      <div
        className={clsx(
          "grid place-content-center place-items-center",
          "bg-aero-blue",
          "rounded-[50%]",
          size === "lg"
            ? "w-[190px] h-[190px]"
            : size === "md"
            ? "w-[80px] h-[80px]"
            : size === "xs"
            ? "w-[44px] h-[44px]"
            : "w-[74px] h-[74px]",
          "font-bold text-philippine-green",
          size === "lg" ? "text-[4rem]" : "text-[2rem]"
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={clsx(
        "rounded-[50%] object-cover object-top",
        "scale-x-[-1]",
        size === "lg"
          ? "w-[190px] h-[190px]"
          : size === "md"
          ? "w-[80px] h-[80px]"
          : size === "xs"
          ? "w-[44px] h-[44px]"
          : "w-[74px] h-[74px]"
      )}
    />
  );
};
