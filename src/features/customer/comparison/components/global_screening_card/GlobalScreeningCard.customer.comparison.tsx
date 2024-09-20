import clsx from "clsx";

export interface GlobalScreeningCardCustomerComparisonProps {
  image?: string;
  message?: string;
}

export const GlobalScreeningCardCustomerComparison = ({
  image = "/illustration/global-no-detail.svg",
  message = "Coming Soon: Elevate Your Journey with Our Latest Innovations!",
}: GlobalScreeningCardCustomerComparisonProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-[1.5rem]",
        "w-full h-[304px]"
      )}
    >
      <img src={image} className={clsx("w-[126px] h-[126px]")} />
      <p className={clsx("text-[1rem] text-white font-normal")}>{message}</p>
    </div>
  );
};
