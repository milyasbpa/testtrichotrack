import clsx from "clsx";

export interface SearchNotFoundListProps {
  message?: string;
  image_url?: string;
}

export const SearchNotFoundList = ({
  message = "",
  image_url = "",
}: SearchNotFoundListProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-y-[2rem] py-[116px]"
      )}
    >
      {!!image_url.length && <img src={image_url} />}

      <h3
        className={clsx("text-[1.25rem] font-normal text-white-60 text-center")}
      >
        {message}
      </h3>
    </div>
  );
};
