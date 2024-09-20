import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerHomeActions,
  CustomerHomeInitialStateType,
} from "./Home.customer.types";
import {
  CustomerHomeAvatarReducer,
  CustomerHomeHeaderReducer,
  CustomerHomeMenuReducer,
  CustomerHomeOutletReducer,
} from "./Home.customer.reducers";

const initialState: CustomerHomeInitialStateType = {
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

const CustomerHomeContext = createContext<{
  state: CustomerHomeInitialStateType;
  dispatch: Dispatch<CustomerHomeActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { avatar, header, menu, outlet }: CustomerHomeInitialStateType,
  action: CustomerHomeActions
) => ({
  avatar: CustomerHomeAvatarReducer(avatar, action),
  header: CustomerHomeHeaderReducer(header, action),
  menu: CustomerHomeMenuReducer(menu, action),
  outlet: CustomerHomeOutletReducer(outlet, action),
});

const CustomerHomeProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerHomeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerHomeContext.Provider>
  );
};

export { CustomerHomeProvider, CustomerHomeContext };
