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
export interface OutletListInitialStateType {
  data: IOutletListData;
}

// State Collection Types consist of:

export interface IOutletListData {
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
    address: string;
  }[];

  delete_confirmation_dialog: {
    open: boolean;
  };
}

export enum OutletListActionEnum {
  // staff list
  SetSelectedValue = "SetSelectedValue",
  SetSearchValue = "SetSearchValue",
  SetOutletList = "SetOutletList",
  SetSortByValue = "SetSortByValue",

  SelectOutletToDelete = "SelectOutletToDelete",
  OpenDeleteConfirmationDialog = "OpenDeleteConfirmationDialog",
  CloseDeleteConfirmationDialog = "CloseDeleteConfirmationDialog",
}

// Action Collection Types
export type OutletListActions = OutletListDataActions;

// Action Collection Types consist of:

// Staff
type OutletListDataPayload = {
  [OutletListActionEnum.SetSelectedValue]: number;
  [OutletListActionEnum.SetSearchValue]: string;
  [OutletListActionEnum.SetSortByValue]: string;
  [OutletListActionEnum.SetOutletList]: {
    id: number;
    name: string;
    initial: string;
    registration_time: string;
    photo: string;
    address: string;
  }[];

  [OutletListActionEnum.SelectOutletToDelete]: number;
  [OutletListActionEnum.OpenDeleteConfirmationDialog]: undefined;
  [OutletListActionEnum.CloseDeleteConfirmationDialog]: undefined;
};

export type OutletListDataActions =
  ActionMap<OutletListDataPayload>[keyof ActionMap<OutletListDataPayload>];
