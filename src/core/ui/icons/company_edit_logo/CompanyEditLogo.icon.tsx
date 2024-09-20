import * as React from "react";

export interface CompanyEditLogoIconProps
  extends React.HTMLAttributes<SVGElement> {}

export const CompanyEditLogoIcon = (props: CompanyEditLogoIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 50 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        d="M10.417 38.1665V40.0832H12.3337L31.2087 21.2082L29.292 19.2915L10.417 38.1665Z"
        {...props}
      />
      <path
        d="M43.1458 15.1667C43.9583 14.3542 43.9583 13.0417 43.1458 12.2292L38.2708 7.35417C37.8542 6.9375 37.3333 6.75 36.7917 6.75C36.25 6.75 35.7292 6.95833 35.3333 7.35417L31.5208 11.1667L39.3333 18.9792L43.1458 15.1667ZM6.25 36.4375V44.25H14.0625L37.1042 21.2083L29.2917 13.3958L6.25 36.4375ZM12.3333 40.0833H10.4167V38.1667L29.2917 19.2917L31.2083 21.2083L12.3333 40.0833Z"
        {...props}
      />
    </svg>
  );
};
