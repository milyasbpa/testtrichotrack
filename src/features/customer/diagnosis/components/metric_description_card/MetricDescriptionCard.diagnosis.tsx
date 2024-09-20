import clsx from "clsx";

export interface MetricDescriptionCardCustomerDiagnosisProps {
  name?: string;
  description?: string;
  cta?: {
    primary: {
      children: React.ReactNode;
      onClick: () => void;
    };
  };
}

export const MetricDescriptionCardCustomerDiagnosis = ({
  name = "",
  description = "",
  cta = {
    primary: {
      children: "",
      onClick: () => {},
    },
  },
}: MetricDescriptionCardCustomerDiagnosisProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col justify-between gap-[1.5rem]",
        "bg-charleston-green",
        "rounded-[0.5rem]",
        "px-[1rem] py-[1rem]",
        "w-full h-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-y-[0.75rem]",
          "w-[316px] h-full"
        )}
      >
        <p className={clsx("text-[1.25rem] text-white font-bold text-left")}>
          {name}
        </p>
        <p
          dangerouslySetInnerHTML={{
            __html: description,
          }}
          className={clsx("text-[1rem] text-white-80 font-regular text-left")}
        />
      </div>

      <button
        className={clsx(
          "rounded-[0.5rem]",
          "bg-dartmouth-green",
          "px-[0.75rem] py-[0.5rem]",
          "flex items-center justify-center",
          "w-full"
        )}
        onClick={cta.primary.onClick}
      >
        <p className={clsx("text-[1rem] text-white font-bold")}>
          {cta.primary.children}
        </p>
      </button>
    </div>
  );
};
