import { useForm, FormProvider } from "react-hook-form";
import { PartialInvalidScanImageRetakeContainer } from "../container";

export const PartialInvalidScanImageRetakePage = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <PartialInvalidScanImageRetakeContainer />
    </FormProvider>
  );
};
