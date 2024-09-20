import {
  ClientPaymentHistoryActionEnum,
  ClientPaymentHistoryActions,
  IClientPaymentHistoryList,
} from "./ClientPaymentHistory.types";

// cases
export const ClientPaymentHistoryListReducer = (
  state: IClientPaymentHistoryList,
  action: ClientPaymentHistoryActions
) => {
  switch (action.type) {
    case ClientPaymentHistoryActionEnum.SetList:
      return action.payload;

    case ClientPaymentHistoryActionEnum.SetListData:
      return {
        ...state,
        data: action.payload,
      };

    case ClientPaymentHistoryActionEnum.SetListFilterPeriodValue: {
      return {
        ...state,
        filter: {
          ...state.filter,
          period: {
            ...state.filter.period,
            value: {
              ...state.filter.period.value,
              start_date: state.filter.period.calendar.start_date,
              end_date: state.filter.period.calendar.end_date,
            },
          },
        },
      };
    }
    case ClientPaymentHistoryActionEnum.SetListFilterPeriodError: {
      return {
        ...state,
        filter: {
          ...state.filter,
          period: {
            ...state.filter.period,
            error: action.payload,
          },
        },
      };
    }

    case ClientPaymentHistoryActionEnum.SetListFilterPeriodIsOpen: {
      return {
        ...state,
        filter: {
          ...state.filter,
          period: {
            ...state.filter.period,
            calendar: {
              ...state.filter.period.calendar,
              is_open: action.payload,
            },
          },
        },
      };
    }

    case ClientPaymentHistoryActionEnum.SetListFilterPeriodStartDate:
      return {
        ...state,
        filter: {
          ...state.filter,
          period: {
            ...state.filter.period,
            calendar: {
              ...state.filter.period.calendar,
              start_date: action.payload,
              end_date: null,
            },
          },
        },
      };
    case ClientPaymentHistoryActionEnum.SetListFilterPeriodEndDate:
      return {
        ...state,
        filter: {
          ...state.filter,
          period: {
            ...state.filter.period,
            calendar: {
              ...state.filter.period.calendar,
              end_date: action.payload,
            },
          },
        },
      };
    case ClientPaymentHistoryActionEnum.SetListFilterPeriodYear:
      return {
        ...state,
        filter: {
          ...state.filter,
          period: {
            ...state.filter.period,
            calendar: {
              ...state.filter.period.calendar,
              year: action.payload,
            },
          },
        },
      };
    case ClientPaymentHistoryActionEnum.SetListFilterPeriodSelectCounter:
      return {
        ...state,
        filter: {
          ...state.filter,
          period: {
            ...state.filter.period,
            calendar: {
              ...state.filter.period.calendar,
              select_counter: action.payload,
            },
          },
        },
      };
    case ClientPaymentHistoryActionEnum.SetListSortBy:
      return {
        ...state,
        sort: {
          ...state.sort,
          by: action.payload,
        },
        // data:action.payload === "Latest Timestamp" ?
      };

    default:
      return state;
  }
};
