import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: "contained" | "outlined" | "text" | "icon" | "menu"; // According to Material UI Convention
  href?: string;
  disabled?: boolean;
}

export const Button = ({
  variant = "contained",
  href,
  disabled = false,
  onClick,
  ...otherProps
}: ButtonProps) => {
  const navigate = useNavigate();
  if (!!href && !!href.length) {
    const goBack = () => {
      navigate(-1);
    };
    return (
      <Link
        {...otherProps}
        onClick={href === "#" ? goBack : onClick}
        to={href}
        className={clsx(
          "outline-none",
          "grid grid-flow-col items-center content-center justify-center justify-items-center gap-[0.5rem]",
          "w-full",
          variant === "contained"
            ? "bg-[#017948] disabled:bg-[#666666]"
            : variant === "outlined"
            ? "bg-transparent disabled:bg-transparent"
            : "bg-transparent disabled:bg-transparent",
          variant === "contained"
            ? "border border-[#017948] disabled:border-[#666666]"
            : variant === "outlined"
            ? "border border-[#017948] disabled:border-[#666666]"
            : "border border-transparent disabled:border-transparent",
          variant !== "text" && variant !== "icon" && "rounded-[0.75rem]",
          variant !== "text" &&
            variant !== "icon" &&
            "px-[0.75rem] py-[0.75rem]",
          variant === "contained"
            ? "text-[white]"
            : variant === "outlined"
            ? "text-[#017948]"
            : variant === "menu"
            ? "text-[#017948]"
            : "text-[white]",
          "text-[1.25rem] font-bold disabled:text-[#999999]",
          otherProps.className
        )}
      />
    );
  }
  return (
    <button
      {...otherProps}
      className={clsx(
        "outline-none",
        variant === "menu"
          ? "grid grid-flow-col justify-start justify-items-start items-center content-center gap-[0.5rem]"
          : "grid grid-flow-col items-center content-center justify-center justify-items-center gap-[0.5rem]",
        "w-full",
        variant === "contained"
          ? "bg-[#017948] disabled:bg-[#666666]"
          : variant === "outlined"
          ? "bg-transparent disabled:bg-transparent"
          : "bg-transparent disabled:bg-transparent",
        variant === "contained"
          ? "border border-[#017948] disabled:border-[#666666]"
          : variant === "outlined"
          ? "border border-[#017948] disabled:border-[#666666]"
          : "border border-transparent disabled:border-transparent",
        "rounded-[0.75rem]",
        variant !== "text" && variant !== "icon" && "px-[0.75rem] py-[0.75rem]",
        variant === "contained"
          ? "text-[white]"
          : variant === "outlined"
          ? "text-[#017948]"
          : variant === "menu"
          ? "text-[#017948]"
          : "text-[white]",
        " text-[1.25rem] font-bold disabled:text-[#999999]",
        otherProps.className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {otherProps.children}
    </button>
  );
};
