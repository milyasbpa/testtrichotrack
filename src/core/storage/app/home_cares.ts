import { HomeCaresStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setHomeCares = (data: HomeCaresStorageInterface) => {
  return localforage
    .setItem("HomeCares", data)
    .then((res: HomeCaresStorageInterface) => res);
};

export const getHomeCares = () => {
  return localforage
    .getItem("HomeCares")
    .then((res: any | HomeCaresStorageInterface) => res);
};

export const removeHomeCares = () => {
  return localforage
    .removeItem("HomeCares")
    .then((res: any | HomeCaresStorageInterface) => res);
};
