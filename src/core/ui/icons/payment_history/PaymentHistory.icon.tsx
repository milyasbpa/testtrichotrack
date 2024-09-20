import * as React from "react";

export interface PaymentHistoryIconProps
  extends React.HTMLAttributes<SVGElement> {}

export const PaymentHistoryIcon = (props: PaymentHistoryIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity="0.3" cx="27" cy="25" r="17" fill="white" />
      <path
        d="M27.084 6.25C16.7298 6.25 8.33398 14.6458 8.33398 25H2.08398L10.1882 33.1042L10.334 33.3958L18.7507 25H12.5007C12.5007 16.9375 19.0215 10.4167 27.084 10.4167C35.1465 10.4167 41.6673 16.9375 41.6673 25C41.6673 33.0625 35.1465 39.5833 27.084 39.5833C23.0632 39.5833 19.4173 37.9375 16.7923 35.2917L13.834 38.25C17.2298 41.6458 21.8965 43.75 27.084 43.75C37.4381 43.75 45.834 35.3542 45.834 25C45.834 14.6458 37.4381 6.25 27.084 6.25ZM25.0007 16.6667V27.0833L33.8548 32.3333L35.459 29.6667L28.1257 25.3125V16.6667H25.0007Z"
        {...props}
      />
    </svg>
  );
};
