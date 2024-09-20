import * as React from "react";

export interface CheckEmptyCircleIconProps
  extends React.HTMLAttributes<SVGElement> {}

export const CheckEmptyCircleIcon = (props: CheckEmptyCircleIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4140_64127)">
        <path
          d="M4.00008 0.666992C2.16008 0.666992 0.666748 2.16033 0.666748 4.00033C0.666748 5.84033 2.16008 7.33366 4.00008 7.33366C5.84008 7.33366 7.33341 5.84033 7.33341 4.00033C7.33341 2.16033 5.84008 0.666992 4.00008 0.666992ZM3.09675 5.43033L1.90008 4.23366C1.77008 4.10366 1.77008 3.89366 1.90008 3.76366C2.03008 3.63366 2.24008 3.63366 2.37008 3.76366L3.33341 4.72366L5.62675 2.43033C5.75675 2.30033 5.96675 2.30033 6.09675 2.43033C6.22675 2.56033 6.22675 2.77033 6.09675 2.90033L3.56675 5.43033C3.44008 5.56033 3.22675 5.56033 3.09675 5.43033Z"
          {...props}
        />
      </g>
      <defs>
        <clipPath id="clip0_4140_64127">
          <rect width="8" height="8" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
