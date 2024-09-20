import clsx from "clsx";

export interface DescriptionCardCustomerHomeCareProps {
  name?: string;
  description?: string;
  image?: string;
}

export const DescriptionCardCustomerHomeCare = ({
  name = "",
  description = "",
  image = "",
}: DescriptionCardCustomerHomeCareProps) => {
  return (
    <div
      className={clsx(
        "bg-charleston-green",
        "rounded-[0.5rem]",
        "p-[1rem]",
        "grid grid-cols-1 place-content-start place-items-start gap-y-[1.5rem]",
        "w-full",
        "rounded-[0.5rem]"
      )}
    >
      <img
        src={image}
        className={clsx(
          "object-cover",
          "w-full",
          "rounded-[0.5rem]",
          "aspect-[21/9]"
        )}
      />

      <p className={clsx("text-[1.25rem] text-white font-bold text-left")}>
        {name}
      </p>

      <p className={clsx("text-[1rem] text-white-57 font-regular text-left")}>
        {description}
      </p>
    </div>
  );
};
