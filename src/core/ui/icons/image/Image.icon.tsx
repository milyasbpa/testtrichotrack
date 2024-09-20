import * as React from "react";

export interface ImageIconProps extends React.HTMLAttributes<SVGElement> {}

export const ImageIcon = (props: ImageIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <path
          opacity="0.3"
          d="M1.66602 6.33366H6.33268V1.66699H1.66602V6.33366ZM2.99935 4.38033L3.71268 5.24033L4.71268 3.95033L5.99935 5.66699H1.99935L2.99935 4.38033Z"
          fill="white"
          {...props}
        />
        <path
          d="M6.33333 1H1.66667C1.3 1 1 1.3 1 1.66667V6.33333C1 6.7 1.3 7 1.66667 7H6.33333C6.7 7 7 6.7 7 6.33333V1.66667C7 1.3 6.7 1 6.33333 1ZM6.33333 6.33333H1.66667V1.66667H6.33333V6.33333ZM4.71333 3.95333L3.71333 5.24L3 4.38L2 5.66667H6L4.71333 3.95333Z"
          fill="white"
          {...props}
        />
      </g>
    </svg>
  );
};
