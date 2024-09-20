import * as React from "react";

export interface ReportIconProps extends React.HTMLAttributes<SVGElement> {}

export const ReportIcon = (props: ReportIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        d="M27.1663 8H5.83301L16.4997 14.6533L27.1663 8ZM5.83301 10.6667V24H27.1663V10.6667L16.4997 17.3333L5.83301 10.6667Z"
        {...props}
        fillOpacity="0.8"
      />
      <path
        d="M27.167 5.3335H5.83366C4.36699 5.3335 3.16699 6.5335 3.16699 8.00016V24.0002C3.16699 25.4668 4.36699 26.6668 5.83366 26.6668H27.167C28.6337 26.6668 29.8337 25.4668 29.8337 24.0002V8.00016C29.8337 6.5335 28.6337 5.3335 27.167 5.3335ZM27.167 8.00016L16.5003 14.6535L5.83366 8.00016H27.167ZM27.167 24.0002H5.83366V10.6668L16.5003 17.3335L27.167 10.6668V24.0002Z"
        {...props}
        fillOpacity="0.8"
      />
    </svg>
  );
};
