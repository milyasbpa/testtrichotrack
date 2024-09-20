import * as React from "react";

export interface IMenuOpenIconProps extends React.HTMLAttributes<SVGElement> {}

export const MenuOpenIcon = (props: IMenuOpenIconProps) => {
  return (
    <svg {...props}>
      <path
        d="M3 18H16V16H3V18ZM3 13H13V11H3V13ZM3 6V8H16V6H3ZM21 15.59L17.42 12L21 8.41L19.59 7L14.59 12L19.59 17L21 15.59Z"
        {...props}
      />
    </svg>
  );
};
