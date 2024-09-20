import { Dialog as BaseDialog, DialogBackdrop } from "@headlessui/react";
import clsx from "clsx";

export interface DialogProps {
  open?: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}

export const Dialog = ({
  open = false,
  children,
  onClose = () => {},
}: DialogProps) => {
  return (
    <BaseDialog open={open} onClose={onClose} className={clsx("relative z-50")}>
      <DialogBackdrop className={clsx("fixed inset-0 bg-black-50")} />
      {children}
    </BaseDialog>
  );
};
