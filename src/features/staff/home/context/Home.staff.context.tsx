import React, { createContext, useReducer, Dispatch } from "react";
import {
  StaffHomeActions,
  StaffHomeInitialStateType,
} from "./Home.staff.types";
import {
  StaffHomeAvatarReducer,
  StaffHomeHeaderReducer,
  StaffHomeMenuReducer,
  StaffHomeOutletReducer,
} from "./Home.staff.reducers";

const initialState: StaffHomeInitialStateType = {
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

const StaffHomeContext = createContext<{
  state: StaffHomeInitialStateType;
  dispatch: Dispatch<StaffHomeActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { avatar, header, menu, outlet }: StaffHomeInitialStateType,
  action: StaffHomeActions
) => ({
  avatar: StaffHomeAvatarReducer(avatar, action),
  header: StaffHomeHeaderReducer(header, action),
  menu: StaffHomeMenuReducer(menu, action),
  outlet: StaffHomeOutletReducer(outlet, action),
});

const StaffHomeProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <StaffHomeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StaffHomeContext.Provider>
  );
};

export { StaffHomeProvider, StaffHomeContext };
