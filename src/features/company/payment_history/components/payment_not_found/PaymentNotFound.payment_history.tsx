import clsx from "clsx";

export interface IPaymentNotFoundPaymentHistoryProps {
  message?: string;
}

export const PaymentNotFoundPaymentHistory = ({
  message = "",
}: IPaymentNotFoundPaymentHistoryProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-[2rem]",
        "py-[116px] px-[0px]"
      )}
    >
      <img src={"/illustrations/search-not-found.illustration.svg"} />
      <p
        className={clsx("text-[1.25rem] font-normal text-white-60 text-center")}
      >
        {message}
      </p>
    </div>
  );
};
