import { useContext } from "react";

import { CustomerHomeCareContext } from "../../context";
import { ProductsCardCustomerHomeCare } from "../../components/products_card/ProductsCard.customer.home_care";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export const ProductCustomerHomeCare = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  const { state } = useContext(CustomerHomeCareContext);
  return (
    <ProductsCardCustomerHomeCare
      title={dictionaries.product_card.title}
      products={state.products.data}
    />
  );
};
