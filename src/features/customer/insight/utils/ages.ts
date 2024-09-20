import { numberFormatter } from "src/core/utils/formatters";

export const getAges = (data: { locale: string }) => {
  const ages = Array.from({ length: 100 }, (_, i) => {
    if (data.locale === "zh") {
      return {
        id: String(i + 1),
        name: numberFormatter.replaceNumberWithChineseNumber(i + 1),
      };
    }
    return {
      id: String(i + 1),
      name: String(i + 1),
    };
  });
  return ages;
};
