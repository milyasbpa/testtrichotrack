import { useForm, FormProvider } from "react-hook-form";
import { CustomerScanRoutineContainer } from "../container";
import { getReactHookFormDefaultValues } from "../react_hook_form/data";

export const CustomerScanRoutinePage = () => {
  const methods = useForm({
    defaultValues: getReactHookFormDefaultValues(),
  });

  return (
    <FormProvider {...methods}>
      <CustomerScanRoutineContainer />
    </FormProvider>
  );
};
