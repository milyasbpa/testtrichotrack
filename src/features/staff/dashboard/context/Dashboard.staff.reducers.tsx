import {
  DashboardStaffAvatar,
  DashboardStaffHeader,
  DashboardStaffMenu,
  DashboardStaffOutlet,
  DashboardStaffActionEnum,
  DashboardStaffActions,
} from "./Dashboard.staff.types";

// Avatar
export const DashboardStaffAvatarReducer = (
  state: DashboardStaffAvatar,
  action: DashboardStaffActions
) => {
  switch (action.type) {
    case DashboardStaffActionEnum.SetAvatarData:
      return action.payload;

    default:
      return state;
  }
};

// Header
export const DashboardStaffHeaderReducer = (
  state: DashboardStaffHeader,
  action: DashboardStaffActions
) => {
  switch (action.type) {
    case DashboardStaffActionEnum.SetHeaderData:
      return action.payload;
    case DashboardStaffActionEnum.SetHeaderGreeting:
      return {
        ...state,
        greeting: action.payload,
      };

    case DashboardStaffActionEnum.SetHeaderClock:
      return {
        ...state,
        greeting: action.payload,
      };

    default:
      return state;
  }
};

// menu
export const DashboardStaffMenuReducer = (
  state: DashboardStaffMenu,
  action: DashboardStaffActions
) => {
  switch (action.type) {
    case DashboardStaffActionEnum.SetMenu: {
      return action.payload;
    }
    case DashboardStaffActionEnum.SetMenuData: {
      return {
        ...state,
        data: action.payload,
      };
    }

    default:
      return state;
  }
};

// Outlet
export const DashboardStaffOutletReducer = (
  state: DashboardStaffOutlet,
  action: DashboardStaffActions
) => {
  switch (action.type) {
    case DashboardStaffActionEnum.SetOutletData: {
      return action.payload;
    }

    default:
      return state;
  }
};
