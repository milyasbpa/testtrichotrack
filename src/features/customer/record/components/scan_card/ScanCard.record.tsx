import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { ScanCanvasRecord } from "../scan_canvas/ScanCanvas.record";
import { Checkbox, CheckboxProps } from "src/core/ui/components/checkbox";

export interface ScanCardRecordProps {
  header?: {
    region: string;

    image_url: string;
    select: boolean;
    cta: {
      primary: {
        children: React.ReactNode;
      };
    };
    checkbox: CheckboxProps;
  };
  id?: number;
  // region?: string;
  // image?: string;
  // icon?: string;
  // checked?: boolean;
  // select?: boolean;
  degree?: number;
  image_url?: string;

  // onZoom?: (value: number) => void;
  // onSelect?: (value: number) => void;
  onClick?: () => void;
}

export const ScanCardRecord = ({
  id = 0,
  // region = "",
  // image = "",
  // icon = "",
  // degree = 90,
  // select = false,
  // checked = false,
  header = {
    region: "",
    select: false,
    image_url: "",
    cta: {
      primary: {
        children: "",
      },
    },
    checkbox: {},
  },
  degree = 90,
  image_url = "",
  onClick = () => {},
}: ScanCardRecordProps) => {
  // const { translateScalpRegionName } = useScalpRegionNameTranslator();
  const ref = useRef<HTMLDivElement | null>(null);
  // const { actions } = useCustomerRecordTranslator();
  const [width, setWidth] = useState(0);

  const parentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!parentRef.current) {
      return;
    }

    setWidth(parentRef.current.clientWidth);
  }, [parentRef.current?.clientHeight, parentRef.current?.clientWidth]);
  // const handleClickPhoto = (e: React.MouseEvent<HTMLDivElement>) => {
  //   onZoom(parseInt(e.currentTarget.id));
  // };

  // const handleSelectScan = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (onSelect) {
  //     onSelect(parseInt(e.currentTarget.id));
  //   }
  // };

  return (
    <div
      className={clsx(
        "grid grid-cols-1",
        "rounded-[1rem]",
        "min-w-[308px]",
        "height-[340px]",
        "w-full",
        "box-border"
      )}
      ref={ref}
    >
      {/* header */}
      <div
        className={clsx(
          "grid grid-cols-[auto_1fr_auto] content-center items-center justify-start justify-items-start gap-x-[1rem]",
          "p-[1rem]",
          "w-full h-[4rem]",
          "rounded-tl-[1rem] rounded-tr-[1rem]",
          "box-border",
          "bg-charleston-green"
        )}
      >
        <img src={header.image_url} />

        <h3 className={clsx("text-[1.125rem] text-white-87 font-bold")}>
          {header.region}
        </h3>
        <div className={clsx("flex items-center justify-end gap-x-[0.5rem]")}>
          <p
            className={clsx(
              "text-[0.875rem] font-regular",
              header.select ? "text-white-87" : "text-granite-gray"
            )}
          >
            {header.cta.primary.children}
          </p>

          <Checkbox {...header.checkbox} />

          {!header.select && (
            <img src={"/icons/indeterminate-checkbox.icon.svg"} />
          )}
        </div>
      </div>

      {/* photo */}

      <div
        ref={parentRef}
        className={clsx(
          "w-full h-[340px]",
          "overflow-hidden",
          "relative",
          "box-border",
          "grid place-content-center place-items-center"
        )}
        id={String(id)}
        onClick={onClick}
      >
        <ScanCanvasRecord
          image_url={image_url}
          width={width}
          height={(width / 3) * 4}
          deg={degree}
        />
      </div>
    </div>
  );
};
