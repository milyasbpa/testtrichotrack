import { useForm, FormProvider } from "react-hook-form";
import { SpotlightAnotherScanConfirmationContainer } from "../container";

export const SpotlightAnotherScanConfirmationPage = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <SpotlightAnotherScanConfirmationContainer />
    </FormProvider>
  );
};
