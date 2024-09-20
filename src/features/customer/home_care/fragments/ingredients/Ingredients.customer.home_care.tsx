import { useContext } from "react";
import { IngredientsCardCustomerHomeCare } from "../../components/ingredients_card";
import {
  CustomerHomeCareActionEnum,
  CustomerHomeCareContext,
} from "../../context";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export const IngredientsCustomerHomeCare = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerHomeCareContext);

  const handleClickTab = (value: number) => {
    dispatch({
      type: CustomerHomeCareActionEnum.SelectIngredientTab,
      payload: value,
    });
  };
  return (
    <IngredientsCardCustomerHomeCare
      title={dictionaries.major_ingredient_card.title}
      effectText={dictionaries.major_ingredient_card.effects}
      ingredients={state.ingredient.tab.list}
      image={state.ingredient.items[state.ingredient.tab.selected].image}
      description={
        state.ingredient.items[state.ingredient.tab.selected].description
      }
      onTab={handleClickTab}
    />
  );
};
