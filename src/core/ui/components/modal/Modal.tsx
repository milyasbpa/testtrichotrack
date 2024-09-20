import React from "react";
import clsx from "clsx";
import { DialogPanel } from "@headlessui/react";
import { Dialog } from "../dialog/Dialog";

export interface ModalProps {
  open?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export const Modal = ({
  open = false,
  children,
  className,
  onClose = () => {},
}: ModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div
        className={clsx(
          "fixed inset-0",
          "flex items-center justify-center",
          "w-screen"
        )}
      >
        <DialogPanel
          className={clsx(
            "w-full max-w-[636px]",
            "bg-[#1B1B1B]",
            "rounded-[0.5rem]",
            "relative",
            className
          )}
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
