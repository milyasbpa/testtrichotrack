import { LocaleRoute } from "./locale";

export const PrivateRouteURL = {
  // company
  routeToCompanyBillingURL: (data?: { locale?: string }) =>
    `/:locale/company/billing`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCompanyTopUpURL: (data?: { locale?: string }) =>
    `/:locale/company/topup`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCompanyNotificationPreferencesURL: (data?: { locale?: string }) =>
    `/:locale/company/notification-preferences`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCompanyPaymentHistoryURL: (data?: { locale?: string }) =>
    `/:locale/company/payment-history`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCompanySuccessPaymentURL: (data?: { locale?: string }) =>
    `/:locale/company/success-payment`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCompanyFailedPaymentURL: (data?: { locale?: string }) =>
    `/:locale/company/success-payment`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  // outlet
  routeToOutletAddURL: (data?: { locale?: string }) =>
    `/:locale/outlet/add`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToOutletsURL: (data?: { locale?: string }) =>
    `/:locale/outlets`.replace(":locale", data?.locale ?? LocaleRoute.default),
  routeToOutletEditURL: (data: { locale?: string; outlet_id: string }) =>
    `/:locale/outlet/edit/:outletID`
      .replace(":locale", data.locale ?? LocaleRoute.default)
      .replace(":outletID", data.outlet_id),
  // staff
  routeToStaffLoginURL: (data?: { locale?: string }) =>
    `/:locale/login`.replace(":locale", data?.locale ?? LocaleRoute.default),
  routeToStaffHomeURL: (data?: { locale?: string }) =>
    `/:locale/staff/home`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToStaffLogoutURL: (data?: { locale?: string }) =>
    `/:locale/staff/logout`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToStaffDashboardURL: (data?: { locale?: string }) =>
    `/:locale/staff/dashboard`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToStaffsURL: (data?: { locale?: string }) =>
    `/:locale/staffs`.replace(":locale", data?.locale ?? LocaleRoute.default),
  routeToStaffAddURL: (data?: { locale?: string }) =>
    `/:locale/staff/add`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToStaffEditURL: (data: { locale?: string; staff_id: string }) =>
    `/:locale/staff/edit/:staffID`
      .replace(":locale", data.locale ?? LocaleRoute.default)
      .replace(":staffID", data.staff_id),
  routeToStaffProfileURL: (data?: { locale?: string }) =>
    `/:locale/staff/profile`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  // customer
  routeToCustomerRegistrationURL: (data?: { locale?: string }) =>
    `/:locale/customer/registration`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerLoginURL: (data?: { locale?: string }) =>
    `/:locale/customer/login`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerHomeURL: (data?: { locale?: string }) =>
    `/:locale/customer/home`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerRecordURL: (data: { locale?: string }) =>
    `/:locale/customer/record`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScreeningURL: (data?: { locale?: string }) =>
    `/:locale/customer/screening`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerComparisonURL: (data?: { locale?: string }) =>
    `/:locale/customer/comparison`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerDiagnosisURL: (data?: { locale?: string }) =>
    `/:locale/customer/diagnosis`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerIssueURL: (data: {
    locale?: string;
    diagnosis: string;
    case_id: string;
  }) =>
    `/:locale/customer/:diagnosis/issue/:case_id`
      .replace(":locale", data.locale ?? LocaleRoute.default)
      .replace(":diagnosis", data.diagnosis)
      .replace(":case_id", data.case_id),
  routeToCustomerRecommendationURL: (data?: { locale?: string }) =>
    `/:locale/customer/recommendation`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerHomeCareURL: (data: { locale?: string; id: string }) =>
    `/:locale/customer/home-care/:id`
      .replace(":locale", data.locale ?? LocaleRoute.default)
      .replace(":id", data.id),
  routeToCustomerCarePlansURL: (data: {
    locale?: string;
    care_plans_id: string;
    diagnosis_id: string;
    case_id?: string;
  }) =>
    !data.case_id
      ? `/:locale/customer/care-plans/:care_plans_id/diagnosis/:diagnosis`
          .replace(":locale", data?.locale ?? LocaleRoute.default)
          .replace(":care_plans_id", data.care_plans_id)
          .replace(":diagnosis", data?.diagnosis_id ?? "")
      : `/:locale/customer/care-plans/:care_plans_id/diagnosis/:diagnosis/case-id/:case_id`
          .replace(":locale", data?.locale ?? LocaleRoute.default)
          .replace(":care_plans_id", data.care_plans_id)
          .replace(":diagnosis_id", data?.diagnosis_id ?? "")
          .replace(":case_id", data.case_id),
  routeToCustomerLogoutURL: (data?: { locale?: string }) =>
    `/:locale/customer/logout`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanErrorInsufficientCreditBalanceURL: (data?: {
    locale?: string;
  }) =>
    `/:locale/customer/scan/error/insufficient-credit-balance`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanErrorMaximumLimitReachedURL: (data?: {
    locale?: string;
  }) =>
    `/:locale/customer/scan/error/maximum-limit-reached`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanGlobalAreaInstructionURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/global-area-instruction`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanGlobalImageExamplesURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/global/examples`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanGlobalURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/global`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanGlobalSkipURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/global/skip`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanGlobalCameraErrorURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/global-camera-error`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanInstructionURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/instruction`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanImageExamplesURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/examples`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanRoutineURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/routine`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanRoutinePreviewURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/routine/preview`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanRetakeRoutineUrl: (data?: { locale?: string }) =>
    `/:locale/customer/scan/routine/retake`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanSpotlightConfirmationURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/spotlight/confirmation`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanSpotlightAreaURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/spotlight`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanSelectSpotlightAreaURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/select-spotlight-area`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanAnotherTakeConfirmationURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/another-take-confirmation`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanCompletionConfirmationURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/completion-confirmation`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanErrorURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/error`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanAllImageInvalidURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/all-image-invalid`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanViewPartialImageInvalidURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/partial-image-invalid`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanRetakePartialInvalidImageURL: (data?: {
    locale?: string;
  }) =>
    `/:locale/customer/scan/retake-partial-image-invalid`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanReachLimitURL: (data?: { locale?: string }) =>
    `/:locale/customer/scan/reach-limit`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
  routeToCustomerScanLostMicroscopeConnectionURL: (data?: {
    locale?: string;
  }) =>
    `/:locale/customer/scan/lost-microscope-connection`.replace(
      ":locale",
      data?.locale ?? LocaleRoute.default
    ),
};
