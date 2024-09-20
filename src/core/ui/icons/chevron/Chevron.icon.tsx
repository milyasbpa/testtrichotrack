import * as React from "react";

export interface ChevronIconProps extends React.HTMLAttributes<SVGElement> {}

export const ChevronIcon = (props: ChevronIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.47 2.86328L4 4.38996L5.53 2.86328L6 3.33328L4 5.33328L2 3.33328L2.47 2.86328Z"
        {...props}
      />
    </svg>
  );
};
