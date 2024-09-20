import axios, { AxiosResponse } from "axios";
import Cookies from "universal-cookie";
import {
  PostCreateCustomer200SuccessResponseInterface,
  PostCreateCustomerRequestInterface,
} from "src/core/models/api/customer";
import { ENVIRONMENT } from "src/core/constants";

export const fetchPostCreateCustomer = (
  data: PostCreateCustomerRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/customers/`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/customers/`;

  const cookie = new Cookies();
  const token = cookie.get("staff-token");

  return axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(
      (res: AxiosResponse<PostCreateCustomer200SuccessResponseInterface>) => {
        return res.data;
      }
    );
};
