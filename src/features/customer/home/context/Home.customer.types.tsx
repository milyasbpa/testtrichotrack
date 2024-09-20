type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface CustomerHomeInitialStateType {
  avatar: CustomerHomeAvatar;
  header: CustomerHomeHeader;
  menu: CustomerHomeMenu;
  outlet: CustomerHomeOutlet;
}

// State Collection Types consist of:

export interface CustomerHomeAvatar {
  initial: string;
  photo: string;
}

export interface CustomerHomeHeader {
  name: string;
  clock: string;
  role: string;
}

export interface CustomerHomeMenu {
  data: {
    link: string;
    icon: string;
    name: string;
  }[];
}

export interface CustomerHomeOutlet {
  form: {
    is_open: boolean;
    items: {
      id: string;
      name: string;
    }[];
    selected: null | { id: string; name: string };
  };
}

export enum CustomerHomeActionEnum {
  // data
  SetStaffID = "SetStaffID",
  SetStaffData = "SetStaffData",
  SetStaffOutlet = "SetStaffOutlet",
  // avatar
  SetAvatarData = "SetAvatarData",
  // header
  SetHeaderData = "SetHeaderData",
  SetHeaderGreeting = "SetHeaderGreeting",
  SetHeaderClock = "SetHeaderClock",
  // menu
  SetMenu = "SetMenu",
  SetMenuData = "SetMenuData",
  // outlet
  SetOutletData = "SetOutletData",
}

// Action Collection Types
export type CustomerHomeActions =
  | CustomerHomeAvatarActions
  | CustomerHomeHeaderActions
  | CustomerHomeMenuActions
  | CustomerHomeOutletActions;

// Action Collection Types consist of:

// Avatar
type CustomerHomeAvatarPayload = {
  [CustomerHomeActionEnum.SetAvatarData]: {
    initial: string;
    photo: string;
  };
};

export type CustomerHomeAvatarActions =
  ActionMap<CustomerHomeAvatarPayload>[keyof ActionMap<CustomerHomeAvatarPayload>];

// Header
type CustomerHomeHeaderPayload = {
  [CustomerHomeActionEnum.SetHeaderData]: CustomerHomeHeader;
  [CustomerHomeActionEnum.SetHeaderGreeting]: string;
  [CustomerHomeActionEnum.SetHeaderClock]: string;
};

export type CustomerHomeHeaderActions =
  ActionMap<CustomerHomeHeaderPayload>[keyof ActionMap<CustomerHomeHeaderPayload>];

// Menu
type CustomerHomeMenuPayload = {
  [CustomerHomeActionEnum.SetMenu]: CustomerHomeMenu;
  [CustomerHomeActionEnum.SetMenuData]: {
    link: string;
    icon: string;
    name: string;
  }[];
};

export type CustomerHomeMenuActions =
  ActionMap<CustomerHomeMenuPayload>[keyof ActionMap<CustomerHomeMenuPayload>];

// Outlet
type CustomerHomeOutletPayload = {
  [CustomerHomeActionEnum.SetOutletData]: CustomerHomeOutlet;
};

export type CustomerHomeOutletActions =
  ActionMap<CustomerHomeOutletPayload>[keyof ActionMap<CustomerHomeOutletPayload>];
