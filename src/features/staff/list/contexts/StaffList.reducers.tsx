import {
  StaffListData,
  StaffListActionEnum,
  StaffListActions,
} from "./StaffList.types";

// data
export const StaffListDataReducer = (
  state: StaffListData,
  action: StaffListActions
) => {
  switch (action.type) {
    case StaffListActionEnum.SetData:
      return action.payload;
    case StaffListActionEnum.SetSelectedValue:
      return {
        ...state,
        selected: {
          ...state.selected,
          id: action.payload,
        },
      };
    case StaffListActionEnum.SetSearchValue:
      return {
        ...state,
        search: {
          ...state.search,
          value: action.payload,
        },
      };
    case StaffListActionEnum.SetSortByValue:
      return {
        ...state,
        sort: {
          ...state.sort,
          by: action.payload,
        },
      };

    case StaffListActionEnum.SetStaffList:
      return {
        ...state,
        list: action.payload,
      };
    case StaffListActionEnum.SetOutletsData:
      return {
        ...state,
        outlets: {
          ...state.outlets,
          data: action.payload,
        },
      };
    case StaffListActionEnum.FilterByOutlet:
      return {
        ...state,
        outlets: {
          ...state.outlets,
          selected: action.payload,
        },
      };
    case StaffListActionEnum.SetPermissionsData:
      return {
        ...state,
        permissions: {
          ...state.permissions,
          data: action.payload,
        },
      };
    case StaffListActionEnum.FilterByPermission:
      return {
        ...state,
        permissions: {
          ...state.permissions,
          selected: action.payload,
        },
      };
    case StaffListActionEnum.SelectStaffToDelete:
      return {
        ...state,
        selected: {
          ...state.selected,
          id: action.payload,
        },
        delete_confirmation_dialog: {
          ...state.delete_confirmation_dialog,
          open: true,
        },
      };
    case StaffListActionEnum.OpenDeleteConfirmationDialog:
      return {
        ...state,
        delete_confirmation_dialog: {
          ...state.delete_confirmation_dialog,
          open: true,
        },
      };
    case StaffListActionEnum.CloseDeleteConfirmationDialog:
      return {
        ...state,
        delete_confirmation_dialog: {
          ...state.delete_confirmation_dialog,
          open: false,
        },
      };

    default:
      return state;
  }
};
