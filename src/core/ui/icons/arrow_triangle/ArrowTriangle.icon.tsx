import * as React from "react";

export interface ArrowTriangleIconProps
  extends React.HTMLAttributes<SVGElement> {}

export const ArrowTriangleIcon = (props: ArrowTriangleIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.0969 2.90351L3.23356 3.76683C3.10356 3.89683 3.10356 4.10683 3.23356 4.23683L4.0969 5.10017C4.3069 5.31017 4.6669 5.16017 4.6669 4.8635V3.13685C4.6669 2.84018 4.3069 2.69351 4.0969 2.90351Z"
        {...props}
      />
    </svg>
  );
};
