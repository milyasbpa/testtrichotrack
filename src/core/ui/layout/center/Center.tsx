import clsx from "clsx";

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Center = ({ children, ...otherProps }: CenterProps) => {
  return (
    <div
      {...otherProps}
      className={clsx(
        "flex flex-col items-center justify-center",
        "w-full h-full"
      )}
    >
      {children}
    </div>
  );
};
