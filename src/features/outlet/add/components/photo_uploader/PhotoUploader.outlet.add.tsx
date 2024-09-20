import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { PhotoEditorModalOutletAdd } from "../photo_editor_modal/PhotoEditorModal.outlet.add";
import SVGIcon from "src/core/ui/icons";

export interface PhotoUploaderOutletAddProps {
  photo?: string;
  label?: string;
  placeholder?: string;
  cta?: {
    primary: {
      children: React.ReactNode;
    };
  };
  editor?: {
    title: string;
    cta: {
      primary: {
        children: React.ReactNode;
      };
      secondary: {
        children: React.ReactNode;
      };
    };
  } | null;
  onUpload?: (datas: string) => void;
}

const convertBase64: (file: File) => Promise<string> = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(String(fileReader.result));
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const PhotoUploaderOutletAdd = ({
  photo = "",
  label = "",
  placeholder = "",
  cta = {
    primary: {
      children: "",
    },
  },
  editor = null,
  onUpload = () => {},
}: PhotoUploaderOutletAddProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photoProfile, setPhotoProfile] = useState("");
  const [croppedPhotoProfile, setCroppedPhotoProfile] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef?.current?.click();
  };

  const handleChangeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.currentTarget.files !== null && e.currentTarget.files.length > 0) {
      const result = await convertBase64(e.currentTarget.files[0]);
      setPhotoProfile(result);
      setOpen(true);
      e.preventDefault();
    }
    e.target.value = "";
  };

  const handleCloseCropProfilePhoto = () => {
    setOpen(false);
  };
  const handleCancelCropProfilePhoto = () => {
    setOpen(false);
  };
  const handleSaveCropProfilePhoto = (data: string) => {
    setCroppedPhotoProfile(data);
    onUpload(data);
    setOpen(false);
  };

  useEffect(() => {
    if (photo.length > 0) {
      setCroppedPhotoProfile(photo);
    }
  }, [photo]);
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-center justify-items-center w-full gap-x-[0.5rem]"
      )}
    >
      <div
        className={clsx(
          "grid items-start content-start justify-center justify-items-center w-[200px]"
        )}
      >
        <p className={clsx("text-[1rem] text-white-80 font-bold text-center")}>
          {label}
        </p>

        <div
          className={clsx(
            "flex items-center justify-center w-[200px] h-[200px] bg-raisin-black"
          )}
        >
          {croppedPhotoProfile.length > 0 ? (
            <img className={clsx("w-full h-full")} src={croppedPhotoProfile} />
          ) : (
            <SVGIcon name="Image" className={clsx("w-[100px] h-[100px]")} />
          )}
        </div>

        <p
          className={clsx(
            "text-[0.75rem] text-white-60 font-normal text-center"
          )}
        >
          {placeholder}
        </p>
        <button
          className={clsx(
            "flex items-center justify-center w-full",
            "px-[1rem] py-[0.75rem]",
            "rounded-[0.5rem]",
            "border border-philippine-green",
            "text-[1rem] text-philippine-green font-bold uppercase text-center"
          )}
          onClick={handleClick}
        >
          {cta.primary.children}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        id="`inputFile`"
        className={clsx("sr-only")}
        multiple={false}
        accept={"image/jpeg image/png"}
        onChange={handleChangeUpload}
      />

      {!!editor && (
        <PhotoEditorModalOutletAdd
          title={editor.title}
          cta={{
            secondary: {
              children: editor.cta.secondary.children,
              onClick: handleCancelCropProfilePhoto,
            },
            primary: {
              children: editor.cta.primary.children,
              onClick: handleSaveCropProfilePhoto,
            },
          }}
          photo={photoProfile}
          open={open}
          onClose={handleCloseCropProfilePhoto}
        />
      )}
    </div>
  );
};
