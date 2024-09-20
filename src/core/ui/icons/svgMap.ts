import { CloseIcon as Close } from "./close";
import { HomeIcon as Home } from "./home";
import { CenterFocusWeakIcon as CenterFocusWeak } from "./center_focus_weak";
import { MenuOpenIcon as MenuOpen } from "./menu_open/MenuOpen.icon";
import { DeviceIcon as Device } from "./device";
import { GlobeIcon as Globe } from "./globe";
import { UserGuideIcon as UserGuide } from "./user_guide";
import { PersonAddIcon as PersonAdd } from "./person_add";
import { ListAddIcon as ListAdd } from "./list_add";
import { ExitToAppIcon as ExitToApp } from "./exit_to_app";
import { FullscreenIcon as Fullscreen } from "./fullscreen";
import { CheckIcon as Check } from "./check/Check.icon";
import { StoreMallDirectoryIcon as StoreMallDirectory } from "./store_mall_directory";
import { RemoveRedEyeIcon as RemoveRedEye } from "./remove_red_eye";
import { StaffAddIcon as StaffAdd } from "./staff_add";
import { StaffsIcon as Staffs } from "./staffs";
import { CustomersIcon as Customers } from "./customers";
import { OutletAddIcon as OutletAdd } from "./outlet_add";
import { OutletsIcon as Outlets } from "./outlets";
import { PersonIcon as Person } from "./person";
import { CustomerStatisticsIcon as CustomerStatistics } from "./customer_statistics";
import { CustomerAnalyticsIcon as CustomerAnalytics } from "./customer_analytics";
import { CustomerInsightIcon as CustomerInsight } from "./customer_insight";
import { CustomerInactiveIcon as CustomerInactive } from "./customer_inactive";
import { CompanyBillingIcon as CompanyBilling } from "./company_billing";
import { CompanyEditLogoIcon as CompanyEditLogo } from "./company_edit_logo";
import { PictureIcon as Picture } from "./picture";
import { MonetizationOnIcon as MonetizationOn } from "./monetization_on";
import { ArrowIcon as Arrow } from "./arrow/Arrow.icon";
import { ChevronIcon as Chevron } from "./chevron";
import { StaffBillingIcon as StaffBilling } from "./staff_billing";
import { CustomerBillingIcon as CustomerBilling } from "./customer_billing";
import { PaymentHistoryIcon as PaymentHistory } from "./payment_history";
import { NotificationPreferencesIcon as NotificationPreferences } from "./notification_preferences";
import { CloudDownloadIcon as CloudDownload } from "./cloud_download";
import { ReceiptIcon as Receipt } from "./receipt";
import { CalendarIcon as Calendar } from "./calendar/Calendar.icon";
import { ArrowTriangleIcon as ArrowTriangle } from "./arrow_triangle";
import { ImageIcon as Image } from "./image";
import { SearchIcon as Search } from "./search";
import { TrashIcon as Trash } from "./trash";
import { PencilIcon as Pencil } from "./pencil";
import { ExclamationCircleIcon as ExclamationCircle } from "./exclamation_circle";
import { EmailIcon as Email } from "./email";
import { FindInPageIcon as FindInPage } from "./find_in_page";
import { CameraAltIcon as CameraAlt } from "./camera_alt";
import { CameraIcon as Camera } from "./camera";
import { BallotIcon as Ballot } from "./ballot";
import { CheckCircleIcon as CheckCircle } from "./check_circle";
import { TriangleIcon as Triangle } from "./triangle";
import { SearchNotFoundIcon as SearchNotFound } from "./search_not_found";
import { ReportIcon as Report } from "./report";
import { WarningIcon as Warning } from "./warning";
import { CheckEmptyCircleIcon as CheckEmptyCircle } from "./check_empty_circle";
import { ExclamationEmptyCircleIcon as ExclamationEmptyCircle } from "./exclamation_empty_circle";

export const svgMap = {
  Close,
  Home,
  CenterFocusWeak,
  MenuOpen,
  Device,
  Globe,
  UserGuide,
  PersonAdd,
  ListAdd,
  ExitToApp,
  Fullscreen,
  Check,
  StoreMallDirectory,
  RemoveRedEye,
  StaffAdd,
  Staffs,
  Customers,
  OutletAdd,
  Outlets,
  Person,
  CustomerStatistics,
  CustomerAnalytics,
  CustomerInsight,
  CustomerInactive,
  CompanyBilling,
  CompanyEditLogo,
  Picture,
  MonetizationOn,
  Arrow,
  Chevron,
  StaffBilling,
  CustomerBilling,
  PaymentHistory,
  NotificationPreferences,
  CloudDownload,
  Receipt,
  Calendar,
  ArrowTriangle,
  Image,
  Search,
  Trash,
  Pencil,
  ExclamationCircle,
  Email,
  FindInPage,
  CameraAlt,
  Camera,
  Ballot,
  CheckCircle,
  Triangle,
  SearchNotFound,
  Report,
  Warning,
  CheckEmptyCircle,
  ExclamationEmptyCircle,
};

export type SVGName = keyof typeof svgMap;
