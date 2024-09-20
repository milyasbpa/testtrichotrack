import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerHomeCareActions,
  CustomerHomeCareInitialStateType,
} from "./HomeCare.customer.types";
import {
  CustomerHomeCareProductsReducer,
  CustomerHomeCareIngredientReducer,
  CustomerHomeCareInstructionReducer,
  CustomerHomeCareTreatmentReducer,
} from "./HomeCare.customer.reducers";

const initialState: CustomerHomeCareInitialStateType = {
  treatment: {
    id: -1,
    name: "",
    description: "",
    image: "",
  },
  products: {
    data: [],
  },
  ingredient: {
    tab: {
      selected: 0,
      list: [],
      // list: ["Herbal Extract", "Hydrolyzed Lupine Protein"],
    },
    items: [
      {
        description:
          "Lorem ipsum dolor sit amet consectetur. Imperdiet malesuada massa faucibus hac neque sed leo. Erat felis nam odio sed pretium mauris eu proin. ",
        image: "",
      },
    ],
  },
  instruction: {
    tab: {
      selected: 0,
      list: [],
    },
    items: [
      {
        description:
          "Lorem ipsum dolor sit amet consectetur. Imperdiet malesuada massa faucibus hac neque sed leo. Erat felis nam odio sed pretium mauris eu proin. ",
        image: "",
      },
    ],
  },
};

const CustomerHomeCareContext = createContext<{
  state: CustomerHomeCareInitialStateType;
  dispatch: Dispatch<CustomerHomeCareActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    treatment,
    products,
    ingredient,
    instruction,
  }: CustomerHomeCareInitialStateType,
  action: CustomerHomeCareActions
) => ({
  treatment: CustomerHomeCareTreatmentReducer(treatment, action),
  products: CustomerHomeCareProductsReducer(products, action),
  ingredient: CustomerHomeCareIngredientReducer(ingredient, action),
  instruction: CustomerHomeCareInstructionReducer(instruction, action),
});

const CustomerHomeCareProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerHomeCareContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerHomeCareContext.Provider>
  );
};

export { CustomerHomeCareProvider, CustomerHomeCareContext };
