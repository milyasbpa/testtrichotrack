import { useContext, useMemo } from "react";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  PostCreateCustomer200SuccessResponseInterface,
  PostCreateCustomerRequestInterface,
} from "src/core/models/api/customer";
import { fetchPostCreateCustomer } from "src/core/services/customer";
import { AxiosError } from "axios";
import {
  GetQuestionnaireRequestInterface,
  GetQuestionnaireResponseInterface,
} from "src/core/models/api/configuration";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerRegistrationContext } from "../../context";
import { CustomerRegistrationReactQueryKey } from "../keys";
import Cookies from "universal-cookie";
import { PrivateRouteURL } from "src/core/utils/router/constants";
// import { AppActionEnum, AppContext } from "src/core/modules/app/context";

export default function useNewPostCreateCustomer() {
  const navigate = useNavigate();
  // const { state: appState, dispatch: dispatchApp } = useContext(AppContext);
  const { state } = useContext(CustomerRegistrationContext);
  const queryClient = useQueryClient();
  const { locale } = useParams();

  const questionnairePayload: GetQuestionnaireRequestInterface = useMemo(() => {
    return {
      language: locale === "zh" ? "Chinese" : "English",
    };
  }, [locale]);

  const questionnaire = queryClient.getQueryData(
    CustomerRegistrationReactQueryKey.GetQuestionnaire(questionnairePayload)
  ) as GetQuestionnaireResponseInterface;

  const mutation = useMutation<
    PostCreateCustomer200SuccessResponseInterface,
    AxiosError
  >({
    mutationKey: CustomerRegistrationReactQueryKey.PostCreateCustomer(),
    mutationFn: () => {
      const payload: PostCreateCustomerRequestInterface = {
        name: state.required_information.fullname.value,
        mobile: `${state.required_information.phonenumber.value
          .slice(0, 3)
          .replace(
            "+",
            ""
          )}-${state.required_information.phonenumber.value.slice(3)}`,
        gender: state.required_information.gender.value?.id ?? "",
        birthday: moment(state.required_information.date_of_birth.value).format(
          "YYYY-MM-DD"
        ),
        race: state.required_information.race.value?.id ?? "",
        email: !state.additional_information.email.value.length
          ? undefined
          : state.additional_information.email.value,
        photo: !state.global.profile_picture.value.length
          ? undefined
          : state.global.profile_picture.value.replace(
              "data:image/jpeg;base64,",
              ""
            ),
        extra_info:
          !state.additional_information.citizenship.value &&
          !state.additional_information.marital_status.value &&
          !state.additional_information.address.value.length &&
          !state.additional_information.profession.value.length &&
          !state.agreement.questionnaire.answers[2] === undefined
            ? undefined
            : {
                citizenship: !state.additional_information.citizenship.value
                  ? undefined
                  : state.additional_information.citizenship.value.id,
                marital_status: !state.additional_information.marital_status
                  .value
                  ? undefined
                  : state.additional_information.marital_status.value.id,
                address: !state.additional_information.address.value.length
                  ? undefined
                  : state.additional_information.address.value,
                profession: !state.additional_information.profession.value
                  .length
                  ? undefined
                  : state.additional_information.profession.value,
                receive_promotion:
                  state.agreement.questionnaire.answers[2] !== undefined
                    ? "Yes"
                    : "No",
              },
        questionnaire: !Object.keys(state.questionnaire.answers).length
          ? undefined
          : {
              version_id: questionnaire.version_id,
              answers: {
                ...state.questionnaire.answers,
              },
            },
      };

      return fetchPostCreateCustomer(payload);
    },
    retry: 0,

    async onSuccess(data) {
      const cookie = new Cookies();
      await cookie.set("token", data.access_token, { path: "/" });
      await cookie.set("customer-token", data.access_token, { path: "/" });
      // await dispatchApp({
      //   type: AppActionEnum.SetUserData,
      //   payload: {
      //     ...appState.user,
      //     customer: {
      //       ...appState.user.customer,
      //       id: variables,
      //     },
      //   },
      // });
      navigate(
        PrivateRouteURL.routeToCustomerHomeURL({
          locale: locale,
        })
      );
    },
  });

  return mutation;
}
