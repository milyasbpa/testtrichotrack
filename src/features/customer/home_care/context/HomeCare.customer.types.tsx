type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface CustomerHomeCareInitialStateType {
  treatment: CustomerHomeCareTreatment;
  products: CustomerHomeCareProducts;
  ingredient: CustomerHomeCareIngredient;
  instruction: CustomerHomeCareInstruction;
}

// State Collection Types consist of:

export interface CustomerHomeCareTreatment {
  id: number;
  name: string;
  image: string;
  description: string;
}
export interface CustomerHomeCareProducts {
  data: {
    name: string;
    image: string;
    description: string;
  }[];
}

export interface CustomerHomeCareIngredient {
  tab: {
    selected: number;
    list: string[];
  };
  items: {
    description: string;
    image: string;
  }[];
}

export interface CustomerHomeCareInstruction {
  tab: {
    selected: number;
    list: string[];
  };
  items: {
    description: string;
    image: string;
  }[];
}

export enum CustomerHomeCareActionEnum {
  // treatment
  SetTreatmentValue = "SetTreatmentValue",
  SetTreatmentID = "SetTreatmentID",
  // product
  SetProductsValue = "SetProductsValue",
  SetProductsData = "SetProductsData",
  // ingredient
  SetIngredientValue = "SetIngredientValue",
  SelectIngredientTab = "SelectIngredientTab",
  // instruction
  SetInstructionValue = "SetInstructionValue",
  SelectInstructionTab = "SelectInstructionTab",
}

// Action Collection Types
export type CustomerHomeCareActions =
  | CustomerHomeCareTreatmentActions
  | CustomerHomeCareProductsActions
  | CustomerHomeCareIngredientActions
  | CustomerHomeCareInstructionActions;

// Action Collection Types consist of:

// treatment
type CustomerHomeCareTreatmentPayload = {
  [CustomerHomeCareActionEnum.SetTreatmentValue]: CustomerHomeCareTreatment;
  [CustomerHomeCareActionEnum.SetTreatmentID]: number;
};

export type CustomerHomeCareTreatmentActions =
  ActionMap<CustomerHomeCareTreatmentPayload>[keyof ActionMap<CustomerHomeCareTreatmentPayload>];

// Product
type CustomerHomeCareProductsPayload = {
  [CustomerHomeCareActionEnum.SetProductsValue]: CustomerHomeCareProducts;
  [CustomerHomeCareActionEnum.SetProductsData]: {
    name: string;
    image: string;
    description: string;
  }[];
};

export type CustomerHomeCareProductsActions =
  ActionMap<CustomerHomeCareProductsPayload>[keyof ActionMap<CustomerHomeCareProductsPayload>];

// Ingredient
type CustomerHomeCareIngredientPayload = {
  [CustomerHomeCareActionEnum.SetIngredientValue]: CustomerHomeCareIngredient;
  [CustomerHomeCareActionEnum.SelectIngredientTab]: number;
};

export type CustomerHomeCareIngredientActions =
  ActionMap<CustomerHomeCareIngredientPayload>[keyof ActionMap<CustomerHomeCareIngredientPayload>];

// Instruction
type CustomerHomeCareInstructionPayload = {
  [CustomerHomeCareActionEnum.SetInstructionValue]: CustomerHomeCareInstruction;
  [CustomerHomeCareActionEnum.SelectInstructionTab]: number;
};

export type CustomerHomeCareInstructionActions =
  ActionMap<CustomerHomeCareInstructionPayload>[keyof ActionMap<CustomerHomeCareInstructionPayload>];
