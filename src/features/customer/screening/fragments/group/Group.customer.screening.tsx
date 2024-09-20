import { useParams } from "react-router-dom";
import { Tabs } from "src/core/ui/components/tabs";

import { Tab } from "src/core/ui/components/tab";
import { useContext, useEffect } from "react";
import {
  CustomerScreeningActionEnum,
  CustomerScreeningContext,
} from "../../context";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const GroupCustomerScreening = () => {
  const { locale } = useParams();

  const appDictionaries = getAppDictionaries(locale);
  const { state, dispatch } = useContext(CustomerScreeningContext);

  useEffect(() => {
    dispatch({
      type: CustomerScreeningActionEnum.SetGroupData,
      payload: {
        ...state.group,
        selected:
          appDictionaries.cases.screening.group.items.find(
            (_, index) => index === 0
          ) ?? null,
      },
    });
  }, []);

  const handleClickTab = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerScreeningActionEnum.SetGroupData,
      payload: {
        ...state.group,
        selected: data,
      },
    });
  };
  return (
    <Tabs variant="secondary">
      {appDictionaries.cases.screening.group.items.map((item, index) => (
        <Tab
          variant="secondary"
          key={index}
          selected={item.id === state.group.selected?.id}
          onClick={() => handleClickTab(item)}
        >
          {item.name}
        </Tab>
      ))}
    </Tabs>
  );
};
