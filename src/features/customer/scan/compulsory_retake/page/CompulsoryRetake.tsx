import { useForm, FormProvider } from "react-hook-form";
import { CompulsoryScanRetakeContainer } from "../container";

export const CompulsoryScanRetakePage = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <CompulsoryScanRetakeContainer />
    </FormProvider>
  );
};
