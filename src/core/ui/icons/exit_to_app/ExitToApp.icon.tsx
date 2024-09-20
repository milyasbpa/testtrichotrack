import * as React from "react";

export interface ExitToAppIconProps extends React.HTMLAttributes<SVGElement> {}

export const ExitToAppIcon = (props: ExitToAppIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.24917 14.2908L10.5417 15.5833L15.125 11L10.5417 6.41667L9.24917 7.70917L11.6142 10.0833H2.75V11.9167H11.6142L9.24917 14.2908ZM17.4167 2.75H4.58333C3.56583 2.75 2.75 3.575 2.75 4.58333V8.25H4.58333V4.58333H17.4167V17.4167H4.58333V13.75H2.75V17.4167C2.75 18.425 3.56583 19.25 4.58333 19.25H17.4167C18.425 19.25 19.25 18.425 19.25 17.4167V4.58333C19.25 3.575 18.425 2.75 17.4167 2.75Z"
        {...props}
      />
    </svg>
  );
};
