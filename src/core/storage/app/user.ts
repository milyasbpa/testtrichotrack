import { GetReadUser200SuccessResponseInterface } from "src/core/models/api/login";
import localforage from "localforage";

export const setUser = (data: GetReadUser200SuccessResponseInterface) => {
  return localforage
    .setItem("User", data)
    .then((res: GetReadUser200SuccessResponseInterface) => res);
};

export const getUser = () => {
  return localforage
    .getItem("User")
    .then((res: any | GetReadUser200SuccessResponseInterface) => res);
};

export const removeUser = () => {
  return localforage
    .removeItem("User")
    .then((res: any | GetReadUser200SuccessResponseInterface) => res);
};
