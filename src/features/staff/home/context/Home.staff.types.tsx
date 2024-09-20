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
export interface StaffHomeInitialStateType {
  avatar: StaffHomeAvatar;
  header: StaffHomeHeader;
  menu: StaffHomeMenu;
  outlet: StaffHomeOutlet;
}

// State Collection Types consist of:

export interface StaffHomeAvatar {
  initial: string;
  photo: string;
}

export interface StaffHomeHeader {
  name: string;
  clock: string;
  role: string;
}

export interface StaffHomeMenu {
  data: {
    link: string;
    icon: string;
    name: string;
  }[];
}

export interface StaffHomeOutlet {
  form: {
    is_open: boolean;
    items: {
      id: string;
      name: string;
    }[];
    selected: null | { id: string; name: string };
  };
}

export enum StaffHomeActionEnum {
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
export type StaffHomeActions =
  | StaffHomeAvatarActions
  | StaffHomeHeaderActions
  | StaffHomeMenuActions
  | StaffHomeOutletActions;

// Action Collection Types consist of:

// Avatar
type StaffHomeAvatarPayload = {
  [StaffHomeActionEnum.SetAvatarData]: {
    initial: string;
    photo: string;
  };
};

export type StaffHomeAvatarActions =
  ActionMap<StaffHomeAvatarPayload>[keyof ActionMap<StaffHomeAvatarPayload>];

// Header
type StaffHomeHeaderPayload = {
  [StaffHomeActionEnum.SetHeaderData]: StaffHomeHeader;
  [StaffHomeActionEnum.SetHeaderGreeting]: string;
  [StaffHomeActionEnum.SetHeaderClock]: string;
};

export type StaffHomeHeaderActions =
  ActionMap<StaffHomeHeaderPayload>[keyof ActionMap<StaffHomeHeaderPayload>];

// Menu
type StaffHomeMenuPayload = {
  [StaffHomeActionEnum.SetMenu]: StaffHomeMenu;
  [StaffHomeActionEnum.SetMenuData]: {
    link: string;
    icon: string;
    name: string;
  }[];
};

export type StaffHomeMenuActions =
  ActionMap<StaffHomeMenuPayload>[keyof ActionMap<StaffHomeMenuPayload>];

// Outlet
type StaffHomeOutletPayload = {
  [StaffHomeActionEnum.SetOutletData]: StaffHomeOutlet;
};

export type StaffHomeOutletActions =
  ActionMap<StaffHomeOutletPayload>[keyof ActionMap<StaffHomeOutletPayload>];
