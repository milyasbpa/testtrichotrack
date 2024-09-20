import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerRecordActions,
  CustomerRecordInitialStateType,
} from "./Record.customer.types";
import {
  CustomerRecordTimelineReducer,
  CustomerRecordRoutineReducer,
  CustomerRecordSpotlightReducer,
  CustomerRecordGlobalReducer,
  CustomerRecordComparisonReducer,
  CustomerRecordTypeReducer,
} from "./Record.customer.reducers";

const initialState: CustomerRecordInitialStateType = {
  type: {
    selected: null,
  },
  comparison: {
    data: [],
  },
  timeline: {
    skip: 0,
    data: [],
  },
  global: {
    scan: [],
  },
  routine: {
    scan: [],
    // scan: [
    //   {
    //     date: "",
    //     svc_time: "",
    //     region: "Left Pariental",
    //     // image: "/images/sample-scan.png",
    //     image: "",
    //     icon: "/icons/face_area/face-area-1.icon.svg",
    //     id: -1,
    //   },
    //   {
    //     date: "",
    //     svc_time: "",
    //     region: "Left Pariental",
    //     // image: "/images/sample-scan.png",
    //     image: "",
    //     icon: "/icons/face_area/face-area-1.icon.svg",
    //     id: -2,
    //   },
    //   {
    //     date: "",
    //     svc_time: "",
    //     region: "Left Pariental",
    //     // image: "/images/sample-scan.png",
    //     image: "",
    //     icon: "/icons/face_area/face-area-1.icon.svg",
    //     id: -3,
    //   },
    //   {
    //     date: "",
    //     svc_time: "",
    //     region: "Left Pariental",
    //     // image: "/images/sample-scan.png",
    //     image: "",
    //     icon: "/icons/face_area/face-area-1.icon.svg",
    //     id: -4,
    //   },
    // ],
  },
  spotlight: {
    scan: [],
    // scan: [
    //   {
    //     date: "",
    //     svc_time: "",
    //     region: "Left Pariental",
    //     // image: "/images/sample-scan.png",
    //     image: "",
    //     icon: "/icons/face_area/face-area-1.icon.svg",
    //     id: -1,
    //   },
    // ],
  },
};

const CustomerRecordContext = createContext<{
  state: CustomerRecordInitialStateType;
  dispatch: Dispatch<CustomerRecordActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    type,
    comparison,
    timeline,
    global,
    routine,
    spotlight,
  }: CustomerRecordInitialStateType,
  action: CustomerRecordActions
) => ({
  type: CustomerRecordTypeReducer(type, action),
  comparison: CustomerRecordComparisonReducer(comparison, action),
  timeline: CustomerRecordTimelineReducer(timeline, action),
  global: CustomerRecordGlobalReducer(global, action),
  routine: CustomerRecordRoutineReducer(routine, action),
  spotlight: CustomerRecordSpotlightReducer(spotlight, action),
});

const CustomerRecordProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerRecordContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerRecordContext.Provider>
  );
};

export { CustomerRecordProvider, CustomerRecordContext };
