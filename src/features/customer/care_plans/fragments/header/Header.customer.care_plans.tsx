import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { CustomerCarePlansContext } from "../../context";
import SVGIcon from "src/core/ui/icons";

export const HeaderCustomerCarePlans = () => {
  const navigate = useNavigate();

  const { state } = useContext(CustomerCarePlansContext);
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div
      className={clsx(
        "flex items-center justify-start gap-x-[0.5rem]",
        "w-full"
      )}
    >
      <button onClick={handleBack}>
        <SVGIcon
          name="Arrow"
          className={clsx("w-[1.5rem] h-[1.5rem]", "fill-go-green")}
        />
      </button>
      <h3 className={clsx("text-[1.5rem] text-white font-bold")}>
        {state.careplans.data?.name ?? ""}
      </h3>
    </div>
  );
};
