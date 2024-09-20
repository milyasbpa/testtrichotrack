import {
  IOutletListData,
  OutletListActionEnum,
  OutletListActions,
} from "./OutletList.types";

// data
export const OutletListDataReducer = (
  state: IOutletListData,
  action: OutletListActions
) => {
  switch (action.type) {
    case OutletListActionEnum.SetSelectedValue:
      return {
        ...state,
        selected: {
          ...state.selected,
          id: action.payload,
        },
      };
    case OutletListActionEnum.SetSearchValue:
      return {
        ...state,
        search: {
          ...state.search,
          value: action.payload,
        },
      };
    case OutletListActionEnum.SetSortByValue:
      return {
        ...state,
        sort: {
          ...state.sort,
          by: action.payload,
        },
      };

    case OutletListActionEnum.SetOutletList:
      return {
        ...state,
        list: action.payload,
      };

    case OutletListActionEnum.SelectOutletToDelete:
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
    case OutletListActionEnum.OpenDeleteConfirmationDialog:
      return {
        ...state,
        delete_confirmation_dialog: {
          ...state.delete_confirmation_dialog,
          open: true,
        },
      };
    case OutletListActionEnum.CloseDeleteConfirmationDialog:
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
