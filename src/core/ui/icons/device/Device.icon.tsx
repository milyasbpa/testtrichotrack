import * as React from "react";

export interface DeviceIconProps extends React.HTMLAttributes<SVGElement> {}

export const DeviceIcon = (props: DeviceIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.8">
        <path
          opacity="0.3"
          d="M6.66669 6.66686H12V12.0002H6.66669V6.66686ZM20 20.0002H25.3334V25.3335H20V20.0002ZM6.66669 20.0002H12V25.3335H6.66669V20.0002ZM22.2134 6.02686L18.44 9.78686L22.2134 13.5602L25.9867 9.78686L22.2134 6.02686Z"
          {...props}
        />
        <path
          d="M22.2133 2.25342L14.6667 9.78675L22.2133 17.3334L29.76 9.78675L22.2133 2.25342ZM18.44 9.78675L22.2133 6.01342L25.9867 9.78675L22.2133 13.5601L18.44 9.78675ZM4 4.00008V14.6668H14.6667V4.00008H4ZM12 12.0001H6.66667V6.66675H12V12.0001ZM4 28.0001H14.6667V17.3334H4V28.0001ZM6.66667 20.0001H12V25.3334H6.66667V20.0001ZM17.3333 17.3334V28.0001H28V17.3334H17.3333ZM25.3333 25.3334H20V20.0001H25.3333V25.3334Z"
          {...props}
        />
      </g>
    </svg>
  );
};
