import { useForm, FormProvider } from "react-hook-form";
import { SpotlightLimitScanContainer } from "../container";

export const SpotlightLimitScanPage = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <SpotlightLimitScanContainer />
    </FormProvider>
  );
};
