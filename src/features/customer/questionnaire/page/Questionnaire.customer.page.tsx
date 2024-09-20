import { CustomerQuestionnaireContainer } from "../containers";
import { CustomerQuestionnaireProvider } from "../context";

export const CustomerQuestionnairePage = () => {
  return (
    <CustomerQuestionnaireProvider>
      <CustomerQuestionnaireContainer />
    </CustomerQuestionnaireProvider>
  );
};
