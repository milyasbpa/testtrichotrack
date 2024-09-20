import clsx from "clsx";
import { Markdown } from "src/core/ui/components/markdown";

export interface PreventionIssueProps {
  name?: string;
  description?: string;
}

export const PreventionIssue = ({
  name = "",
  description = "",
}: PreventionIssueProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-y-[0.75rem]",
        "w-full"
      )}
    >
      <h3 className={clsx("text-[1.25rem] text-white font-bold")}>{name}</h3>
      <Markdown markdown={description} />
    </div>
  );
};
