import clsx from "clsx";

export interface ItemNotFoundCustomerListProps {
  message?: string;
  image_url?: string;
}

export const ItemNotFoundCustomerList = ({
  message = "",
  image_url = "",
}: ItemNotFoundCustomerListProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-[2rem]",
        "w-full h-full"
      )}
    >
      <img src={image_url} />
      <p
        className={clsx("text-[1.25rem] font-normal text-white-60 text-center")}
      >
        {message}
      </p>
    </div>
  );
};
