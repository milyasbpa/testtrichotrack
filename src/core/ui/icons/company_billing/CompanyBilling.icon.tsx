import * as React from "react";

export interface CompanyBillingIconProps
  extends React.HTMLAttributes<SVGElement> {}

export const CompanyBillingIcon = (props: CompanyBillingIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        d="M8.33398 25H41.6673V37.5H8.33398V25ZM8.33398 12.5H41.6673V16.6667H8.33398V12.5Z"
        {...props}
      />
      <path
        d="M41.666 8.33203H8.33268C6.02018 8.33203 4.18685 10.1862 4.18685 12.4987L4.16602 37.4987C4.16602 39.8112 6.02018 41.6654 8.33268 41.6654H41.666C43.9785 41.6654 45.8327 39.8112 45.8327 37.4987V12.4987C45.8327 10.1862 43.9785 8.33203 41.666 8.33203ZM41.666 37.4987H8.33268V24.9987H41.666V37.4987ZM41.666 16.6654H8.33268V12.4987H41.666V16.6654Z"
        {...props}
      />
    </svg>
  );
};
