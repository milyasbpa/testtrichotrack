import { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CustomerScreeningContext } from "../../context";
import { useCustomerScreeningGetScanScreening } from "../../react_query/hooks";
import { FollicleCanvasScreening } from "../../components/follicle_canvas";
import { PimpleCanvasScreening } from "../../components/pimple_canvas";
import { DandruffCanvasScreening } from "../../components/dandruff_canvas";
import { HairCanvasCustomerScreening } from "../../components/hair_canvas";
import { ScanCanvasScreening } from "../../components/scan_canvas/ScanCanvas.screening";
import { useParams } from "react-router-dom";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const DetailAnnotationScreening = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const { isFetching: isFetching } = useCustomerScreeningGetScanScreening();
  const { state } = useContext(CustomerScreeningContext);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const parentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!parentRef.current) {
      return;
    }

    setWidth(parentRef.current.clientWidth);
    setHeight(parentRef.current.clientHeight);
  }, [parentRef.current?.clientHeight, parentRef.current?.clientWidth]);
  if (isFetching || state.scan.id === -1) {
    return null;
  }

  return (
    <div className={clsx("grid grid-cols-1 gap-x-[1.5rem]", "w-full")}>
      <div
        className={clsx(
          "border border-spanish-gray",
          "rounded-[1rem]",
          "flex items-center justify-center",
          "w-full",
          "h-[700px]",
          "relative"
        )}
      >
        <div
          ref={parentRef}
          className={clsx("h-full aspect-[3/4]", "relative")}
        >
          {state.group.selected?.id === "follicle" && (
            <FollicleCanvasScreening
              width={width}
              height={height}
              annotations={state.annotations.follicle.data.map((item) => {
                return {
                  ...item,
                  color:
                    appDictionaries.cases.screening.items
                      .find((screening) => screening.id === "hair_pigmentation")
                      ?.levels.find((level) => level.id === item.pigmentation)
                      ?.color ?? "white",
                };
              })}
            />
          )}

          {state.group.selected?.id === "pimple" && (
            <PimpleCanvasScreening
              width={width}
              height={height}
              annotations={state.annotations.pimple.data.map((item) => {
                return {
                  ...item,
                  label: state.group.selected?.name ?? "",
                };
              })}
            />
          )}

          {state.group.selected?.id === "dandruff" && (
            <DandruffCanvasScreening
              width={width}
              height={height}
              annotations={state.annotations.dandruff.data.map((item) => {
                return {
                  ...item,
                  label: state.group.selected?.name ?? "",
                };
              })}
            />
          )}

          {state.group.selected?.id === "hair" && (
            <HairCanvasCustomerScreening
              annotations={state.annotations.hair.data}
              width={width}
              height={height}
            />
          )}
        </div>

        <ScanCanvasScreening
          image_url={state.scan.image}
          height={height}
          width={(height * 3) / 4}
          deg={90}
        />
      </div>
    </div>
  );
};
