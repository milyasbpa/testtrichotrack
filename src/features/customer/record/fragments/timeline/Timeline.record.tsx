import React, { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useIntersectionObserver } from "usehooks-ts";
import { TimelineCardCustomerRecord } from "../../components/timeline_card/TimelineCard.customer.record";
import moment from "moment";
import useOnMouseUpOutside from "src/core/utils/ui/hooks/useOnMouseUpOutside";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";

export const TimelineCustomerRecord = () => {
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);

  // NOTES: drag and drop
  const [xDownStart, setXDownStart] = useState(0);
  const [capture, setCapture] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { ref, isIntersecting } = useIntersectionObserver();
  const cases = appState.cases.data;
  const handleSelectCase = (data: { id: string; name: string }) => {
    dispatchApp({
      type: AppActionEnum.SetCasesData,
      payload: {
        ...appState.cases,
        data: {
          ...appState.cases.data,
          selected: {
            id: data.id,
            svc_time: data.name,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (isIntersecting && !cases.loading) {
      dispatchApp({
        type: AppActionEnum.SetCasesData,
        payload: {
          ...appState.cases,
          data: {
            ...cases,
            page: cases.page + 1,
          },
        },
      });
    }
  }, [isIntersecting, cases.loading]);

  useEffect(() => {
    if (
      timelineRef.current !== null &&
      !!cases.data.length &&
      !cases.loading &&
      !capture
    ) {
      const selected =
        cases.data.findIndex(
          (item) => item.id === (cases.selected?.id ?? "0")
        ) ?? 0;

      const scrollState = selected - cases.page * cases.limit;
      const tabWidth = 194;
      const gap = 24;
      const tabInactivePreview = 2;
      const scrollLeft =
        tabWidth * (scrollState - tabInactivePreview) +
        gap * (scrollState - tabInactivePreview);

      timelineRef.current.scrollLeft = scrollLeft;
    }
  }, [cases.data, cases.loading, capture]);

  useOnMouseUpOutside(timelineRef, () => {
    setCapture(false);
  });

  // if (!cases.selected) {
  //   return <SkeletonTimestampCardCustomerRecord />;
  // }

  // NOTES: drag and drop
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (timelineRef.current !== null) {
      setXDownStart(e.clientX);
      setCapture(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (timelineRef.current !== null && capture) {
      const scrollPosition = e.clientX - xDownStart;

      const debounceConstant = 12;
      timelineRef.current.scrollLeft =
        timelineRef.current.scrollLeft - scrollPosition < 0
          ? 0
          : timelineRef.current.scrollLeft - scrollPosition / debounceConstant;
    }
  };

  const handleMouseUp = () => {
    setCapture(false);
  };

  return (
    <div className={clsx("w-full", "h-[3rem]")}>
      <div
        ref={timelineRef}
        className={clsx(
          !cases.data.length ? "hidden" : "grid",
          cases.data.length > 3 ? "grid-flow-col" : "grid-flow-row",
          "gap-x-[1.5rem]",
          "overflow-x-auto",
          "w-full"
        )}
        style={{
          gridTemplateColumns: !cases.data.length
            ? "1fr"
            : cases.data.length <= 3
            ? `repeat(${cases.data.length},1fr)`
            : "",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          ref={ref}
          className={clsx(
            cases.data.length <= 3
              ? "hidden"
              : cases.loading
              ? "hidden"
              : "block",
            "opacity-0 text-white text-[1rem]"
          )}
        >
          {"Trigger"}
        </div>

        {cases.data
          .map((item) => {
            return {
              id: item.id,
              name: item.svc_time,
            };
          })
          .map((item, index) => {
            const stillUtc = moment.utc(item.name).toDate();
            const result = moment(stillUtc)
              .local()
              .format("DD MMM YYYY, h:mm A");
            return (
              <TimelineCardCustomerRecord
                key={index}
                date={result}
                value={index}
                checked={item.id === cases.selected?.id}
                onClick={() => handleSelectCase(item)}
              />
            );
          })}
      </div>
    </div>
  );
};
