import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PaymentHistoryReactQueryKey } from "../keys/keys";
import { fetchGetReceipt } from "src/core/services/billing";
import { GetReceiptRequestInterface } from "src/core/models/api/billings";

export const usePaymentHistoryGetReceipt = () => {
  const mutation = useMutation<
    Blob,
    AxiosError,
    { link: string; name: string }
  >({
    mutationKey: PaymentHistoryReactQueryKey.GetReceipt(),
    mutationFn: (data: { link: string; name: string }) => {
      const payload: GetReceiptRequestInterface = {
        path: {
          url: data.link,
        },
      };
      return fetchGetReceipt(payload);
    },
    onSuccess(data) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(data);
      const pdfLink = mutation.variables?.link ?? "";
      const endPDFIndex = pdfLink.search("pdf") + "pdf".length;
      const startPDFIndex = pdfLink.search("receipt/") + "receipt/".length;
      const pdfName = pdfLink.slice(startPDFIndex, endPDFIndex);
      a.setAttribute("download", pdfName);
      a.click();
    },
  });

  return mutation;
};
