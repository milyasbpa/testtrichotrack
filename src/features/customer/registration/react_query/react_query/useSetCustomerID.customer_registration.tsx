import { useMutation } from "@tanstack/react-query";
import { CustomerIDStorageInterface } from "src/core/models/storage/app";
import { setCustomerID } from "src/core/storage/app";
import { CustomerRegistrationReactQueryKey } from "../keys";

export const useLoginSetCustomerID = () => {
  const mutation = useMutation({
    mutationKey: CustomerRegistrationReactQueryKey.SetCustomerID(),
    mutationFn: (data: CustomerIDStorageInterface) => {
      return setCustomerID(data);
    },
    onSuccess(data) {
      if (data !== null) {
        // dispatchHomeMenu({
        //   type: HomeMenuActionEnum.SetAlertValue,
        //   payload: {
        //     open: true,
        //     variant: "success",
        //     message: "Account successfully created",
        //     description: "All the required information has been collected",
        //   },
        // });
        // navigate(getCustomerHomeUrl(locale));
      }
    },
  });

  return mutation;
};
