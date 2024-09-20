import * as React from "react";

export interface WarningIconProps extends React.HTMLAttributes<SVGElement> {}

export const WarningIcon = (props: WarningIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        d="M4.09766 17.4166H17.9027L11.0002 5.49072L4.09766 17.4166ZM11.9168 16.4999H10.0835V14.6666H11.9168V16.4999ZM11.9168 12.8332H10.0835V9.16656H11.9168V12.8332Z"
        {...props}
      />
      <path
        d="M0.916016 19.2499H21.0827L10.9993 1.83325L0.916016 19.2499ZM4.09685 17.4166L10.9993 5.49075L17.9019 17.4166H4.09685ZM10.0827 14.6666H11.916V16.4999H10.0827V14.6666ZM10.0827 9.16658H11.916V12.8333H10.0827V9.16658Z"
        {...props}
      />
    </svg>
  );
};
