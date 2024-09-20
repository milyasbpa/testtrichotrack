import clsx from "clsx";

export interface StepperProps {
  selected: number;
  skip?: number[];
  items?: {
    id: string;
    name: string;
  }[];
}

export const Stepper = ({
  selected = 0,
  skip = [],
  items = [],
}: StepperProps) => {
  return (
    <div
      className={clsx(
        `grid justify-items-start gap-y-[1.5rem]`,
        "w-full",
        "grid-cols-4"
      )}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={clsx(
            "grid grid-cols-1 gap-y-[1.5rem]",
            "pb-[1rem]",
            "w-full",
            "border-b-[0.25rem]",
            index <= selected && !skip.includes(index)
              ? "border-b-go-green"
              : "border-b-white-60"
          )}
        >
          <h3
            className={clsx(
              "text-[1.125rem] text-bold",
              index <= selected ? "text-white-87" : "text-white-57"
            )}
            dangerouslySetInnerHTML={{ __html: item.name }}
          />
        </div>
      ))}
    </div>
  );
};
