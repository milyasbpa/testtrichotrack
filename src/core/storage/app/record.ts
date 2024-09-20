import { RecordStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setRecord = (data: RecordStorageInterface) => {
  return localforage
    .setItem("Record", data)
    .then((res: RecordStorageInterface) => res);
};

export const getRecord = () => {
  return localforage
    .getItem("Record")
    .then((res: any | RecordStorageInterface) => res);
};

export const removeRecord = () => {
  return localforage
    .removeItem("Record")
    .then((res: any | RecordStorageInterface) => res);
};
