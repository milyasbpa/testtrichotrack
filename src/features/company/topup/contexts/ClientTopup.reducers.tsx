import {
  ClientTopupActionEnum,
  ClientTopupActions,
  IClientTopupTier,
} from "./ClientTopup.types";

// Tier
export const ClientTopupTierReducer = (
  state: IClientTopupTier,
  action: ClientTopupActions
) => {
  switch (action.type) {
    case ClientTopupActionEnum.SetTierData:
      return action.payload;
    case ClientTopupActionEnum.SetTierActive:
      return {
        ...state,
        active: action.payload,
      };
    case ClientTopupActionEnum.SetTierCurrent:
      return {
        ...state,
        current: action.payload,
      };
    case ClientTopupActionEnum.SetTierItems:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};
