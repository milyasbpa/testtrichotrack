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
export interface CustomerListInitialStateType {
  customers: CustomerListCustomers;
}

// State Collection Types consist of:

export interface CustomerListCustomers {
  selected: {
    id: string;
  };
  search: {
    value: string;
  };
  sort: {
    by: string;
  };
  list: {
    id: string;
    name: string;
    initial: string;
    registration_time: string;
    photo: string;
    mobile: string;
  }[];
}

export enum CustomerListActionEnum {
  // customer list
  SetCustomersData = "SetCustomersData",
  SetSelectedValue = "SetSelectedValue",
  SetSearchValue = "SetSearchValue",
  SetCustomerList = "SetCustomerList",
  SetSortByValue = "SetSortByValue",
}

// Action Collection Types
export type CustomerListActions = CustomerListHeaderActions;

// Action Collection Types consist of:

// Customers
type CustomerListHeaderPayload = {
  [CustomerListActionEnum.SetCustomersData]: CustomerListCustomers;
  [CustomerListActionEnum.SetSelectedValue]: string;
  [CustomerListActionEnum.SetSearchValue]: string;
  [CustomerListActionEnum.SetSortByValue]: string;
  [CustomerListActionEnum.SetCustomerList]: {
    id: string;
    name: string;
    initial: string;
    registration_time: string;
    photo: string;
    mobile: string;
  }[];
};

export type CustomerListHeaderActions =
  ActionMap<CustomerListHeaderPayload>[keyof ActionMap<CustomerListHeaderPayload>];
