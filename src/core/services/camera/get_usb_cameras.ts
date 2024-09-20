import axios from "axios";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetUSBCameras = async () => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.DRIVER_API_URL}/camera/usb`
      : `${ENVIRONMENT.DRIVER_API_URL}/camera/usb`;

  return await axios.get(url).then((res) => {
    return res.data;
  });
};
