import {
  CustomerHomeCareActionEnum,
  CustomerHomeCareActions,
  CustomerHomeCareIngredient,
  CustomerHomeCareInstruction,
  CustomerHomeCareProducts,
  CustomerHomeCareTreatment,
} from "./HomeCare.customer.types";

// treatment
export const CustomerHomeCareTreatmentReducer = (
  state: CustomerHomeCareTreatment,
  action: CustomerHomeCareActions
) => {
  switch (action.type) {
    case CustomerHomeCareActionEnum.SetTreatmentValue:
      return action.payload;
    case CustomerHomeCareActionEnum.SetTreatmentID:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};

// product
export const CustomerHomeCareProductsReducer = (
  state: CustomerHomeCareProducts,
  action: CustomerHomeCareActions
) => {
  switch (action.type) {
    case CustomerHomeCareActionEnum.SetProductsValue:
      return action.payload;
    case CustomerHomeCareActionEnum.SetProductsData:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

// Ingredient
export const CustomerHomeCareIngredientReducer = (
  state: CustomerHomeCareIngredient,
  action: CustomerHomeCareActions
) => {
  switch (action.type) {
    case CustomerHomeCareActionEnum.SetIngredientValue:
      return action.payload;

    case CustomerHomeCareActionEnum.SelectIngredientTab: {
      return {
        ...state,
        tab: {
          ...state.tab,
          selected: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

// Instruction
export const CustomerHomeCareInstructionReducer = (
  state: CustomerHomeCareInstruction,
  action: CustomerHomeCareActions
) => {
  switch (action.type) {
    case CustomerHomeCareActionEnum.SetInstructionValue:
      return action.payload;
    case CustomerHomeCareActionEnum.SelectInstructionTab: {
      return {
        ...state,
        tab: {
          ...state.tab,
          selected: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
