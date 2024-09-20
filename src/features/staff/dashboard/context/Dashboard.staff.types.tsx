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
export interface DashboardStaffInitialStateType {
  avatar: DashboardStaffAvatar;
  header: DashboardStaffHeader;
  menu: DashboardStaffMenu;
  outlet: DashboardStaffOutlet;
}

export interface DashboardStaffAvatar {
  initial: string;
  photo: string;
}

export interface DashboardStaffHeader {
  name: string;
  clock: string;
  role: string;
}

export interface DashboardStaffMenu {
  data: {
    link: string;
    icon: string;
    name: string;
  }[];
}

export interface DashboardStaffOutlet {
  form: {
    is_open: boolean;
    items: {
      id: string;
      name: string;
    }[];
    selected: null | { id: string; name: string };
  };
}

export enum DashboardStaffActionEnum {
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
export type DashboardStaffActions =
  | DashboardStaffAvatarActions
  | DashboardStaffHeaderActions
  | DashboardStaffMenuActions
  | DashboardStaffOutletActions;

// Action Collection Types consist of:

// Avatar
type DashboardStaffAvatarPayload = {
  [DashboardStaffActionEnum.SetAvatarData]: {
    initial: string;
    photo: string;
  };
};

export type DashboardStaffAvatarActions =
  ActionMap<DashboardStaffAvatarPayload>[keyof ActionMap<DashboardStaffAvatarPayload>];

// Header
type DashboardStaffHeaderPayload = {
  [DashboardStaffActionEnum.SetHeaderData]: DashboardStaffHeader;
  [DashboardStaffActionEnum.SetHeaderGreeting]: string;
  [DashboardStaffActionEnum.SetHeaderClock]: string;
};

export type DashboardStaffHeaderActions =
  ActionMap<DashboardStaffHeaderPayload>[keyof ActionMap<DashboardStaffHeaderPayload>];

// Menu
type DashboardStaffMenuPayload = {
  [DashboardStaffActionEnum.SetMenu]: DashboardStaffMenu;
  [DashboardStaffActionEnum.SetMenuData]: {
    link: string;
    icon: string;
    name: string;
  }[];
};

export type DashboardStaffMenuActions =
  ActionMap<DashboardStaffMenuPayload>[keyof ActionMap<DashboardStaffMenuPayload>];

// Outlet
type DashboardStaffOutletPayload = {
  [DashboardStaffActionEnum.SetOutletData]: DashboardStaffOutlet;
};

export type DashboardStaffOutletActions =
  ActionMap<DashboardStaffOutletPayload>[keyof ActionMap<DashboardStaffOutletPayload>];
