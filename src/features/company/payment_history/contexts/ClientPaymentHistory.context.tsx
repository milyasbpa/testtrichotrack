import React, { createContext, useReducer, Dispatch } from "react";
import {
  ClientPaymentHistoryActions,
  ClientPaymentHistoryInitialStateType,
} from "./ClientPaymentHistory.types";
import { ClientPaymentHistoryListReducer } from "./ClientPaymentHistory.reducers";

const subtractMonthNumber = (date: Date, number: number): Date => {
  const year = new Date(date).getFullYear();

  const month = new Date(date).getMonth() + 1;
  let newMonth = month - number;
  let newYear = year;
  if (newMonth < 1) {
    newMonth = 12 - Math.abs(1 - newMonth) + 1;
    newYear = year - 1;
  }

  const newDate = new Date(
    `${newYear}-${newMonth < 10 ? `0${newMonth}` : newMonth}-01`
  );
  return newDate;
};

const initialState: ClientPaymentHistoryInitialStateType = {
  list: {
    selected: {
      id: "",
    },
    filter: {
      period: {
        value: {
          start_date: subtractMonthNumber(new Date(), 6),
          end_date: new Date(),
        },
        error: {
          code: "",
          message: "",
        },
        calendar: {
          select_counter: 1,
          is_open: false,
          start_date: subtractMonthNumber(new Date(), 6),
          end_date: new Date(),
          year: new Date(),
        },
      },
    },
    sort: {
      by: "Latest Timestamp",
    },
    data: [
      {
        id: 0,
        timestamp: "Timestamp",
        picture: "",
        tier_name: {
          en: "",
          zh: "",
        },
        receipt: "",
      },
    ],
  },
};

const ClientPaymentHistoryContext = createContext<{
  state: ClientPaymentHistoryInitialStateType;
  dispatch: Dispatch<ClientPaymentHistoryActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { list }: ClientPaymentHistoryInitialStateType,
  action: ClientPaymentHistoryActions
) => ({
  list: ClientPaymentHistoryListReducer(list, action),
});

const ClientPaymentHistoryProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ClientPaymentHistoryContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ClientPaymentHistoryContext.Provider>
  );
};

export { ClientPaymentHistoryProvider, ClientPaymentHistoryContext };
