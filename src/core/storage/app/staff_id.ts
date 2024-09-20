import { StaffIDStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setStaffID = (data: StaffIDStorageInterface) => {
  return localforage
    .setItem("StaffID", data)
    .then((res: StaffIDStorageInterface) => res);
};

export const getStaffID = () => {
  return localforage
    .getItem("StaffID")
    .then((res: any | StaffIDStorageInterface) => res);
};

export const removeStaffID = () => {
  return localforage
    .removeItem("StaffID")
    .then((res: any | StaffIDStorageInterface) => res);
};
