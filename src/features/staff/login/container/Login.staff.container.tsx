import clsx from "clsx";

// import { useLoginSetClientCamera } from "../../react_query/hooks/useSetClientCamera.login";
import { AppContainer } from "src/core/modules/app/container";
import { FormLoginStaff } from "../fragments/form";

export const StaffLoginContainer = () => {
  // useLoginSetClientCamera(); 

  return (
    <AppContainer>
      <div
        className={clsx(
          "flex flex-col items-center justify-center",
          "w-full h-full",
          "px-[2rem]",
          "relative"
        )}
      >
        <div
          className={clsx(
            "flex flex-col justify-between",
            "w-full lg:max-w-[920px]",
            "content-start",
            "gap-y-[1.5rem]",
            "p-[1.5rem]",
            "box-border",
            "bg-white-04",
            "rounded-[1.5rem]",
            "overflow-y-scroll",
            "scrollbar-none",
            "relative"
          )}
        >
          <FormLoginStaff />
        </div>
      </div>
    </AppContainer>
  );
};
