import {
  CustomerHomeAvatar,
  CustomerHomeHeader,
  CustomerHomeMenu,
  CustomerHomeOutlet,
  CustomerHomeActionEnum,
  CustomerHomeActions,
} from "./Home.customer.types";

// Avatar
export const CustomerHomeAvatarReducer = (
  state: CustomerHomeAvatar,
  action: CustomerHomeActions
) => {
  switch (action.type) {
    case CustomerHomeActionEnum.SetAvatarData:
      return action.payload;

    default:
      return state;
  }
};

// Header
export const CustomerHomeHeaderReducer = (
  state: CustomerHomeHeader,
  action: CustomerHomeActions
) => {
  switch (action.type) {
    case CustomerHomeActionEnum.SetHeaderData:
      return action.payload;
    case CustomerHomeActionEnum.SetHeaderGreeting:
      return {
        ...state,
        greeting: action.payload,
      };

    case CustomerHomeActionEnum.SetHeaderClock:
      return {
        ...state,
        greeting: action.payload,
      };

    default:
      return state;
  }
};

// menu
export const CustomerHomeMenuReducer = (
  state: CustomerHomeMenu,
  action: CustomerHomeActions
) => {
  switch (action.type) {
    case CustomerHomeActionEnum.SetMenu: {
      return action.payload;
    }
    case CustomerHomeActionEnum.SetMenuData: {
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
export const CustomerHomeOutletReducer = (
  state: CustomerHomeOutlet,
  action: CustomerHomeActions
) => {
  switch (action.type) {
    case CustomerHomeActionEnum.SetOutletData: {
      return action.payload;
    }

    default:
      return state;
  }
};
