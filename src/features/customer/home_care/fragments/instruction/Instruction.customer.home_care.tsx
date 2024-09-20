import { useContext } from "react";
import { InstructionCardCustomerHomeCare } from "../../components/instruction_card/InstructionCard.customer.home_care";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import {
  CustomerHomeCareActionEnum,
  CustomerHomeCareContext,
} from "../../context";

export default function InstructionCustomerHomeCare() {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerHomeCareContext);

  const handleClickTab = (value: number) => {
    dispatch({
      type: CustomerHomeCareActionEnum.SelectInstructionTab,
      payload: value,
    });
  };
  return (
    <InstructionCardCustomerHomeCare
      title={dictionaries.instruction_for_use_card.title}
      count={state.instruction.tab.list.length}
      description={
        state.instruction.items[state.instruction.tab.selected].description
      }
      image={state.instruction.items[state.instruction.tab.selected].image}
      onTab={handleClickTab}
    />
  );
}
