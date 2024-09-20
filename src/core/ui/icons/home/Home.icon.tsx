import * as React from "react";

export interface HomeIconProps extends React.HTMLAttributes<SVGElement> {}

export const HomeIcon = (props: HomeIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.0003 4L2.66699 16H6.66699V26.6667H14.667V18.6667H17.3337V26.6667H25.3337V16H29.3337L16.0003 4ZM22.667 24H20.0003V16H12.0003V24H9.33366V13.5867L16.0003 7.58667L22.667 13.5867V24Z"
        {...props}
        fillOpacity="0.8"
      />
      <path
        opacity="0.3"
        d="M9.33301 13.5867V24H11.9997V16H19.9997V24H22.6663V13.5867L15.9997 7.58667L9.33301 13.5867Z"
        {...props}
      />
    </svg>
  );
};
