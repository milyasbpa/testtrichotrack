import React, { createContext, useReducer, Dispatch } from "react";
import { StaffListActions, StaffListInitialStateType } from "./StaffList.types";
import { StaffListDataReducer } from "./StaffList.reducers";

const initialState: StaffListInitialStateType = {
  data: {
    selected: {
      id: -1,
    },
    search: {
      value: "",
    },
    sort: {
      by: "Registration Descending",
    },
    list: [],
    outlets: {
      selected: null,
      data: [],
    },
    permissions: {
      selected: null,
      data: [
        {
          id: "-1",
          name: "All Permissions",
        },
        {
          id: "0",
          name: "Manager",
        },
        {
          id: "1",
          name: "Employee",
        },
      ],
    },
    delete_confirmation_dialog: {
      open: false,
    },
  },
};

const StaffListContext = createContext<{
  state: StaffListInitialStateType;
  dispatch: Dispatch<StaffListActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { data }: StaffListInitialStateType,
  action: StaffListActions
) => ({
  data: StaffListDataReducer(data, action),
});

const StaffListProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <StaffListContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StaffListContext.Provider>
  );
};

export { StaffListProvider, StaffListContext };
