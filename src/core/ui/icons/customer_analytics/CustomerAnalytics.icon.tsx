import * as React from "react";

export interface CustomerAnalyticsIconProps
  extends React.HTMLAttributes<SVGElement> {}

export const CustomerAnalyticsIcon = (props: CustomerAnalyticsIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        d="M39.5827 10.4167H10.416V39.5834H39.5827V10.4167ZM18.7493 35.4167H14.5827V20.8334H18.7493V35.4167ZM27.0827 35.4167H22.916V14.5834H27.0827V35.4167ZM35.416 35.4167H31.2493V27.0834H35.416V35.4167Z"
        {...props}
      />
      <path
        d="M6.25 10.4167V39.5833C6.25 41.875 8.125 43.75 10.4167 43.75H39.5833C41.875 43.75 43.75 41.875 43.75 39.5833V10.4167C43.75 8.125 41.875 6.25 39.5833 6.25H10.4167C8.125 6.25 6.25 8.125 6.25 10.4167ZM10.4167 10.4167H39.5833V39.5833H10.4167V10.4167ZM14.5833 20.8333H18.75V35.4167H14.5833V20.8333ZM22.9167 14.5833H27.0833V35.4167H22.9167V14.5833ZM31.25 27.0833H35.4167V35.4167H31.25V27.0833Z"
        {...props}
      />
    </svg>
  );
};
