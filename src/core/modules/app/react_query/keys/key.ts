import {
  GetCasesRequestInterface,
  GetDiagnosisOverviewRequestInterface,
  GetDiagnosisScreeningsRequestInterface,
  GetDiagnosisTrendsRequestInterface,
  GetGlobalCaseRequestInterface,
  GetRoutineCaseRequestInterface,
  GetSpotlightCaseRequestInterface,
} from "src/core/models/api/cases";
import { GetCustomerRequestInterface } from "src/core/models/api/customer";
import { GetStaffRequestInterface } from "src/core/models/api/staff";

export const AppReactQueryKey = {
  GetDevice: () => ["AppReactQueryKey.GetDevice"],
  RemoveDevice: () => ["AppReactQueryKeyPostCheckAPIKey.RemoveDevice"],
  SetClientCamera: () => ["AppReactQueryKeyPostCheckAPIKey.SetClientCamera"],
  GetCompanyLogo: () => ["AppReactQueryKey.GetCompanyLogo"],
  GetVersion: () => ["AppReactQueryKey.GetVersion"],
  GetReadUserStaff: () => ["AppReactQueryKey.GetReadUserStaff"],
  GetReadUserCustomer: () => ["AppReactQueryKey.GetReadUserCustomer"],
  GetStaff: (payload?: GetStaffRequestInterface) => [
    "AppReactQueryKey.GetStaff",
    [payload] as const,
  ],
  GetCustomer: (payload?: GetCustomerRequestInterface) => [
    "AppReactQueryKey.GetCustomer",
    [payload] as const,
  ],
  SetOutletID: () => ["AppReactQueryKey.SetOutletID"],

  GetCases: (payload?: GetCasesRequestInterface) => [
    "AppReactQueryKey.GetCases",
    [payload] as const,
  ],
  GetGlobalCase: (payload?: GetGlobalCaseRequestInterface) => [
    "AppReactQueryKey.GetGlobalCase",
    [payload] as const,
  ],
  GetRoutineCase: (payload?: GetRoutineCaseRequestInterface) => [
    "AppReactQueryKey.GetRoutineCase",
    [payload] as const,
  ],
  GetSpotlightCase: (payload?: GetSpotlightCaseRequestInterface) => [
    "AppReactQueryKey.GetSpotlightCase",
    [payload] as const,
  ],
  GetDiagnosisOverview: (payload?: GetDiagnosisOverviewRequestInterface) => [
    "AppReactQueryKey.GetDiagnosis",
    [payload] as const,
  ],
  GetDiagnosisScreenings: (
    payload?: GetDiagnosisScreeningsRequestInterface
  ) => ["AppReactQueryKey.GetDiagnosisScreenings", [payload] as const],
  GetDiagnosisTrends: (payload?: GetDiagnosisTrendsRequestInterface) => [
    "AppReactQueryKey.GetDiagnosisTrends",
    [payload] as const,
  ],
  PostUploadReport: () => ["AppReactQueryKey.PostUploadReport"],
};
