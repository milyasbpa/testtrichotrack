import { LocaleRoute } from "src/core/utils/router/constants";
import en from "./locales/en.json";
import zh from "./locales/zh.json";
const dictionaries: { [key: string]: typeof en | typeof zh } = {
  en: en,
  zh: zh,
};

export const getDictionaries = (locale?: string) =>
  dictionaries[locale ?? LocaleRoute.default];
