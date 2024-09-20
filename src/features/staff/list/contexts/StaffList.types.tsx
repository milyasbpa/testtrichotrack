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
export interface StaffListInitialStateType {
  data: StaffListData;
}

// State Collection Types consist of:

export interface StaffListData {
  selected: {
    id: number;
  };
  search: {
    value: string;
  };
  sort: {
    by: string;
  };
  list: {
    id: number;
    name: string;
    initial: string;
    registration_time: string;
    photo: string;
    position: string;
    outlet: string;
  }[];
  outlets: {
    selected: {
      id: string;
      name: string;
    } | null;
    data: { id: string; name: string }[];
  };
  permissions: {
    selected: {
      id: string;
      name: string;
    } | null;
    data: { id: string; name: string }[];
  };
  delete_confirmation_dialog: {
    open: boolean;
  };
}

export enum StaffListActionEnum {
  // staff data
  SetData = "SetData",
  SetSelectedValue = "SetSelectedValue",
  SetSearchValue = "SetSearchValue",
  SetStaffList = "SetStaffList",
  SetSortByValue = "SetSortByValue",
  SetOutletsData = "SetOutletsData",
  FilterByOutlet = "FilterByOutlet",
  SetPermissionsData = "SetPermissionsData",
  FilterByPermission = "FilterByPermission",
  SelectStaffToDelete = "SelectStaffToDelete",
  OpenDeleteConfirmationDialog = "OpenDeleteConfirmationDialog",
  CloseDeleteConfirmationDialog = "CloseDeleteConfirmationDialog",
}

// Action Collection Types
export type StaffListActions = StaffListDataActions;

// Action Collection Types consist of:

// Staff
type StaffListDataPayload = {
  [StaffListActionEnum.SetData]: StaffListData;
  [StaffListActionEnum.SetSelectedValue]: number;
  [StaffListActionEnum.SetSearchValue]: string;
  [StaffListActionEnum.SetSortByValue]: string;
  [StaffListActionEnum.SetStaffList]: {
    id: number;
    name: string;
    initial: string;
    registration_time: string;
    photo: string;
    position: string;
    outlet: string;
  }[];
  [StaffListActionEnum.SetOutletsData]: {
    id: string;
    name: string;
  }[];
  [StaffListActionEnum.FilterByOutlet]: {
    id: string;
    name: string;
  };
  [StaffListActionEnum.SetPermissionsData]: {
    id: string;
    name: string;
  }[];
  [StaffListActionEnum.FilterByPermission]: {
    id: string;
    name: string;
  };
  [StaffListActionEnum.SelectStaffToDelete]: number;
  [StaffListActionEnum.OpenDeleteConfirmationDialog]: undefined;
  [StaffListActionEnum.CloseDeleteConfirmationDialog]: undefined;
};

export type StaffListDataActions =
  ActionMap<StaffListDataPayload>[keyof ActionMap<StaffListDataPayload>];
