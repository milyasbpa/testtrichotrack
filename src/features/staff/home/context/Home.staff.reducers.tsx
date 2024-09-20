import {
  StaffHomeAvatar,
  StaffHomeHeader,
  StaffHomeMenu,
  StaffHomeOutlet,
  StaffHomeActionEnum,
  StaffHomeActions,
} from "./Home.staff.types";

// Avatar
export const StaffHomeAvatarReducer = (
  state: StaffHomeAvatar,
  action: StaffHomeActions
) => {
  switch (action.type) {
    case StaffHomeActionEnum.SetAvatarData:
      return action.payload;

    default:
      return state;
  }
};

// Header
export const StaffHomeHeaderReducer = (
  state: StaffHomeHeader,
  action: StaffHomeActions
) => {
  switch (action.type) {
    case StaffHomeActionEnum.SetHeaderData:
      return action.payload;
    case StaffHomeActionEnum.SetHeaderGreeting:
      return {
        ...state,
        greeting: action.payload,
      };

    case StaffHomeActionEnum.SetHeaderClock:
      return {
        ...state,
        greeting: action.payload,
      };

    default:
      return state;
  }
};

// menu
export const StaffHomeMenuReducer = (
  state: StaffHomeMenu,
  action: StaffHomeActions
) => {
  switch (action.type) {
    case StaffHomeActionEnum.SetMenu: {
      return action.payload;
    }
    case StaffHomeActionEnum.SetMenuData: {
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
export const StaffHomeOutletReducer = (
  state: StaffHomeOutlet,
  action: StaffHomeActions
) => {
  switch (action.type) {
    case StaffHomeActionEnum.SetOutletData: {
      return action.payload;
    }

    default:
      return state;
  }
};
