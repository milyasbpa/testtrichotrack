import { useContext } from "react";
import { CustomerProfileContext } from "../contexts";
import { FormCustomerProfile } from "../fragments/form/Form.customer.profile";
import { ProfilePictureCustomerProfile } from "../fragments/profile_picture";
import { ProfilePicturePreviewCustomerProfile } from "../fragments/profile_picture_preview";
import { ConfirmationCustomerProfile } from "../fragments/confirmation";
import { useCustomerProfileGetCustomerDetail } from "../react_query/hooks";

export const CustomerProfileContainer = () => {
  const { state } = useContext(CustomerProfileContext);

  useCustomerProfileGetCustomerDetail();
  if (state.global.state === "personal-data") {
    return <FormCustomerProfile />;
  }
  if (state.global.state === "profile-picture") {
    return <ProfilePictureCustomerProfile />;
  }
  if (state.global.state === "profile-picture-preview") {
    return <ProfilePicturePreviewCustomerProfile />;
  }
  if (state.global.state === "confirmation") {
    return <ConfirmationCustomerProfile />;
  }

  return null;
};
