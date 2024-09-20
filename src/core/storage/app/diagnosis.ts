import { DiagnosisStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setDiagnosis = (data: DiagnosisStorageInterface) => {
  return localforage
    .setItem("Diagnosis", data)
    .then((res: DiagnosisStorageInterface) => res);
};

export const getDiagnosis = () => {
  return localforage
    .getItem("Diagnosis")
    .then((res: any | DiagnosisStorageInterface) => res);
};

export const removeDiagnosis = () => {
  return localforage
    .removeItem("Diagnosis")
    .then((res: any | DiagnosisStorageInterface) => res);
};
