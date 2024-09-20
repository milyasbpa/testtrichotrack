import { CustomerRecommendationContainer } from "../container/Recommendation.customer.container";
import { CustomerRecommendationProvider } from "../context/Recommendation.customer.context";

export const CustomerRecommendationPage = () => {
  return (
    <CustomerRecommendationProvider>
      <CustomerRecommendationContainer />
    </CustomerRecommendationProvider>
  );
};
