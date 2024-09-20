import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerIssueActions,
  CustomerIssueInitialStateType,
} from "./Issue.customer.types";
import {
  CustomerIssueOverviewReducer,
  CustomerIssueDetailReducer,
  CustomerIssueRecommendationsReducer,
  CustomerIssueRatingReducer,
  CustomerIssueLevelInfoReducer,
} from "./Issue.customer.reducers";

const initialState: CustomerIssueInitialStateType = {
  overview: {
    data: null,
  },
  detail: {
    id: 0,
    name: "",
    photo: "",
    introduction: {
      name: "",
      description: "",
    },
    prevalence: {
      name: "",
      description: "",
    },
    symptoms: {
      name: "",
      description: "",
    },
    causes: {
      name: "",
      description: "",
    },
    prevention: {
      name: "",
      description: "",
    },
  },
  rating: {
    data: {
      description: "",
      factors: [],
    },
  },
  level_info: {
    selected: null,
    data: null,
  },
  recommendations: {
    issue: "",
    category: "",
    management_tips: {
      name: "",
      description: "",
    },

    stage: {
      value: 0,
    },
    treatment_type: {
      selected: null,
      list: ["Care Plans", "Home Cares"],
    },
    care_plans: [
      {
        id: 1,
        name: "Care Plans",
        description:
          "Lorem ipsum dolor sit amet consectetur. Imperdiet malesuada massa faucibus hac neque sed leo. Erat felis nam odio sed pretium mauris eu proin. ",
        image: "/images/sample-scan.png",
      },
    ],
    home_cares: [
      {
        id: 1,
        name: "Home Cares",
        description:
          "Lorem ipsum dolor sit amet consectetur. Imperdiet malesuada massa faucibus hac neque sed leo. Erat felis nam odio sed pretium mauris eu proin. ",
        image: "",
      },
    ],
  },
};

const CustomerIssueContext = createContext<{
  state: CustomerIssueInitialStateType;
  dispatch: Dispatch<CustomerIssueActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    overview,
    rating,
    level_info,
    detail,
    recommendations,
  }: CustomerIssueInitialStateType,
  action: CustomerIssueActions
) => ({
  overview: CustomerIssueOverviewReducer(overview, action),
  rating: CustomerIssueRatingReducer(rating, action),
  level_info: CustomerIssueLevelInfoReducer(level_info, action),
  detail: CustomerIssueDetailReducer(detail, action),
  recommendations: CustomerIssueRecommendationsReducer(recommendations, action),
});

const CustomerIssueProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerIssueContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerIssueContext.Provider>
  );
};

export { CustomerIssueProvider, CustomerIssueContext };
