import { useForm, FormProvider } from "react-hook-form";
import { AllScanImageInvalidContainer } from "../container";

export const AllScanImageInvalidPage = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <AllScanImageInvalidContainer />
    </FormProvider>
  );
};
