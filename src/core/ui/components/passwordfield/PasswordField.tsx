import { useState } from "react";
import { Button } from "../button";
import { Textfield, TextfieldProps } from "../textfield";
import clsx from "clsx";
import SVGIcon from "../../icons";

export interface PasswordFieldProps extends TextfieldProps {}

export const PasswordField = ({
  type: _,
  ...otherProps
}: PasswordFieldProps) => {
  const [type, setType] = useState<"text" | "password">("password");

  const handleClickType = () => {
    setType(type === "text" ? "password" : "text");
  };
  return (
    <Textfield
      {...otherProps}
      type={type}
      endAddornment={
        otherProps.disabled ? null : (
          <Button variant="icon" onClick={handleClickType}>
            <SVGIcon
              name="RemoveRedEye"
              className={clsx(
                "w-[1.25rem] h-[1.25rem]",
                type === "text" ? "fill-[#017948]" : "fill-[white]"
              )}
            />
          </Button>
        )
      }
    />
  );
};
