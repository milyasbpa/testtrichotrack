import clsx from "clsx";
import { Avatar } from "src/core/ui/components/avatar";
import SVGIcon from "src/core/ui/icons";

export interface ItemCustomerListProps {
  name?: string;
  registration_time?: string;
  photo?: string;
  initial?: string;
  onClick?: () => void;
}

export const ItemCustomerList = ({
  name = "",
  initial = "",
  registration_time = "",
  photo = "",
  onClick = () => {},
}: ItemCustomerListProps) => {
  return (
    <button
      className={clsx(
        "grid grid-cols-[auto_1fr_auto] items-center content-center gap-[1rem]",
        "w-full",
        "p-[1rem]",
        "cursor-pointer",
        "bg-dark-charcoal",
        "rounded-[0.5rem]"
      )}
      onClick={onClick}
    >
      <Avatar src={photo} size={"md"}>
        {initial}
      </Avatar>

      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[0.5rem] justify-start justify-items-start items-center content-center"
        )}
      >
        <p className={clsx("text-[1.5rem] text-white font-bold text-center")}>
          {name}
        </p>
        <p className={clsx("text-[1rem] text-white font-regular text-center")}>
          {registration_time}
        </p>
      </div>

      <div className={clsx("-rotate-90")}>
        <SVGIcon
          name="Chevron"
          className={clsx("w-[1.5rem] h-[1.5rem]", "fill-[white]")}
        />
      </div>
    </button>
  );
};
