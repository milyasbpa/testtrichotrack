import clsx from "clsx";

export interface CaseCardHeaderCustomerComparisonProps {
  image_url?: string;
  name?: string;
  description?: string;
}

export const CaseCardHeaderCustomerComparison = ({
  image_url = "",
  name = "",
  description = "",
}: CaseCardHeaderCustomerComparisonProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-[auto_1fr_auto] content-center items-center justify-start justify-items-start gap-x-[1rem]",
        "p-[1rem]",
        "w-full h-[4rem]",
        "rounded-tl-[0.5rem] rounded-tr-[0.5rem]",
        "box-border",
        "bg-charleston-green"
      )}
    >
      <img src={image_url} />

      <h3 className={clsx("text-[1.125rem] text-white-87 font-bold")}>
        {name}
      </h3>
      <p
        className={clsx(
          "text-[0.875rem] text-white-87 font-regular text-right"
        )}
      >
        {description}
      </p>
    </div>
  );
};
