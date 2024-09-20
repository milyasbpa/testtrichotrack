import { DiagnosisIssueStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setDiagnosisIssue = (data: DiagnosisIssueStorageInterface) => {
  return localforage
    .setItem("DiagnosisIssue", data)
    .then((res: DiagnosisIssueStorageInterface) => res);
};

export const getDiagnosisIssue = () => {
  return localforage
    .getItem("DiagnosisIssue")
    .then((res: any | DiagnosisIssueStorageInterface) => res);
};

export const removeDiagnosisIssue = () => {
  return localforage
    .removeItem("DiagnosisIssue")
    .then((res: any | DiagnosisIssueStorageInterface) => res);
};
