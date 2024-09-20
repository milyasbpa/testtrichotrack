import { useForm, FormProvider } from "react-hook-form";
import { PartialInvalidImageScanContainer } from "../container";

export const CustomerScanPartialImageInvalidPage = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <PartialInvalidImageScanContainer />
    </FormProvider>
  );
};
