import { DialogTitle } from "@headlessui/react";
import clsx from "clsx";
import { Modal, ModalProps } from "src/core/ui/components/modal";
import SVGIcon from "src/core/ui/icons";

export interface ConfirmationModalProps extends ModalProps {
  message?: string;
  description?: string;
  image_url?: string;
  cta?: {
    primary: {
      children: React.ReactNode;
      onClick?: () => void;
    };
    secondary: {
      children: React.ReactNode;
      onClick?: () => void;
    };
  };
}

export const ConfirmationModal = ({
  open = false,
  message = "",
  description = "",
  image_url = "",
  cta = {
    primary: {
      children: "",
      onClick: () => {},
    },
    secondary: {
      children: "",
      onClick: () => {},
    },
  },
  onClose = () => {},
}: ConfirmationModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <button onClick={onClose}>
        <SVGIcon
          name="Close"
          className={clsx(
            "absolute top-[38px] right-[2rem]",
            "w-[2rem] h-[2rem]",
            "fill-white"
          )}
        />
      </button>

      {/* content */}
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1.5rem]",
          "w-full",
          "px-[2rem]"
        )}
      >
        <div className={clsx("flex items-center justify-center", "w-full")}>
          <div className={clsx("w-full max-w-[360px]")}>
            <DialogTitle
              as="h3"
              className={clsx(
                "text-[2rem] font-bold text-white-87 text-center"
              )}
            >
              {message}
            </DialogTitle>
          </div>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[2rem] place-content-center place-items-center w-full"
          )}
        >
          <p className={clsx("text-[1.25rem] font-regular text-white-60")}>
            {description}
          </p>

          {!!image_url.length && (
            <img src={image_url} className={clsx("w-[160px] h-[160px]")} />
          )}
        </div>
      </div>

      <div
        className={clsx(
          "grid grid-cols-2 gap-x-[1.5rem] place-content-start place-items-start w-full",
          "py-[2rem] px-[2rem]"
        )}
      >
        <button
          type="button"
          className={clsx(
            "inline-flex w-full justify-center border border-philippine-green rounded-[0.75rem] bg-transparent px-[1rem] py-[1rem]",
            "text-sm font-bold text-dartmouth-green uppercase"
          )}
          onClick={cta.secondary.onClick}
        >
          {cta.secondary.children}
        </button>
        <button
          type="button"
          className={clsx(
            "inline-flex w-full justify-center border border-philippine-green rounded-[0.75rem] bg-dartmouth-green px-[1rem] py-[1rem]",
            "text-sm font-bold text-white uppercase"
          )}
          onClick={cta.primary.onClick}
        >
          {cta.primary.children}
        </button>
      </div>
    </Modal>
  );
};
