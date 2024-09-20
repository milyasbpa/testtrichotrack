import clsx from "clsx";

export interface NoRecommendationCardIssueProps {
  message?: string;
  image_url?: string;
}

export const NoRecommendationCardIssue = ({
  message = "",
  image_url = "",
}: NoRecommendationCardIssueProps) => {
  return (
    <div
      className={clsx(
        "bg-charleston-green",
        "rounded-[0.5rem]",
        "grid grid-cols-1 items-start content-start justify-center justify-items-center w-full",
        "gap-y-[2rem]",
        "p-[1rem]"
      )}
    >
      <img src={image_url} width={200} height={200} />
      <p className={clsx("text-[1.25rem] font-semibold text-[white] text-center")}>
        {message}
      </p>
    </div>
  );
};
