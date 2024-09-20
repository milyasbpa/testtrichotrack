import * as React from "react";

export interface TrashIconProps extends React.HTMLAttributes<SVGElement> {}

export const TrashIcon = (props: TrashIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        d="M2.66797 3H5.33464V6.33333H2.66797V3Z"
        {...props}
      />
      <path
        d="M5.16797 1.33333L4.83464 1H3.16797L2.83464 1.33333H1.66797V2H6.33464V1.33333H5.16797ZM2.0013 6.33333C2.0013 6.7 2.3013 7 2.66797 7H5.33464C5.7013 7 6.0013 6.7 6.0013 6.33333V2.33333H2.0013V6.33333ZM2.66797 3H5.33464V6.33333H2.66797V3Z"
        {...props}
      />
    </svg>
  );
};
