import { ReportStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setReport = (data: ReportStorageInterface) => {
  return localforage
    .setItem("Report", data)
    .then((res: ReportStorageInterface) => res);
};

export const getReport = () => {
  return localforage
    .getItem("Report")
    .then((res: any | ReportStorageInterface) => res);
};

export const removeReport = () => {
  return localforage
    .removeItem("Report")
    .then((res: any | ReportStorageInterface) => res);
};
