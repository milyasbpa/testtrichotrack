import { LoaderSizeProps } from "react-spinners/helpers/props";
import MoonLoaderReactSpinners from "react-spinners/MoonLoader";

export interface MoonLoaderProps extends LoaderSizeProps {
  size?: number;
  color?: string;
}

export const MoonLoader = ({
  size = 24,
  color = "#FFF",
  ...otherProps
}: MoonLoaderProps) => {
  return <MoonLoaderReactSpinners {...otherProps} size={size} color={color} />;
};
