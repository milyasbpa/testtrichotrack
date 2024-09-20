import { useForm, FormProvider } from "react-hook-form";
import { SpotlightScanSelectionAreaContainer } from "../container/SpotlightSelectionArea";
import { useSpotlightScanSelectionAreaGetSpotlightScan } from "../react_query/hooks/useGetSpotlightScan.scan.spotlight_selection_area";
import { getReactHookFormDefaultValues } from "../react_hook_form/data";
import { useEffect } from "react";

export const SpotlightScanSelectionAreaPage = () => {
  const { data: spotlightScan, isFetching: isFetchingGetSpotlightScan } =
    useSpotlightScanSelectionAreaGetSpotlightScan();

  const methods = useForm({
    defaultValues: getReactHookFormDefaultValues(),
  });

  useEffect(() => {
    if (!isFetchingGetSpotlightScan) {
      methods.setValue("index", spotlightScan?.index ?? 0);
      methods.setValue("data", spotlightScan?.data ?? []);
    }
  }, [isFetchingGetSpotlightScan]);

  return (
    <FormProvider {...methods}>
      <SpotlightScanSelectionAreaContainer />
    </FormProvider>
  );
};
