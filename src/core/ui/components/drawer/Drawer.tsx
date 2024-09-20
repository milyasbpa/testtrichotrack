import * as React from "react";
import clsx from "clsx";
import { DialogPanel } from "@headlessui/react";
import { Dialog } from "../dialog/Dialog";

export interface DrawerProps {
  open?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

export const Drawer = ({
  open = false,
  children,
  onClose = () => {},
}: DrawerProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div
        className={clsx(
          "fixed inset-0",
          "flex items-start justify-start",
          "w-screen h-screen"
        )}
      >
        <DialogPanel
          className={clsx(
            "w-full max-w-[456px]",
            "h-screen",
            "bg-eerie-black",
            "p-[2rem]",
            "relative",
            "flex flex-col items-start justify-between"
          )}
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
