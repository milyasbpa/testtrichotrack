import React, { createContext, useReducer, Dispatch } from "react";
import {
  OutletListActions,
  OutletListInitialStateType,
} from "./OutletList.types";
import { OutletListDataReducer } from "./OutletList.reducers";

const initialState: OutletListInitialStateType = {
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

    delete_confirmation_dialog: {
      open: false,
    },
  },
};

const OutletListContext = createContext<{
  state: OutletListInitialStateType;
  dispatch: Dispatch<OutletListActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { data }: OutletListInitialStateType,
  action: OutletListActions
) => ({
  data: OutletListDataReducer(data, action),
});

const OutletListProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <OutletListContext.Provider value={{ state, dispatch }}>
      {props.children}
    </OutletListContext.Provider>
  );
};

export { OutletListProvider, OutletListContext };
