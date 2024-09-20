import { CompanyBillingPage } from "src/features/company/billing/page";
import { CompanyFailedPaymentPage } from "src/features/company/failed_payment/page";
import { CompanyLogoPage } from "src/features/company/logo/page/Logo.company.page";
import { CompanyNotificationPreferencesPage } from "src/features/company/notification_preferences/page";
import { CompanyPaymentHistoryPage } from "src/features/company/payment_history/page";
import { CompanySecretPage } from "src/features/company/secret/page/Secret.company.page";
import { CompanySuccessPaymentPage } from "src/features/company/success_payment/pages";
import { CompanyTopupPage } from "src/features/company/topup/page";
import { CustomerBusinessAnalyticsPage } from "src/features/customer/business_analytics/page";
import { CustomerCarePlansPage } from "src/features/customer/care_plans/page";
import { CustomerComparisonPage } from "src/features/customer/comparison/page";
import { CustomerDiagnosisPage } from "src/features/customer/diagnosis/page";
import { CustomerHomePage } from "src/features/customer/home/page";
import { CustomerHomeCarePage } from "src/features/customer/home_care/page";
import { CustomerInactivePage } from "src/features/customer/inactive/page";
import { CustomerInsightPage } from "src/features/customer/insight/page";
import { CustomerIssuePage } from "src/features/customer/issue/pages";
import { CustomerListPage } from "src/features/customer/list/page";
import { CustomerLoginPage } from "src/features/customer/login/page/Login.customer.page";
import { CustomerLogoutPage } from "src/features/customer/logout/page";
import { CustomerRecommendationPage } from "src/features/customer/recommendation/page";
import { CustomerRecordPage } from "src/features/customer/record/page";
import { CustomerRegistrationPage } from "src/features/customer/registration/page";
import { CustomerScanRoutinePage } from "src/features/customer/scan/compulsory/page";
import { CustomerScanRoutinePreviewPage } from "src/features/customer/scan/compulsory_preview/page";
import { CustomerScanErrorPage } from "src/features/customer/scan/error/page";
import { CustomerScanExamplesPage } from "src/features/customer/scan/examples/page";
import { CustomerScanGlobalPage } from "src/features/customer/scan/global/page";
import { CustomerScanGlobalExamplesPage } from "src/features/customer/scan/global_examples/page";
import { CustomerScanGlobalInstructionPage } from "src/features/customer/scan/global_instruction/page";
import { CustomerScanGlobalCameraErrorPage } from "src/features/customer/scan/global_scan_camera_error/page";
import { CustomerScanGlobalSkipPage } from "src/features/customer/scan/global_skip/page";
import { CustomerScanInstructionPage } from "src/features/customer/scan/instruction/page";
import { CustomerScanSpotlightConfirmationPage } from "src/features/customer/scan/spotlight_confirmation/page";
import { CustomerScreeningPage } from "src/features/customer/screening/page";
import { CustomerStatisticsPage } from "src/features/customer/statistics/pages";
import { OutletAddPage } from "src/features/outlet/add/page";
import { OutletEditPage } from "src/features/outlet/edit/page";
import { OutletListPage } from "src/features/outlet/list/page";
import { OutletViewPage } from "src/features/outlet/view/page";
import { StaffAddPage } from "src/features/staff/add/page";
import { StaffDashboardPage } from "src/features/staff/dashboard/page/Dashboard.staff.page";
import { StaffEditPage } from "src/features/staff/edit/page";
import { StaffHomePage } from "src/features/staff/home/page/Home.staff.page";
import { StaffListPage } from "src/features/staff/list/pages";
import { StaffLoginPage } from "src/features/staff/login/page/Login.staff.page";
import { StaffLogoutPage } from "src/features/staff/logout/page/Logout.staff.page";
import { StaffProfilePage } from "src/features/staff/profile/page";

interface RouteConfig {
  path: string;
  component: React.ComponentType;
  isPrivate: boolean;
  restricted?: boolean; // For public routes that are restricted to unauthenticated users
  allowedRoles?: string[];
}

