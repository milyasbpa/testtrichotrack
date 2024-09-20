import { useForm, FormProvider } from "react-hook-form";
import { CustomerScanSpotlightConfirmationContainer } from "../container";

export const CustomerScanSpotlightConfirmationPage = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <CustomerScanSpotlightConfirmationContainer />
    </FormProvider>
  );
};
