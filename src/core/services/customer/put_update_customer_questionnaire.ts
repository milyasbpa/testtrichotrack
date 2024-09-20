import axios from "axios";
import Cookies from "universal-cookie";
import { PutUpdateCustomerQuestionnaireRequestInterface } from "src/core/models/api/customer";
import { ENVIRONMENT } from "src/core/constants";

export const fetchPutUpdateCustomerQuestionnaire = (
  data: PutUpdateCustomerQuestionnaireRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/customers/${data.id}/questionnaire`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/customers/${data.id}/questionnaire`;

  const cookie = new Cookies();
  const token = cookie.get("customer-token");

  return axios
    .put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
