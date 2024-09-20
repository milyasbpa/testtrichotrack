import * as React from "react";

export interface PictureIconProps extends React.HTMLAttributes<SVGElement> {}

export const PictureIcon = (props: PictureIconProps) => {
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
          d="M1.66699 6.33341H6.33366V1.66675H1.66699V6.33341ZM3.00033 4.38008L3.71366 5.24008L4.71366 3.95008L6.00033 5.66675H2.00033L3.00033 4.38008Z"
          fill="white"
        />
        <path
          d="M6.33333 1H1.66667C1.3 1 1 1.3 1 1.66667V6.33333C1 6.7 1.3 7 1.66667 7H6.33333C6.7 7 7 6.7 7 6.33333V1.66667C7 1.3 6.7 1 6.33333 1ZM6.33333 6.33333H1.66667V1.66667H6.33333V6.33333ZM4.71333 3.95333L3.71333 5.24L3 4.38L2 5.66667H6L4.71333 3.95333Z"
          fill="white"
        />
      </g>
    </svg>
  );
};
