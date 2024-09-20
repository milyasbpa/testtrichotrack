import clsx from "clsx";

export interface EmptyListCameraProps {
  message?: string;
  image_url?: string;
}

export const EmptyListCamera = ({
  message = "",
  image_url = "",
}: EmptyListCameraProps) => {
  return (
    <div
      className={clsx(
        "rounded-[0.5rem] px-[1.5rem] py-[1rem]",
        "bg-raisin-black",
        "grid grid-flow-col w-full justify-start justify-items-start content-center items-center gap-x-[1rem]"
      )}
    >
      <img src={image_url} className={clsx("w-[2rem] h-[2rem]")} />
      <p className={clsx("text-[1.5rem]", "font-normal text-white")}>
        {message}
      </p>
    </div>
  );
};
