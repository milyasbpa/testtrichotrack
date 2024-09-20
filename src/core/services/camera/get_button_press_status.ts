import axios from "axios";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetButtonPressStatus = async () => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.DEVICE_API_URL}/Status`
      : `${ENVIRONMENT.DEVICE_API_URL}/Status`;

  return await axios.get(url).then((res) => {
    return res.data;
  });
};
