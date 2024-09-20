import axios from "axios";
import Cookies from "universal-cookie";
import { GetQuestionnaireRequestInterface } from "src/core/models/api/configuration";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetQuestionnaire = async (
  params?: GetQuestionnaireRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/configuration/questionnaire`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/configuration/questionnaire`;

  const cookie = new Cookies();
  const token = cookie.get("staff-token");

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    })
    .then((res) => {
      return res.data;
    });
};
