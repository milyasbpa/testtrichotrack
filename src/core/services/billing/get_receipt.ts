import axios from "axios";
import { GetReceiptRequestInterface } from "src/core/models/api/billings";

export const fetchGetReceipt = async (payload?: GetReceiptRequestInterface) => {
  const url = payload?.path.url ?? "";

  return await axios
    .get(url, {
      responseType: "blob",
    })
    .then((res) => {
      return res.data;
    });
};
