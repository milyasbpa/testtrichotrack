import { useForm, FormProvider } from "react-hook-form";
import { CustomerScanGlobalContainer } from "../container";
import { getReactHookFormDefaultValues } from "../react_hook_form/data";

export const CustomerScanGlobalPage = () => {
  const methods = useForm({
    defaultValues: getReactHookFormDefaultValues(),
  });

  return (
    <FormProvider {...methods}>
      <CustomerScanGlobalContainer />
    </FormProvider>
  );
};
