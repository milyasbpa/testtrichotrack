import { OTPBottomSheet, OTPBottomSheetProps } from "../otp_bottom_sheet";
import { OTPModal, OTPModalProps } from "../otp_modal";

export interface OTPProps {
  type?: "modal" | "bottom_sheet";
  otp?: OTPBottomSheetProps & OTPModalProps;
}

export const OTP = ({ type = "modal", otp }: OTPProps) => {
  if (type === "bottom_sheet") {
    return <OTPBottomSheet {...otp} />;
  }
  return <OTPModal {...otp} />;
};
