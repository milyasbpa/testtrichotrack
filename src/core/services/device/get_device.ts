import axios from "axios";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetDevice = async () => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.DEVICE_API_URL}/Device-Key`
      : `${ENVIRONMENT.DEVICE_API_URL}/Device-Key`;

  return await axios.get(url).then((res) => {
    return res.data;
  });
};
