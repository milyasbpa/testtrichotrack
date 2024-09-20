import { useForm, FormProvider } from "react-hook-form";
import { CustomerScanRoutinePreviewContainer } from "../container/RoutinePreview.customer.scan.container";

export const CustomerScanRoutinePreviewPage = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <CustomerScanRoutinePreviewContainer />
    </FormProvider>
  );
};
