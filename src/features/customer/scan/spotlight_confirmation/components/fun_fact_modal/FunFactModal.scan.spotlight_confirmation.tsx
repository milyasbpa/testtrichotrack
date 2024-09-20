import clsx from "clsx";
import { MoonLoader } from "src/core/ui/components/moon_loader";
import { Modal } from "src/core/ui/components/modal";

export interface FunFactModalSpotlightScanConfirmationProps {
  open?: boolean;
  message?: string;
  description?: string;
  item?: {
    title: string;
    message: string;
  };
}

export const FunFactModalSpotlightScanConfirmation = ({
  open = false,
  message = "",
  description = "",
  item = {
    title: "",
    message: "",
  },
}: FunFactModalSpotlightScanConfirmationProps) => {
  return (
    <Modal className={clsx("!max-w-[500px]")} open={open}>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center gap-y-[38px]",
          "p-[1.5rem]",
          "rounded-[0.5rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center gap-y-[2rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center gap-y-[2rem]"
            )}
          >
            <h3
              className={clsx(
                "text-[2rem] text-white-87 font-bold text-center"
              )}
            >
              {message}
            </h3>

            <MoonLoader size={84} color={"#017948"} />

            <p className={clsx("text-[1.25rem] text-white-60 font-regular")}>
              {description}
            </p>
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center gap-y-[0.5rem]",
              "bg-charleston-green",
              "p-[0.5rem]"
            )}
          >
            <p
              className={clsx(
                "text-[1.25rem] text-white-60 font-bold text-center"
              )}
            >
              {item.title}
            </p>

            <p
              className={clsx(
                "text-[1.25rem] text-white-60 font-regular text-center"
              )}
            >
              {item.message}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
