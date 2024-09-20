import clsx from "clsx";

export interface SearchNotFoundListProps {
  message?: string;
}

export const SearchNotFoundList = ({
  message = "",
}: SearchNotFoundListProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-y-[2rem] py-[116px]"
      )}
    >
      <img src={"/illustrations/search-not-found.illustration.svg"} />

      <h3
        className={clsx("text-[1.25rem] font-normal text-white-60 text-center")}
      >
        {message}
      </h3>
    </div>
  );
};
