import clsx from "clsx";
import { Link } from "react-router-dom";
import SVGIcon from "src/core/ui/icons";

export interface MenuCompanyBillingProps {
  icon?: string;
  name?: string;
  link?: string;
}

export const MenuCompanyBilling = ({
  icon = "",
  name = "",
  link = "",
}: MenuCompanyBillingProps) => {
  return (
    <Link
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[0.5rem]",
        "w-full",
        "rounded-[1rem]",
        "bg-[#252525]",
        "px-[1rem] py-[1rem]"
      )}
      to={link}
    >
      <SVGIcon
        name={icon as any}
        className={clsx("w-[50px] h-[50px]", "fill-[white]")}
      />
      <p className={clsx("text-white-87 text-[1rem] font-semibold")}>{name}</p>
    </Link>
  );
};
