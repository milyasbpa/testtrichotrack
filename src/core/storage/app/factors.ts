import { FactorsStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setFactors = (data: FactorsStorageInterface) => {
  return localforage
    .setItem("Factors", data)
    .then((res: FactorsStorageInterface) => res);
};

export const getFactors = () => {
  return localforage
    .getItem("Factors")
    .then((res: any | FactorsStorageInterface) => res);
};

export const removeFactors = () => {
  return localforage
    .removeItem("Factors")
    .then((res: any | FactorsStorageInterface) => res);
};
