import {
  Radio as RadioComponent,
  RadioProps as RadioComponentProps,
} from "@headlessui/react";

export interface RadioProps extends RadioComponentProps {}

export const Radio = (props: RadioProps) => {
  return (
    <RadioComponent {...props}>
      <div></div>
    </RadioComponent>
  );
};
