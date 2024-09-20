import clsx from "clsx";
import { Avatar } from "src/core/ui/components/avatar";
export interface ProfileCardAppProps {
  initial?: string;
  name?: string;
  photo?: string;
  date?: string;
}

export default function ProfileCardApp({
  initial = "",
  name = "",
  photo = "",
  date = "",
}: ProfileCardAppProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-start gap-x-[0.5rem]",
        "bg-eerie-black",
        "w-full",
        "rounded-[0.5rem]",
        "p-[1rem]"
      )}
    >
      <Avatar src={photo} size={"xs"}>
        {initial}
      </Avatar>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-y-[0.375rem]"
        )}
      >
        <p className={clsx("text-[1rem] text-white-87 font-semibold")}>
          {name}
        </p>

        <p className={clsx("text-[0.875rem] text-white-87 font-regular")}>
          {date}
        </p>
      </div>
    </div>
  );
}
