import * as React from "react";

export interface ExclamationEmptyCircleIconProps
  extends React.HTMLAttributes<SVGElement> {}

export const ExclamationEmptyCircleIcon = (
  props: ExclamationEmptyCircleIconProps
) => {
  return (
    <svg
      {...props}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3.99989" cy="3.99965" r="3.36" {...props} />
      <path
        d="M5.83489 2.16818C5.72131 2.05459 5.53783 2.05459 5.42424 2.16818L4.00008 3.58943L2.57591 2.16527C2.46233 2.05168 2.27885 2.05168 2.16527 2.16527C2.05168 2.27885 2.05168 2.46233 2.16527 2.57591L3.58943 4.00008L2.16527 5.42424C2.05168 5.53783 2.05168 5.72131 2.16527 5.83489C2.27885 5.94847 2.46233 5.94847 2.57591 5.83489L4.00008 4.41073L5.42424 5.83489C5.53783 5.94847 5.72131 5.94847 5.83489 5.83489C5.94847 5.72131 5.94847 5.53783 5.83489 5.42424L4.41073 4.00008L5.83489 2.57591C5.94556 2.46524 5.94556 2.27885 5.83489 2.16818V2.16818Z"
        fill="#1B1B1B"
      />
    </svg>
  );
};
