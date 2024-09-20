import React, { createContext, useReducer, Dispatch } from "react";
import {
  EditOutletActions,
  EditOutletInitialStateType,
} from "./EditOutlet.types";
import { EditOutletFormReducer } from "./EditOutlet.reducers";

const initialState: EditOutletInitialStateType = {
  // Required Information
  form: {
    id: undefined,
    photo_profile: {
      value: "",
    },
    fullname: {
      value: "",
      error: null,
    },

    address: {
      value: "",
    },

    phonenumber: {
      value: "",
    },

    confirmation_modal: {
      open: false,
    },
  },
};

const EditOutletContext = createContext<{
  state: EditOutletInitialStateType;
  dispatch: Dispatch<EditOutletActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { form }: EditOutletInitialStateType,
  action: EditOutletActions
) => ({
  form: EditOutletFormReducer(form, action),
});

const EditOutletProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <EditOutletContext.Provider value={{ state, dispatch }}>
      {props.children}
    </EditOutletContext.Provider>
  );
};

export { EditOutletProvider, EditOutletContext };
