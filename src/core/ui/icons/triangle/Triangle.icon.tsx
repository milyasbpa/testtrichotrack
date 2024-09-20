import * as React from "react";

export interface TriangleIconProps extends React.HTMLAttributes<SVGElement> {}

export const TriangleIcon = (props: TriangleIconProps) => {
  return (
    <svg
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.18101 10.6667L15.4671 0H8.14077H0.814453L8.18101 10.6667Z"
        {...props}
      />
    </svg>
  );
};
