import { RoleStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setRole = (data: RoleStorageInterface) => {
  return localforage
    .setItem("Role", data)
    .then((res: RoleStorageInterface) => res);
};

export const getRole = () => {
  return localforage
    .getItem("Role")
    .then((res: any | RoleStorageInterface) => res);
};

export const removeRole = () => {
  return localforage
    .removeItem("Role")
    .then((res: any | RoleStorageInterface) => res);
};
