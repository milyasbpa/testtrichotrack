import React, { createContext, useReducer, Dispatch } from "react";
import {
  DashboardStaffActions,
  DashboardStaffInitialStateType,
} from "./Dashboard.staff.types";
import {
  DashboardStaffAvatarReducer,
  DashboardStaffHeaderReducer,
  DashboardStaffMenuReducer,
  DashboardStaffOutletReducer,
} from "./Dashboard.staff.reducers";

const initialState: DashboardStaffInitialStateType = {
  avatar: {
    initial: "",
    photo: "",
  },
  header: {
    name: "",
    clock: "",
    role: "",
  },
  menu: {
    data: [],
  },
  outlet: {
    form: {
      is_open: false,
      items: [],
      selected: null,
    },
  },
};

const DashboardStaffContext = createContext<{
  state: DashboardStaffInitialStateType;
  dispatch: Dispatch<DashboardStaffActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { avatar, header, menu, outlet }: DashboardStaffInitialStateType,
  action: DashboardStaffActions
) => ({
  avatar: DashboardStaffAvatarReducer(avatar, action),
  header: DashboardStaffHeaderReducer(header, action),
  menu: DashboardStaffMenuReducer(menu, action),
  outlet: DashboardStaffOutletReducer(outlet, action),
});

const DashboardStaffProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DashboardStaffContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DashboardStaffContext.Provider>
  );
};

export { DashboardStaffProvider, DashboardStaffContext };
