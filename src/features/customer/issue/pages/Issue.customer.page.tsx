import { CustomerIssueContainer } from "../container";
import { CustomerIssueProvider } from "../context";

export const CustomerIssuePage = () => {
  return (
    <CustomerIssueProvider>
      <CustomerIssueContainer />
    </CustomerIssueProvider>
  );
};
