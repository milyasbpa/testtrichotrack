import { useState } from "react";
import clsx from "clsx";
import { TreatmentCardRecommendation } from "../../components/treatment_card/TreatmentCard";
import SVGIcon from "src/core/ui/icons";

export interface OverallAccordionRecommendationProps {
  issueID?: number;
  totalIssue?: number;
  data?: {
    issue: string;
    name: string;
    stages: {
      name: string;
      careplans: {
        id: number;
        name: string;
        description: string;
        photo: string;
      }[];
      homecares: {
        id: number;
        name: string;
        description: string;
        photo: string;
      }[];
      description: string;
    }[];
  };
  onSelectTreatment?: (data: {
    issue: string;
    treatment_id: number;
    treatment_type: string;
  }) => void;
}

export const OverallAccordionRecommendation = ({
  issueID = 0,
  totalIssue = 0,
  data = {
    issue: "",
    name: "",
    stages: [],
  },
  onSelectTreatment,
}: OverallAccordionRecommendationProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const handleClickAccordion = () => {
    setOpen((prev) => !prev);
  };

  const handleSelectItem = (data: {
    issue: string;
    treatment_id: number;
    treatment_type: string;
  }) => {
    if (onSelectTreatment) {
      onSelectTreatment(data);
    }
  };

  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-[auto_1fr] items-center content-center justify-start justify-items-start gap-x-[1rem] w-full"
        )}
      >
        <div
          className={clsx(
            "w-[2rem] h-[2rem]",
            "rounded-[50%]",
            "bg-aero-blue",
            "border-[0.125rem] border-philippine-green"
          )}
        />

        <button
          className={clsx("flex items-center justify-between w-full")}
          onClick={handleClickAccordion}
        >
          <p className={clsx("text-[1.5rem] text-white font-bold")}>
            {data.name}
          </p>

          <div className={clsx(open ? "rotate-180" : "rotate-0")}>
            <SVGIcon
              name="Chevron"
              className={clsx("w-[1.5rem] h-[1.5rem]", "fill-go-green")}
            />
          </div>
        </button>

        {/* content */}
        {!open && issueID !== totalIssue - 1 && (
          <>
            <div
              className={clsx(
                "w-[1px] h-full",
                "mx-[15.5px]",
                "bg-granite-gray"
              )}
            />

            <div className={clsx("w-[1px] h-[2.5rem]", "bg-transparent")} />
          </>
        )}
        {open && (
          <>
            <div
              className={clsx(
                "w-[1px] h-full",
                "mx-[15.5px]",
                "bg-granite-gray"
              )}
            />

            <div className={clsx("w-[1px] h-[2.5rem]", "bg-transparent")} />

            {data.stages.map((stage, stageIndex) => (
              <>
                <div
                  className={clsx(
                    "w-[2rem] h-[2rem]",
                    "rounded-[50%]",
                    "flex items-center justify-center"
                  )}
                >
                  <div
                    className={clsx(
                      "w-[1.5rem] h-[1.5rem]",
                      "rounded-[50%]",
                      "bg-raisin-black",
                      "border-[0.125rem] border-granite-gray"
                    )}
                  />
                </div>

                <p className={clsx("text-[1.25rem] text-white font-normal")}>
                  {stage.name}
                </p>

                <div
                  className={clsx(
                    "w-[1px] h-full",
                    "mx-[15.5px]",

                    issueID === totalIssue - 1 &&
                      stageIndex === data.stages.length - 1
                      ? "bg-white-04"
                      : "bg-granite-gray"
                  )}
                />

                {/* on going maintenance */}
                {stage.description.length > 0 && (
                  <div
                    className={clsx(
                      "bg-dark-charcoal",
                      "rounded-[0.5rem]",
                      "p-[1rem]",
                      "grid grid-cols-1 place-content-start place-items-start gap-y-[0.5rem]",
                      "w-full h-full",
                      "rounded-[0.5rem]"
                    )}
                  >
                    <p className={clsx("text-[1rem] text-white-80 font-bold")}>
                      {stage.description}
                    </p>
                  </div>
                )}

                {/* not on going maintenance */}
                {!stage.description.length && (
                  <div
                    className={clsx(
                      "grid grid-cols-2 place-content-start place-items-start w-full gap-x-[1.5rem]",
                      "py-[1rem]"
                    )}
                  >
                    <div
                      className={clsx(
                        "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1rem]"
                      )}
                    >
                      {stage.careplans.map((item, index) => (
                        <TreatmentCardRecommendation
                          key={index}
                          id={item.id}
                          treatment={"Care Plan"}
                          issue={data.issue}
                          name={item.name}
                          image={item.photo}
                          description={item.description}
                          onClick={handleSelectItem}
                        />
                      ))}
                    </div>

                    {!!stage.homecares.length && (
                      <div
                        className={clsx(
                          "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1rem]"
                        )}
                      >
                        {stage.homecares.map((item, index) => (
                          <TreatmentCardRecommendation
                            key={index}
                            id={item.id}
                            treatment={"Home Care"}
                            issue={data.issue}
                            name={item.name}
                            image={item.photo}
                            description={item.description}
                            onClick={handleSelectItem}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
};
