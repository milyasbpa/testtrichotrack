import * as React from "react";

export interface StoreMallDirectoryIconProps
  extends React.HTMLAttributes<SVGElement> {}

export const StoreMallDirectoryIcon = (props: StoreMallDirectoryIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        d="M5.64004 9L5.04004 12H18.96L18.36 9H5.64004Z"
        {...props}
      />
      <path
        d="M4 7L3 12V14H4V20H14V14H18V20H20V14H21V12L20 7H4ZM12 18H6V14H12V18ZM5.04 12L5.64 9H18.36L18.96 12H5.04ZM4 4H20V6H4V4Z"
        {...props}
      />
    </svg>
  );
};
