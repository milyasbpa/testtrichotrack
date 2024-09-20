import clsx from "clsx";
import { Link } from "react-router-dom";

export interface TabProps
  extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: "primary" | "secondary";
  selected?: boolean;
  children?: React.ReactNode;
  href?: string;
}

export const Tab = ({
  variant = "primary",
  selected = false,
  children,
  href,
  className,
  ...otherProps
}: TabProps) => {
  if (!!href && !!href.length) {
    return (
      <Link
        to={href}
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center",
          "w-full",
          variant === "secondary" ? "h-[3.125rem]" : "h-[54px]",
          variant === "primary" && "rounded-[100px]",
          variant === "secondary" && "pb-[0.75rem]",
          variant === "primary" && selected && "bg-philippine-green",
          variant === "secondary" && selected
            ? "border-b-[0.25rem] border-b-go-green"
            : variant === "secondary" && !selected
            ? "border-b-[0rem] border-opacity-0"
            : "border-[0px]",
          "box-border",
          "text-[1.125rem]",
          selected ? "font-bold" : "font-regular",
          variant === "secondary" && selected
            ? "text-go-green"
            : variant === "secondary" && !selected
            ? "text-white-57"
            : variant === "primary" && selected
            ? "text-white"
            : "text-white-80",
          "whitespace-nowrap",
          className
        )}
        {...otherProps}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center",
        "w-full",
        variant === "secondary" ? "h-[3.125rem]" : "h-[54px]",
        variant === "primary" && "rounded-[100px]",
        variant === "secondary" && "pb-[0.75rem]",
        variant === "primary" && selected && "bg-philippine-green",
        variant === "secondary" && selected
          ? "border-b-[0.25rem] border-b-go-green"
          : variant === "secondary" && !selected
          ? "border-b-[0rem] border-opacity-0"
          : "border-[0px]",
        "box-border",
        "text-[1.125rem]",
        selected ? "font-bold" : "font-regular",
        variant === "secondary" && selected
          ? "text-go-green"
          : variant === "secondary" && !selected
          ? "text-white-57"
          : variant === "primary" && selected
          ? "text-white"
          : "text-white-80",
        "whitespace-nowrap",
        className
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
};
