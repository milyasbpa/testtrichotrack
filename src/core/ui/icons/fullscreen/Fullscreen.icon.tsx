import * as React from "react";

export interface FullscreenIconProps extends React.HTMLAttributes<SVGElement> {}

export const FullscreenIcon = (props: FullscreenIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.66634 9.3335H3.33301V12.6668H6.66634V11.3335H4.66634V9.3335ZM3.33301 6.66683H4.66634V4.66683H6.66634V3.3335H3.33301V6.66683ZM11.333 11.3335H9.33301V12.6668H12.6663V9.3335H11.333V11.3335ZM9.33301 3.3335V4.66683H11.333V6.66683H12.6663V3.3335H9.33301Z"
        {...props}
      />
    </svg>
  );
};
