import { useContext } from "react";
import { CustomerCarePlansContext } from "../../context";
import { DescriptionCardCustomerCarePlans } from "../../components/description_card";

export const DescriptionCustomerCarePlans = () => {
  const { state } = useContext(CustomerCarePlansContext);
  return (
    <DescriptionCardCustomerCarePlans
      name={state.careplans.data?.name}
      image={state.careplans.data?.photo}
      description={state.careplans.data?.description}
    />
  );
};
