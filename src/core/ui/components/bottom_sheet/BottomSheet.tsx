import React from "react";
import clsx from "clsx";
import { CloseIcon } from "../../icons/close";
import { DialogPanel } from "@headlessui/react";
import { Dialog } from "../dialog/Dialog";

export interface BottomSheetProps {
  open?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export const BottomSheet = ({
  open = false,
  children,
  className,
  onClose = () => {},
}: BottomSheetProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div
        className={clsx(
          "fixed inset-0",
          "flex items-end justify-center",
          "w-screen"
        )}
      >
        <DialogPanel
          className={clsx(
            "w-screen",
            "bg-chinese-black",
            "rounded-tr-[1rem] rounded-tl-[1rem]",
            "shadow-bottom-sheet",
            "pt-[1rem] pb-[2rem] pr-[1rem] pl-[1rem]",
            "relative",
            className
          )}
        >
          <div className={clsx("absolute top-[34px] right-[1rem]")}>
            <button onClick={onClose}>
              <CloseIcon
                className={clsx("w-[2rem] h-[2rem]", "fill-[white]")}
              />
            </button>
          </div>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
