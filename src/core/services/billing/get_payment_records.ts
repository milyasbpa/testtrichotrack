import axios from "axios";
import Cookies from "universal-cookie";
import { GetPaymentRecordsRequestInterface } from "src/core/models/api/billings";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetPaymentRecords = async (
  payload?: GetPaymentRecordsRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/billings/payment-records`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/billings/payment-records`;

  const cookie = new Cookies();
  const token = cookie.get("staff-token");

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: payload?.params,
    })
    .then((res) => {
      return res.data;
    });
};
