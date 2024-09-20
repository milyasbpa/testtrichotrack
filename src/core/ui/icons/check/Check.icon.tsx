import * as React from "react";

export interface CheckIconProps extends React.HTMLAttributes<SVGElement> {}

export const CheckIcon = (props: CheckIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.00005 5.38994L1.84338 4.23327C1.71338 4.10327 1.50338 4.10327 1.37338 4.23327C1.24338 4.36327 1.24338 4.57327 1.37338 4.70327L2.76671 6.09661C2.89671 6.22661 3.10671 6.22661 3.23671 6.09661L6.76338 2.56994C6.89338 2.43994 6.89338 2.22994 6.76338 2.09994C6.63338 1.96994 6.42338 1.96994 6.29338 2.09994L3.00005 5.38994Z"
        {...props}
      />
    </svg>
  );
};
