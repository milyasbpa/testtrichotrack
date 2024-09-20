import * as React from "react";

export interface CalendarIconProps extends React.HTMLAttributes<SVGElement> {}

export const CalendarIcon = (props: CalendarIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_5029_77988)">
        <path
          d="M6.66602 1.00065H6.33268V0.333984H5.66602V1.00065H2.33268V0.333984H1.66602V1.00065H1.33268C0.966016 1.00065 0.666016 1.30065 0.666016 1.66732V7.00065C0.666016 7.36732 0.966016 7.66732 1.33268 7.66732H6.66602C7.03268 7.66732 7.33268 7.36732 7.33268 7.00065V1.66732C7.33268 1.30065 7.03268 1.00065 6.66602 1.00065ZM6.66602 1.66732V2.66732H1.33268V1.66732H6.66602ZM1.33268 7.00065V3.33398H6.66602V7.00065H1.33268Z"
          {...props}
        />
        <path
          opacity="0.3"
          d="M1.33398 1.66992H6.66732V2.66659H1.33398V1.66992Z"
          {...props}
        />
      </g>
      <defs>
        <clipPath id="clip0_5029_77988">
          <rect width="8" height="8" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
