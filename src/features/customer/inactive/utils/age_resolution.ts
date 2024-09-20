import { numberFormatter } from "src/core/utils/formatters";

export const getAgeResolution = (data: { locale: string }) => {
  const ages = Array.from({ length: 3 }, (_, i) => {
    if (data.locale === "zh") {
      return {
        id: i === 0 ? "1" : String(i * 5),
        name:
          i === 0
            ? numberFormatter.replaceNumberWithChineseNumber(1)
            : numberFormatter.replaceNumberWithChineseNumber(i * 5),
      };
    }
    return {
      id: i === 0 ? "1" : String(i * 5),
      name: i === 0 ? "1" : String(i * 5),
    };
  });
  return ages;
};
