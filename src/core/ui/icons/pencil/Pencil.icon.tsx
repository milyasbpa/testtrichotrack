import * as React from "react";

export interface PencilIconProps extends React.HTMLAttributes<SVGElement> {}

export const PencilIcon = (props: PencilIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 9 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        d="M2.16797 6.02684V6.3335H2.47464L5.49464 3.3135L5.18797 3.00684L2.16797 6.02684Z"
        {...props}
      />
      <path
        d="M7.40333 2.34667C7.53333 2.21667 7.53333 2.00667 7.40333 1.87667L6.62333 1.09667C6.55667 1.03 6.47333 1 6.38667 1C6.3 1 6.21667 1.03333 6.15333 1.09667L5.54333 1.70667L6.79333 2.95667L7.40333 2.34667V2.34667ZM1.5 5.75V7H2.75L6.43667 3.31333L5.18667 2.06333L1.5 5.75ZM2.47333 6.33333H2.16667V6.02667L5.18667 3.00667L5.49333 3.31333L2.47333 6.33333Z"
        {...props}
      />
    </svg>
  );
};
