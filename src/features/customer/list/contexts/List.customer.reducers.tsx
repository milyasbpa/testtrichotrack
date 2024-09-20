import {
  CustomerListCustomers,
  CustomerListActionEnum,
  CustomerListActions,
} from "./List.customer.types";

// Customers
export const CustomerListCustomersReducer = (
  state: CustomerListCustomers,
  action: CustomerListActions
) => {
  switch (action.type) {
    case CustomerListActionEnum.SetCustomersData: {
      return action.payload;
    }
    case CustomerListActionEnum.SetSelectedValue:
      return {
        ...state,
        selected: {
          ...state.selected,
          id: action.payload,
        },
      };
    case CustomerListActionEnum.SetSearchValue:
      return {
        ...state,
        search: {
          ...state.search,
          value: action.payload,
        },
      };
    case CustomerListActionEnum.SetSortByValue:
      return {
        ...state,
        sort: {
          ...state.sort,
          by: action.payload,
        },
      };

    case CustomerListActionEnum.SetCustomerList:
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
};
