import { useMemo, useRef } from "react";
import clsx from "clsx";
import SVGIcon from "src/core/ui/icons";
import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { Button } from "src/core/ui/components/button";

// TECHDEBT: dictionaries should not be in the component
const getImageSize = (
  imageURL: string,

  callback: {
    (data: { width: number; height: number }): void;
  }
) => {
  let image = new Image();

  image.src = imageURL;
  image.onload = () => {
    callback({
      width: image.width,
      height: image.height,
    });
  };
};

export interface UploadCompanyLogoProps {
  imageURL?: string;
  maxSize?: number;
  onUpload?: (datas: string) => void;
  onErrorMaxFileSize?: () => void;
  onErrorDimension?: () => void;
  onErrorFileType?: () => void;
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

export const UploadCompanyLogo = ({
  imageURL = "",
  maxSize = 2,
  onUpload = (_: string) => {},
  onErrorDimension = () => {},
  onErrorFileType = () => {},
  onErrorMaxFileSize = () => {},
}: UploadCompanyLogoProps) => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const maximumSizePerFile = maxSize * 1048;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef?.current?.click();
  };

  const handleChangeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null && e.currentTarget.files.length > 0) {
      // NOTES: Check Image Size
      //looping to check one by one file size & return error if their is files with limit size
      for (let i = 0; i <= e.currentTarget.files.length - 1; i++) {
        const fsize = e.currentTarget.files.item(i)!.size;
        const file = Math.round(fsize / 1024);
        // Max size of the file 2MB
        if (file >= maximumSizePerFile) {
          onErrorMaxFileSize();
          return;
        }
      }

      // NOTES: Image Type Validation
      const isValid = e.currentTarget.files[0].type.includes("png");

      if (!isValid) {
        onErrorFileType();
        return;
      }

      const base64 = await convertBase64(e.currentTarget.files[0]);
      await getImageSize(base64, (data: { width: number; height: number }) => {
        if (data.width > 5 * data.height || data.width < 1 * data.height) {
          onErrorDimension();
          return;
        } else {
          onUpload(base64);
        }
      });

      e.preventDefault();
    }

    e.target.value = "";
  };

  const requirement = useMemo(() => {
    return [
      {
        id: 0,
        name: dictionaries.logo_uploader.requirement.list["1"],
      },
      {
        id: 1,
        name: dictionaries.logo_uploader.requirement.list["2"],
      },
      {
        id: 2,
        name: dictionaries.logo_uploader.requirement.list["3"],
      },
    ];
  }, [
    dictionaries.logo_uploader.requirement.list["1"],
    dictionaries.logo_uploader.requirement.list["2"],
    dictionaries.logo_uploader.requirement.list["3"],
  ]);
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-center justify-items-center w-full gap-y-[1rem]",
        "w-full"
      )}
    >
      <button
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center",
          "border border-raisin-black",
          "rounded-[0.5rem]",
          "w-full",
          !imageURL.length && "h-[500px]",
          "p-[0rem]",
          "box-border",
          "relative"
        )}
        onClick={handleClick}
      >
        {imageURL.length > 0 && (
          <img src={imageURL} className={clsx("w-full")} />
        )}
        {!imageURL.length && (
          <SVGIcon name="Picture" className={clsx("w-[100px] h-[100px]")} />
        )}
      </button>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[0.5rem]"
        )}
      >
        <p className={clsx("text-[0.75rem] font-normal text-white-60")}>
          {dictionaries.logo_uploader.requirement.message}
        </p>
        <ol className={clsx("list-disc", "px-[0.75rem]")}>
          {requirement.map((item, index) => (
            <li
              key={index}
              className={clsx(
                "text-[0.75rem] text-white-60 font-normal text-left"
              )}
            >
              {item.name}
            </li>
          ))}
        </ol>
      </div>

      <Button variant="outlined" onClick={handleClick}>
        {dictionaries.actions.browse_image.toUpperCase()}
      </Button>

      <input
        ref={inputRef}
        type="file"
        id="`inputFile`"
        className={clsx("sr-only")}
        multiple={false}
        accept={"image/png"}
        onChange={handleChangeUpload}
      />
    </div>
  );
};
