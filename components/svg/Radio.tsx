import { colors } from "@/constants/color";
import { useTheme } from "@/hooks/useTheme";
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Radio = ({ ...props }: SvgProps) => {
  const { theme } = useTheme();
  return (
    <Svg
      width={24}
      height={24}
      fill={
        theme === "light" ? colors.dark.background : colors.light.background
      }
      viewBox="0 -960 960 960"
      {...props}
    >
      <Path d="M160-80q-33 0-56.5-23.5T80-160v-534l556-226 26 66-330 134h468q33 0 56.5 23.5T880-640v480q0 33-23.5 56.5T800-80H160Zm160-120q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29ZM160-520h480v-80h80v80h80v-120H160v120Z" />
    </Svg>
  );
};
export default Radio;
