import { useParams } from "react-router-dom";
import { Tabs } from "src/core/ui/components/tabs";
import { getDictionaries } from "../../i18n";
import { Tab } from "src/core/ui/components/tab";
import { useContext } from "react";
import {
  CustomerDiagnosisActionEnum,
  CustomerDiagnosisContext,
} from "../../context";

export const TypeCustomerDiagnosis = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerDiagnosisContext);
  const handleClickTab = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerDiagnosisActionEnum.SetTypeData,
      payload: {
        ...state.type,
        selected: data,
      },
    });
  };
  return (
    <Tabs variant="secondary">
      {dictionaries.type.items.map((item, index) => (
        <Tab
          variant="secondary"
          key={index}
          selected={item.id === state.type.selected?.id}
          onClick={() => handleClickTab(item)}
        >
          {item.name}
        </Tab>
      ))}
    </Tabs>
  );
};
