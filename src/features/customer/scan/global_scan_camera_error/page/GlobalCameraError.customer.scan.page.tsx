import { useForm, FormProvider } from "react-hook-form";
import { CustomerScanGlobalCameraErrorContainer } from "../container/GlobalCameraError.customer.scan.container";

export const CustomerScanGlobalCameraErrorPage = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <CustomerScanGlobalCameraErrorContainer />
    </FormProvider>
  );
};
