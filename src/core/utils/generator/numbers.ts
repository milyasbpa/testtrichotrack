import { numberFormatter } from "src/core/utils/formatters";

export const getNumbers = (data: {
  locale?: string;
  length: number;
  start: number;
  gap: number;
  type: "asc" | "desc";
}) => {
  const numbers = Array.from({ length: data.length }, (_, i) => {
    const number =
      data.type === "asc"
        ? data.start + data.gap * i
        : data.start - data.gap * i;
    if (data.locale === "zh") {
      return {
        id: String(number),
        name: numberFormatter.replaceNumberWithChineseNumber(number),
      };
    }
    return {
      id: String(number),
      name: String(number),
    };
  });
  return numbers;
};
