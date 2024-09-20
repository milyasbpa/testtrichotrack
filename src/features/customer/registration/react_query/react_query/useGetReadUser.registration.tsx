import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetReadUser200SuccessResponseInterface } from "src/core/models/api/login";
import { CustomerIDStorageInterface } from "src/core/models/storage/app";
import { fetchGetReadUser } from "src/core/services/login";
import { CustomerRegistrationReactQueryKey } from "../keys";
import { useLoginSetCustomerID } from "./useSetCustomerID.customer_registration";

export const useLoginGetReadUser = () => {
  const { mutate: setCustomerID } = useLoginSetCustomerID();
  const mutation = useMutation<
    GetReadUser200SuccessResponseInterface,
    AxiosError
  >({
    mutationKey: CustomerRegistrationReactQueryKey.GetReadUser(),
    mutationFn: () => {
      return fetchGetReadUser();
    },

    onSuccess(data) {
      const payload: CustomerIDStorageInterface = {
        ...data,
      };

      setCustomerID(payload);
    },
  });

  return mutation;
};
