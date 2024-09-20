import React, { createContext, useReducer, Dispatch } from "react";
import {
  ClientTopupActions,
  ClientTopupInitialStateType,
} from "./ClientTopup.types";
import { ClientTopupTierReducer } from "./ClientTopup.reducers";

const initialState: ClientTopupInitialStateType = {
  tier: {
    active: {
      index: 0,
    },
    current: {
      id: null,
      type: null,
    },
    // items: Array.from({ length: 6 }, (_, i) => {
    //   return {
    //     id: null,
    //     name: {
    //       en: "",
    //       zh: "",
    //     },
    //     duration: null,
    //     min_price: null,
    //     max_price: null,
    //     currency: "",
    //     member: {
    //       outlet: null,
    //       staff: null,
    //       customer: null,
    //     },
    //     active: i === 1 ? true : false,
    //     intro: {
    //       en: "",
    //       zh: "",
    //     },
    //     terms: {
    //       en: "",
    //       zh: "",
    //     },
    //   };
    // }),
    items: [],
  },
};

const ClientTopupContext = createContext<{
  state: ClientTopupInitialStateType;
  dispatch: Dispatch<ClientTopupActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { tier }: ClientTopupInitialStateType,
  action: ClientTopupActions
) => ({
  tier: ClientTopupTierReducer(tier, action),
});

const ClientTopupProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ClientTopupContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ClientTopupContext.Provider>
  );
};

export { ClientTopupProvider, ClientTopupContext };
