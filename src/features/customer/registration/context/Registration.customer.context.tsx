import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerRegistrationActions,
  CustomerRegistrationInitialStateType,
} from "./Registration.customer.types";
import {
  CustomerRegistrationRequiredInformationReducer,
  CustomerRegistrationGlobalReducer,
  CustomerRegistrationAdditionalInformationReducer,
  CustomerRegistrationQuestionnaireReducer,
  CustomerRegistrationAgreementReducer,
} from "./Registration.customer.reducers";

const initialState: CustomerRegistrationInitialStateType = {
  global: {
    state: "required",
    // state: "additional",
    // state: "questionnaire",
    // state: "agreement",

    profile_picture: {
      value: "",
      new_value: "",
    },
  },
  // Required Information
  required_information: {
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

    otp: {
      value: "",
      verified: undefined,
      feature: {
        is_open: false,
      },
    },
  },
  additional_information: {
    email: {
      value: "",
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
  },

  questionnaire: {
    gender: undefined,
    // gender: "Male",
    window: {
      active: 1,
      limit: 3,
    },
    answers: {},
  },
  agreement: {
    questionnaire: {
      answers: {},
    },
  },
};

const CustomerRegistrationContext = createContext<{
  state: CustomerRegistrationInitialStateType;
  dispatch: Dispatch<CustomerRegistrationActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    global,
    required_information,
    additional_information,
    questionnaire,
    agreement,
  }: CustomerRegistrationInitialStateType,
  action: CustomerRegistrationActions
) => ({
  global: CustomerRegistrationGlobalReducer(global, action),
  required_information: CustomerRegistrationRequiredInformationReducer(
    required_information,
    action
  ),
  additional_information: CustomerRegistrationAdditionalInformationReducer(
    additional_information,
    action
  ),
  questionnaire: CustomerRegistrationQuestionnaireReducer(
    questionnaire,
    action
  ),
  agreement: CustomerRegistrationAgreementReducer(agreement, action),
});

const CustomerRegistrationProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerRegistrationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerRegistrationContext.Provider>
  );
};

export { CustomerRegistrationProvider, CustomerRegistrationContext };
