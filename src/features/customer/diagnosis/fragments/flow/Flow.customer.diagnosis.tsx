import { Tab } from "src/core/ui/components/tab";
import { Tabs } from "src/core/ui/components/tabs";
import { useParams } from "react-router-dom";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const FlowCustomerDiagnosis = () => {
  const { locale } = useParams();

  const appDictionaries = getAppDictionaries(locale);
  return (
    <Tabs>
      {appDictionaries.cases.flow.items.map((item, index) => (
        <Tab
          key={index}
          selected={item.id === "diagnosis"}
          href={item.href.replace(":locale", locale ?? "en")}
        >
          {item.name}
        </Tab>
      ))}
    </Tabs>
  );
};
