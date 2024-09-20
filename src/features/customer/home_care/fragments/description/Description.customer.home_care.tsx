import { useContext } from "react";
import { DescriptionCardCustomerHomeCare } from "../../components/description_card/DescriptionCard.customer.home_care";
import { CustomerHomeCareContext } from "../../context/HomeCare.customer.context";

export const DescriptionCustomerHomeCare = () => {
  const { state } = useContext(CustomerHomeCareContext);

  return (
    <DescriptionCardCustomerHomeCare
      name={state.treatment.name}
      image={state.treatment.image}
      description={state.treatment.description}
    />
  );
};
