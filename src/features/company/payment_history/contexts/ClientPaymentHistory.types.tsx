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
export interface ClientPaymentHistoryInitialStateType {
  list: IClientPaymentHistoryList;
}

// State Collection Types consist of:
export interface IClientPaymentHistoryList {
  selected: {
    id: string;
  };
  filter: {
    period: {
      value: {
        start_date: Date | null;
        end_date: Date | null;
      };
      error: {
        code: string;
        message: string;
      };
      calendar: {
        is_open: boolean;
        year: Date;
        select_counter: number;
        start_date: Date | null;
        end_date: Date | null;
      };
    };
  };
  sort: {
    by: string;
  };
  data: {
    id: null | number;
    timestamp: string;
    picture: string;
    tier_name: {
      [key: string]: string;
    };
    receipt: string;
  }[];
}

export enum ClientPaymentHistoryActionEnum {
  // list
  SetList = "SetList",
  SetListData = "SetListData",

  SetListFilterPeriodIsOpen = "SetListFilterPeriodIsOpen",
  SetListFilterPeriodValue = "SetListFilterPeriodValue",
  SetListFilterPeriodError = "SetListFilterPeriodError",
  SetListFilterPeriodStartDate = "SetListFilterStartDate",
  SetListFilterPeriodEndDate = "SetListFilterEndDate",
  SetListFilterPeriodYear = "SetListFilterPeriodYear",
  SetListFilterPeriodSelectCounter = "SetListFilterPeriodSelectCounter",

  SetListSortBy = "SetListSortBy",
}

// Action Collection Types
export type ClientPaymentHistoryActions = ClientPaymentHistoryListActions;

// Action Collection Types consist of:

// list
type ClientPaymentHistoryListPayload = {
  [ClientPaymentHistoryActionEnum.SetList]: IClientPaymentHistoryList;
  [ClientPaymentHistoryActionEnum.SetListData]: IClientPaymentHistoryList["data"];
  [ClientPaymentHistoryActionEnum.SetListFilterPeriodIsOpen]: boolean;
  [ClientPaymentHistoryActionEnum.SetListFilterPeriodValue]: undefined;
  [ClientPaymentHistoryActionEnum.SetListFilterPeriodError]: IClientPaymentHistoryList["filter"]["period"]["error"];
  [ClientPaymentHistoryActionEnum.SetListFilterPeriodStartDate]: Date | null;
  [ClientPaymentHistoryActionEnum.SetListFilterPeriodEndDate]: Date | null;
  [ClientPaymentHistoryActionEnum.SetListFilterPeriodYear]: Date;
  [ClientPaymentHistoryActionEnum.SetListFilterPeriodSelectCounter]: number;

  [ClientPaymentHistoryActionEnum.SetListSortBy]: IClientPaymentHistoryList["sort"]["by"];
};

export type ClientPaymentHistoryListActions =
  ActionMap<ClientPaymentHistoryListPayload>[keyof ActionMap<ClientPaymentHistoryListPayload>];
