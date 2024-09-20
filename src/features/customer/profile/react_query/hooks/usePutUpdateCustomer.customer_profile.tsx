import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import {
  PutUpdateCustomer200SuccessResponseInterface,
  PutUpdateCustomerRequestInterface,
} from "src/core/models/api/customer";
import { fetchPutUpdateCustomer } from "src/core/services/customer";
import { AxiosError } from "axios";
import { useCustomerProfilePutUpdateCustomerPhoto } from "./usePutUpdateCustomerPhoto.customer_profile";
import { CustomerProfileReactQueryKey } from "../keys";
import { CustomerProfileContext } from "../../contexts";
import { AppContext } from "src/core/modules/app/context";
import { PrivateRouteURL } from "src/core/utils/router/constants";

// Update Confirmation
export const useCustomerProfilePutUpdateCustomer = () => {
  const navigate = useNavigate();

  const { locale } = useParams();

  const { state: appState } = useContext(AppContext);
  const { state } = useContext(CustomerProfileContext);
  const { mutate: updatePhoto } = useCustomerProfilePutUpdateCustomerPhoto();

  const mutation = useMutation<
    PutUpdateCustomer200SuccessResponseInterface,
    AxiosError
  >({
    mutationKey: CustomerProfileReactQueryKey.PutUpdateCustomer(),
    mutationFn: () => {
      const schema: PutUpdateCustomerRequestInterface = {
        id: appState.user.customer?.id ?? -1,
        name: state.personal_data.fullname.value,
        mobile: `${state.personal_data.phonenumber.value
          .slice(0, 3)
          .replace("+", "")}-${state.personal_data.phonenumber.value}`,
        gender: state.personal_data.gender.value?.id ?? "",
        birthday: moment(state.personal_data.date_of_birth.value).format(
          "YYYY-MM-DD"
        ),
        email: state.personal_data.email.value,
        race: state.personal_data.race.value?.id ?? "",
        extra_info: {
          citizenship: state.personal_data.citizenship.value?.id,
          marital_status: state.personal_data.marital_status.value?.id,
          address: state.personal_data.address.value,
          profession: state.personal_data.profession.value,
          nric: state.personal_data.nric.value,
          receive_promotion: state.personal_data.marketing_promotion.value
            ? "Yes"
            : "No",
        },
      };

      const filterRequiredSchema = Object.fromEntries(
        Object.entries(schema)
          .filter(([k, v]) => v.length >= 0 || k === "id")
          .map((item) => {
            return item[0] === "email" && !item[1].length
              ? [item[0], null]
              : item;
          })
      ) as PutUpdateCustomerRequestInterface;

      const filterExtraInfoSchema =
        schema.extra_info !== undefined
          ? (Object.fromEntries(
              Object.entries(schema.extra_info).filter(
                ([_, v]) => v.length >= 0
              )
            ) as PutUpdateCustomerRequestInterface)
          : {};

      const payload =
        Object.keys(filterExtraInfoSchema).length > 0
          ? ({
              ...filterRequiredSchema,
              extra_info: {
                ...filterExtraInfoSchema,
              },
            } as PutUpdateCustomerRequestInterface)
          : ({ ...filterRequiredSchema } as PutUpdateCustomerRequestInterface);

      return fetchPutUpdateCustomer(payload);
    },
    retry: 0,

    onSuccess() {
      if (!state.global.profile_picture.value.length) {
        navigate(
          PrivateRouteURL.routeToCustomerHomeURL({
            locale: locale,
          })
        );
      } else if (
        !state.global.profile_picture.value.includes("data:image/jpeg;base64,")
      ) {
        navigate(
          PrivateRouteURL.routeToCustomerHomeURL({
            locale: locale,
          })
        );
      } else {
        updatePhoto();
      }
    },
  });

  return mutation;
};
