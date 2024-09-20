import { DialogTitle } from "@headlessui/react";
import { useRef } from "react";
import clsx from "clsx";
import AvatarEditor from "react-avatar-editor";
import SVGIcon from "src/core/ui/icons";
import { Modal, ModalProps } from "src/core/ui/components/modal";

export interface PhotoEditorModalOutletAdd extends ModalProps {
  title?: string;
  photo?: string;
  cta?: {
    primary: {
      children: React.ReactNode;
      onClick: (data: string) => void;
    };
    secondary: {
      children: React.ReactNode;
      onClick: () => void;
    };
  };
}

export const PhotoEditorModalOutletAdd = ({
  title = "",
  photo = "",
  open = false,
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
}: PhotoEditorModalOutletAdd) => {
  const editor = useRef<any>(null);

  return (
    <Modal open={open} onClose={onClose}>
      <div className={clsx("flex items-center justify-between w-full")}>
        <div />
        <DialogTitle
          as="h3"
          className={clsx("text-[2rem] font-bold text-white-87 text-center")}
        >
          {title}
        </DialogTitle>

        <button onClick={onClose}>
          <SVGIcon
            name="Close"
            className={clsx("w-[2rem] h-[2rem]", "fill-white")}
          />
        </button>
      </div>

      <AvatarEditor
        ref={editor}
        image={String(photo)}
        width={525}
        height={525}
        border={8}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={1.2}
        rotate={0}
      />

      <div
        className={clsx(
          "grid grid-cols-2 gap-x-[1.5rem] place-content-start place-items-start w-full",
          "py-[2rem]"
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
          onClick={() => {
            if (editor.current !== null) {
              const result = editor.current.getImage().toDataURL();

              cta.primary.onClick(result);
            }
          }}
        >
          {cta.primary.children}
        </button>
      </div>
    </Modal>
  );
};
