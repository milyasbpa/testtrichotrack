import * as React from "react";
import { PeriodSelectPaymentHistory } from "../../components/period_select";
import { getDictionaries } from "../../i18n";
import { ClientPaymentHistoryContext } from "../../contexts/ClientPaymentHistory.context";
import { ClientPaymentHistoryActionEnum } from "../../contexts/ClientPaymentHistory.types";
import { useParams } from "react-router-dom";

export const PeriodFilterPaymentHistory = () => {
  const { locale } = useParams();
  const { state, dispatch } = React.useContext(ClientPaymentHistoryContext);
  const dictionaries = getDictionaries(locale);
  const handleClickApply = () => {
    dispatch({
      type: ClientPaymentHistoryActionEnum.SetListFilterPeriodValue,
    });
    if (
      state.list.filter.period.calendar.start_date !== null &&
      state.list.filter.period.calendar.end_date !== null
    ) {
      dispatch({
        type: ClientPaymentHistoryActionEnum.SetListFilterPeriodError,
        payload: {
          code:
            state.list.filter.period.calendar.start_date >
            state.list.filter.period.calendar.end_date
              ? dictionaries.filter.period.errors.invalid_month.code
              : "",
          message:
            state.list.filter.period.calendar.start_date >
            state.list.filter.period.calendar.end_date
              ? dictionaries.filter.period.errors.invalid_month.message
              : "",
        },
      });
    } else {
      dispatch({
        type: ClientPaymentHistoryActionEnum.SetListFilterPeriodError,
        payload: {
          code: "",
          message: "",
        },
      });
    }

    dispatch({
      type: ClientPaymentHistoryActionEnum.SetListFilterPeriodIsOpen,
      payload: false,
    });
  };
  const handleClickReset = () => {
    dispatch({
      type: ClientPaymentHistoryActionEnum.SetListFilterPeriodStartDate,
      payload: null,
    });
    dispatch({
      type: ClientPaymentHistoryActionEnum.SetListFilterPeriodEndDate,
      payload: null,
    });
  };

  const handleSelectMonth = (date: Date) => {
    if (state.list.filter.period.calendar.select_counter === 1) {
      dispatch({
        type: ClientPaymentHistoryActionEnum.SetListFilterPeriodStartDate,
        payload: date,
      });

      dispatch({
        type: ClientPaymentHistoryActionEnum.SetListFilterPeriodSelectCounter,
        payload: 2,
      });
    } else {
      dispatch({
        type: ClientPaymentHistoryActionEnum.SetListFilterPeriodEndDate,
        payload: date,
      });
      dispatch({
        type: ClientPaymentHistoryActionEnum.SetListFilterPeriodSelectCounter,
        payload: 1,
      });
    }
  };
  const handleSelectYear = (date: Date) => {
    dispatch({
      type: ClientPaymentHistoryActionEnum.SetListFilterPeriodYear,
      payload: date,
    });
  };

  const handleClickCalendar = () => {
    dispatch({
      type: ClientPaymentHistoryActionEnum.SetListFilterPeriodIsOpen,
      payload: !state.list.filter.period.calendar.is_open,
    });
  };
  const handleCloseCalendar = () => {
    dispatch({
      type: ClientPaymentHistoryActionEnum.SetListFilterPeriodIsOpen,
      payload: false,
    });
  };

  return (
    <PeriodSelectPaymentHistory
      label={dictionaries.filter.period.label}
      error={{
        is_error: !!state.list.filter.period.error.code.length,
        message: state.list.filter.period.error.message,
      }}
      value={{
        locale: locale === "en" ? "en-US" : "zh-CN",
        startDate: state.list.filter.period.value.start_date,
        endDate: state.list.filter.period.value.end_date,
      }}
      selector={{
        counter: state.list.filter.period.calendar.select_counter,
      }}
      calendar={{
        isOpen: state.list.filter.period.calendar.is_open,
        locale: locale === "en" ? "en-US" : "zh-CN",
        startDate: state.list.filter.period.calendar.start_date,
        endDate: state.list.filter.period.calendar.end_date,
        year: state.list.filter.period.calendar.year,
        cta: {
          primary: {
            children: dictionaries.filter.period.cta.primary.children,
            onClick: handleClickApply,
          },
          secondary: {
            children: dictionaries.filter.period.cta.secondary.children,
            onClick: handleClickReset,
          },
        },
        onSelectMonth: handleSelectMonth,
        onSelectYear: handleSelectYear,
        onClick: handleClickCalendar,
        onClose: handleCloseCalendar,
      }}
    />
  );
};
