import * as React from "react";

export interface CloseIconProps extends React.HTMLAttributes<SVGElement> {}

export const CloseIcon = (props: CloseIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.4173 5.87575L16.1248 4.58325L11.0007 9.70742L5.87648 4.58325L4.58398 5.87575L9.70815 10.9999L4.58398 16.1241L5.87648 17.4166L11.0007 12.2924L16.1248 17.4166L17.4173 16.1241L12.2932 10.9999L17.4173 5.87575Z"
        {...props}
      />
    </svg>
  );
};
