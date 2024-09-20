import { CompulsoryScanRetakeStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setCompulsoryScanRetake = (
  data: CompulsoryScanRetakeStorageInterface
) => {
  return localforage
    .setItem("CompulsoryScanRetake", data)
    .then((res: CompulsoryScanRetakeStorageInterface) => res);
};

export const getCompulsoryScanRetake = () => {
  return localforage
    .getItem("CompulsoryScanRetake")
    .then((res: any | CompulsoryScanRetakeStorageInterface) => res);
};

export const removeCompulsoryScanRetake = () => {
  return localforage
    .removeItem("CompulsoryScanRetake")
    .then((res: any | CompulsoryScanRetakeStorageInterface) => res);
};
