import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerInactiveActions,
  CustomerInactiveInitialStateType,
} from "./CustomerInactive.types";
import {
  CustomerInactiveAgeReducer,
  CustomerInactiveGenderReducer,
  CustomerInactiveRaceReducer,
  CustomerInactiveRatingReducer,
  CustomerInactiveSectionReducer,
  CustomerInactiveThresholdReducer,
} from "./CustomerInactive.reducers";

const initialState: CustomerInactiveInitialStateType = {
  rating: {
    filter: {
      start_age: {
        selected: null,
      },
      end_age: {
        selected: null,
      },
      gender: {
        selected: null,
      },
      race: {
        selected: null,
      },
      resolution: {
        selected: null,
      },
    },

    chart: {},
  },
  threshold: {
    visit_number: {
      selected: null,
    },
  },
  section: {
    tab: {
      selected: null,
    },
  },
  gender: {
    labels: [],
    data: [],
  },
  race: {
    labels: [],
    data: [],
  },
  age: {
    raw_data: [],
    start_age: {
      selected: null,
    },
    end_age: {
      selected: null,
    },
    resolution: {
      selected: null,
    },
    gender: {
      selected: null,
    },
    available_slot: 0,
    labels: [],
    data: [],
  },
};

const CustomerInactiveContext = createContext<{
  state: CustomerInactiveInitialStateType;
  dispatch: Dispatch<CustomerInactiveActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    threshold,
    section,
    rating,
    gender,
    race,
    age,
  }: CustomerInactiveInitialStateType,
  action: CustomerInactiveActions
) => ({
  section: CustomerInactiveSectionReducer(section, action),
  threshold: CustomerInactiveThresholdReducer(threshold, action),
  rating: CustomerInactiveRatingReducer(rating, action),
  gender: CustomerInactiveGenderReducer(gender, action),
  race: CustomerInactiveRaceReducer(race, action),
  age: CustomerInactiveAgeReducer(age, action),
});

const CustomerInactiveProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerInactiveContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerInactiveContext.Provider>
  );
};

export { CustomerInactiveProvider, CustomerInactiveContext };
