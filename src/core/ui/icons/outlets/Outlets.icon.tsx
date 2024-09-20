import * as React from "react";

export interface OutletsIconProps extends React.HTMLAttributes<SVGElement> {}

export const OutletsIcon = (props: OutletsIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        d="M11.75 18.75L10.5 25H39.5L38.25 18.75H11.75Z"
        {...props}
      />
      <path
        d="M8.33333 8.33334H41.6667V12.5H8.33333V8.33334ZM41.6667 14.5833H8.33333L6.25 25V29.1667H8.33333V41.6667H29.1667V29.1667H37.5V41.6667H41.6667V29.1667H43.75V25L41.6667 14.5833ZM25 37.5H12.5V29.1667H25V37.5ZM10.5 25L11.75 18.75H38.25L39.5 25H10.5Z"
        {...props}
      />
    </svg>
  );
};
