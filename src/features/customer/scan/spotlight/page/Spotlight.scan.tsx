import { useForm, FormProvider } from "react-hook-form";
import { SpotlightScanContainer } from "../container";

export const SpotlightScanPage = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <SpotlightScanContainer />
    </FormProvider>
  );
};
