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
export interface ClientTopupInitialStateType {
  tier: IClientTopupTier;
}

// State Collection Types consist of:
export interface IClientTopupTier {
  active: {
    index: number;
  };
  current: {
    id: number | null;
    type: "credit" | "subscription" | null;
  };

  items: {
    id: null | number;
    name: {
      [key: string]: string;
    };
    duration: null | number;
    min_price: null | number;
    max_price: null | number;
    currency: string;
    member: {
      outlet: null | number;
      staff: null | number;
      customer: null | number;
    };
    intro: {
      [key: string]: string;
    };
    terms: {
      [key: string]: string;
    };
  }[];
}

export enum ClientTopupActionEnum {
  // tier
  SetTierData = "SetTierData",
  SetTierActive = "SetTierActive",
  SetTierCurrent = "SetTierCurrent",

  SetTierItems = "SetTierItems",
}

// Action Collection Types
export type ClientTopupActions = ClientTopupTierActions;

// Action Collection Types consist of:
// case
type ClientTopupTierPayload = {
  [ClientTopupActionEnum.SetTierData]: IClientTopupTier;
  [ClientTopupActionEnum.SetTierActive]: IClientTopupTier["active"];
  [ClientTopupActionEnum.SetTierCurrent]: IClientTopupTier["current"];
  [ClientTopupActionEnum.SetTierItems]: IClientTopupTier["items"];
};

export type ClientTopupTierActions =
  ActionMap<ClientTopupTierPayload>[keyof ActionMap<ClientTopupTierPayload>];
