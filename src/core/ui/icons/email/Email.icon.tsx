import * as React from "react";

export interface EmailIconProps extends React.HTMLAttributes<SVGElement> {}

export const EmailIcon = (props: EmailIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        d="M16.6663 6.66667L9.99967 10.8333L3.33301 6.66667V15H16.6663V6.66667ZM16.6663 5H3.33301L9.99967 9.15833L16.6663 5Z"
        {...props}
      />
      <path
        d="M3.33366 16.6666H16.667C17.5837 16.6666 18.3337 15.9166 18.3337 14.9999V4.99992C18.3337 4.08325 17.5837 3.33325 16.667 3.33325H3.33366C2.41699 3.33325 1.66699 4.08325 1.66699 4.99992V14.9999C1.66699 15.9166 2.41699 16.6666 3.33366 16.6666ZM16.667 4.99992L10.0003 9.15825L3.33366 4.99992H16.667ZM3.33366 6.66659L10.0003 10.8333L16.667 6.66659V14.9999H3.33366V6.66659Z"
        {...props}
      />
    </svg>
  );
};
