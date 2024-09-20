import { useForm, FormProvider } from "react-hook-form";
import { ScalpScanErrorContainer } from "../container/ErrorScan";

export const CustomerScanErrorPage = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <ScalpScanErrorContainer />
    </FormProvider>
  );
};
