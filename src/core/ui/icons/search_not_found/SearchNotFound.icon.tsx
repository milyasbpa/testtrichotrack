import * as React from "react";

export interface SearchNotFoundIconProps extends React.HTMLAttributes<SVGElement> {}

export const SearchNotFoundIcon = (props: SearchNotFoundIconProps) => {
  return (
    <svg
      {...props}
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        d="M75 25C47.375 25 25 47.375 25 75C25 102.625 47.375 125 75 125C102.625 125 125 102.625 125 75C125 47.375 102.625 25 75 25ZM81.25 106.25H68.75V93.75H81.25V106.25ZM81.25 81.25H68.75V43.75H81.25V81.25Z"
        {...props}
        // fill="#9A2C14"
      />
      <path
        d="M74.9375 12.5C40.4375 12.5 12.5 40.5 12.5 75C12.5 109.5 40.4375 137.5 74.9375 137.5C109.5 137.5 137.5 109.5 137.5 75C137.5 40.5 109.5 12.5 74.9375 12.5ZM75 125C47.375 125 25 102.625 25 75C25 47.375 47.375 25 75 25C102.625 25 125 47.375 125 75C125 102.625 102.625 125 75 125ZM68.75 93.75H81.25V106.25H68.75V93.75ZM68.75 43.75H81.25V81.25H68.75V43.75Z"
        {...props}
      />
    </svg>
  );
};
