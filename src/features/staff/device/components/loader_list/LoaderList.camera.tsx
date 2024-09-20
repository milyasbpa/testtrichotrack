import clsx from "clsx";
import { MoonLoader } from "src/core/ui/components/moon_loader";

export interface LoaderListCameraProps {
  message?: string;
}

export const LoaderListCamera = ({ message = "" }: LoaderListCameraProps) => {
  return (
    <div
      className={clsx(
        "rounded-[0.5rem] px-[1.5rem] py-[1rem]",
        "bg-raisin-black",
        "grid grid-flow-col w-full justify-start justify-items-start content-center items-center gap-x-[1rem]"
      )}
    >
      <MoonLoader color={"#017948"} />
      <p className={clsx("text-[1.5rem]", "font-normal text-white")}>
        {message}
      </p>
    </div>
  );
};
