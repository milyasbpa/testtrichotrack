import axios from "axios";
import Cookies from "universal-cookie";
import { PutNotificationPreferenceRequestInterface } from "src/core/models/api/billings";
import { ENVIRONMENT } from "src/core/constants";

export const fetchPutNotificationPreference = (
  payload: PutNotificationPreferenceRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/billings/notification-preference`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/billings/notification-preference`;

  const cookie = new Cookies();
  const token = cookie.get("staff-token");

  return axios
    .put(url, payload.body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
