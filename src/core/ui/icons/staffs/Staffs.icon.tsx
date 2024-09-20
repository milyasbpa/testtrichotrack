import * as React from "react";

export interface StaffsIconProps extends React.HTMLAttributes<SVGElement> {}

export const StaffsIcon = (props: StaffsIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        d="M41.6663 12.5H8.33301V37.5H41.6663V12.5ZM24.9997 14.5833C27.8747 14.5833 30.208 16.9167 30.208 19.7917C30.208 22.6667 27.8747 25 24.9997 25C22.1247 25 19.7913 22.6667 19.7913 19.7917C19.7913 16.9167 22.1247 14.5833 24.9997 14.5833ZM35.4163 35.4167H14.583V33.3125C14.583 28.9583 21.4788 27.0833 24.9997 27.0833C28.5205 27.0833 35.4163 28.9583 35.4163 33.3125V35.4167Z"
        {...props}
      />
      <path
        d="M8.33366 41.6667H41.667C43.9587 41.6667 45.8337 39.7917 45.8337 37.5V12.5C45.8337 10.2083 43.9587 8.33333 41.667 8.33333H8.33366C6.04199 8.33333 4.16699 10.2083 4.16699 12.5V37.5C4.16699 39.7917 6.04199 41.6667 8.33366 41.6667ZM8.33366 12.5H41.667V37.5H8.33366V12.5ZM8.33366 0H41.667V4.16667H8.33366V0ZM8.33366 45.8333H41.667V50H8.33366V45.8333ZM25.0003 25C27.8753 25 30.2087 22.6667 30.2087 19.7917C30.2087 16.9167 27.8753 14.5833 25.0003 14.5833C22.1253 14.5833 19.792 16.9167 19.792 19.7917C19.792 22.6667 22.1253 25 25.0003 25ZM25.0003 17.7083C26.1462 17.7083 27.0837 18.6458 27.0837 19.7917C27.0837 20.9375 26.1462 21.875 25.0003 21.875C23.8545 21.875 22.917 20.9375 22.917 19.7917C22.917 18.6458 23.8545 17.7083 25.0003 17.7083ZM25.0003 27.0833C21.4795 27.0833 14.5837 28.9583 14.5837 33.3125V35.4167H35.417V33.3125C35.417 28.9583 28.5212 27.0833 25.0003 27.0833ZM18.3545 32.2917C19.6253 31.2083 22.5837 30.2083 25.0003 30.2083C27.4378 30.2083 30.3962 31.2083 31.667 32.2917H18.3545Z"
        {...props}
      />
    </svg>
  );
};
