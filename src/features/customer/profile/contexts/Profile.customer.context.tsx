import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerProfileActions,
  CustomerProfileInitialStateType,
} from "./Profile.customer.types";
import {
  CustomerProfileGlobalReducer,
  CustomerProfilePersonalDataReducer,
} from "./Profile.customer.reducers";

const initialState: CustomerProfileInitialStateType = {
  global: {
    state: "personal-data",
    profile_picture: {
      value: "",
      new_value: "",
    },
  },
  personal_data: {
    fullname: {
      value: "",
    },

    date_of_birth: {
      value: "",
    },

    race: {
      value: null,
    },

    gender: {
      value: null,
    },

    phonenumber: {
      value: "",
    },

    email: {
      value: "",
    },

    otp: {
      value: "",
      verified: true,
      feature: {
        is_open: false,
      },
    },

    profession: {
      value: "",
    },

    citizenship: {
      value: null,
    },

    marital_status: {
      value: null,
    },
    address: {
      value: "",
    },
    nric: {
      value: "",
    },

    marketing_promotion: {
      value: false,
    },
  },
};

const CustomerProfileContext = createContext<{
  state: CustomerProfileInitialStateType;
  dispatch: Dispatch<CustomerProfileActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { global, personal_data }: CustomerProfileInitialStateType,
  action: CustomerProfileActions
) => ({
  global: CustomerProfileGlobalReducer(global, action),
  personal_data: CustomerProfilePersonalDataReducer(personal_data, action),
});

const CustomerProfileProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerProfileContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerProfileContext.Provider>
  );
};

export { CustomerProfileProvider, CustomerProfileContext };