export const routes: RouteConfig[] = [
  // company
  {
    path: "/",
    component: CompanySecretPage,
    isPrivate: false,
    restricted: true,
  },
  {
    path: "/:locale/",
    component: CompanySecretPage,
    isPrivate: false,
    restricted: true,
  },
  {
    path: "/:locale/company/edit-logo",
    component: CompanyLogoPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/company/billing",
    component: CompanyBillingPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/company/notification-preferences",
    component: CompanyNotificationPreferencesPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/company/topup",
    component: CompanyTopupPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/company/payment-history",
    component: CompanyPaymentHistoryPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/company/success-payment",
    component: CompanySuccessPaymentPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/company/failed-payment",
    component: CompanyFailedPaymentPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  // outlet
  {
    path: "/:locale/outlet/add",
    component: OutletAddPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/outlets",
    component: OutletListPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/outlet/edit/:outletID",
    component: OutletEditPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/my-outlet",
    component: OutletViewPage,
    isPrivate: true,
    allowedRoles: ["MANAGER", "EMPLOYEE"],
  },
  // staff
  {
    path: "/:locale/login",
    component: StaffLoginPage,
    isPrivate: true,
  },
  {
    path: "/:locale/staff/home",
    component: StaffHomePage,
    isPrivate: true,
    allowedRoles: ["ADMIN", "MANAGER", "EMPLOYEE"],
  },
  {
    path: "/:locale/staff/logout",
    component: StaffLogoutPage,
    isPrivate: true,
    allowedRoles: ["ADMIN", "MANAGER", "EMPLOYEE"],
  },
  {
    path: "/:locale/staff/dashboard",
    component: StaffDashboardPage,
    isPrivate: true,
    allowedRoles: ["ADMIN", "MANAGER", "EMPLOYEE"],
  },
  {
    path: "/:locale/staffs",
    component: StaffListPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/staff/add",
    component: StaffAddPage,
    isPrivate: true,
    allowedRoles: ["ADMIN", "MANAGER"],
  },
  {
    path: "/:locale/staff/edit/:staffID",
    component: StaffEditPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/staff/my-profile",
    component: StaffProfilePage,
    isPrivate: true,
    allowedRoles: ["ADMIN", "MANAGER", "EMPLOYEE"],
  },
  // customer
  {
    path: "/:locale/customer/registration",
    component: CustomerRegistrationPage,
    isPrivate: true,
    allowedRoles: ["ADMIN", "MANAGER", "EMPLOYEE"],
  },
  {
    path: "/:locale/customer/login",
    component: CustomerLoginPage,
    isPrivate: true,
    allowedRoles: ["ADMIN", "MANAGER", "EMPLOYEE"],
  },
  {
    path: "/:locale/customer/home",
    component: CustomerHomePage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/logout",
    component: CustomerLogoutPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customers",
    component: CustomerListPage,
    isPrivate: true,
    allowedRoles: ["ADMIN", "MANAGER", "EMPLOYEE"],
  },
  {
    path: "/:locale/customer/record",
    component: CustomerRecordPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/diagnosis",
    component: CustomerDiagnosisPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },

  {
    path: "/:locale/customer/screening",
    component: CustomerScreeningPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/comparison",
    component: CustomerComparisonPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/recommendation",
    component: CustomerRecommendationPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/home-care/:id",
    component: CustomerHomeCarePage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/care-plans/:care_plans_id/diagnosis/:diagnosis_id",
    component: CustomerCarePlansPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/care-plans/:care_plans_id/diagnosis/:diagnosis_id/case-id/:case_id",
    component: CustomerCarePlansPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/:diagnosis/issue/:case_id",
    component: CustomerIssuePage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/inactive",
    component: CustomerInactivePage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/customer/insight",
    component: CustomerInsightPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/customer/statistics",
    component: CustomerStatisticsPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/customer/business-analytics",
    component: CustomerBusinessAnalyticsPage,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/:locale/customer/scan/global-area-instruction",
    component: CustomerScanGlobalInstructionPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/scan/global/examples",
    component: CustomerScanGlobalExamplesPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/scan/global/skip",
    component: CustomerScanGlobalSkipPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/scan/global/skip",
    component: CustomerScanGlobalSkipPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/scan/global",
    component: CustomerScanGlobalPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/scan/global-camera-error",
    component: CustomerScanGlobalCameraErrorPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/scan/instruction",
    component: CustomerScanInstructionPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/scan/examples",
    component: CustomerScanExamplesPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/scan/routine",
    component: CustomerScanRoutinePage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/scan/routine/preview",
    component: CustomerScanRoutinePreviewPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/scan/spotlight/confirmation",
    component: CustomerScanSpotlightConfirmationPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
  {
    path: "/:locale/customer/scan/error",
    component: CustomerScanErrorPage,
    isPrivate: true,
    allowedRoles: ["CUSTOMER"],
  },
];
