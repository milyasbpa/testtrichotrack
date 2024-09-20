import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { PhotoEditorModalStaffProfile } from "../photo_editor_modal";
import { Avatar } from "src/core/ui/components/avatar";

export interface PhotoUploaderStaffProfileProps {
  photo?: string;
  disabled?: boolean;
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

export const PhotoUploaderStaffProfile = ({
  photo = "",
  disabled = false,
  cta = {
    primary: {
      children: "",
    },
  },
  editor = null,
  onUpload = () => {},
}: PhotoUploaderStaffProfileProps) => {
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
      <button
        className={clsx("grid", "p-[0rem]", "box-border", "relative")}
        disabled={disabled}
        onClick={handleClick}
      >
        <Avatar
          src={
            !croppedPhotoProfile.length
              ? `/images/sample-photo.image.svg`
              : croppedPhotoProfile
          }
          size={"lg"}
        />

        {!disabled && (
          <img
            className={clsx(
              "grid place-content-center place-items-center",
              "absolute bottom-[0rem] left-[50%] z-10 translate-x-[-50%]"
            )}
            src={"/images/retake-banner.image.svg"}
          />
        )}

        {!disabled && (
          <div
            className={clsx(
              "grid place-content-center place-items-center",
              "absolute left-[50%] bottom-[0rem] z-30 translate-x-[-50%] translate-y-[-0.5rem]"
            )}
          >
            <p
              className={clsx(
                "text-center text-[0.875rem] text-white font-bold uppercase"
              )}
            >
              {cta.primary.children}
            </p>
          </div>
        )}
      </button>

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
        <PhotoEditorModalStaffProfile
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
