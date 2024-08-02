import React from "react";
import { colors } from "@/constants/color";
import Svg, { SvgProps, Path } from "react-native-svg";
const Explicit = ({ ...props }: { props?: SvgProps }) => {
  return (
    <Svg
      width={16}
      height={16}
      fill={colors.dark.tint}
      viewBox="0 -960 960 960"
      {...props}
    >
      <Path d="M360-280h240v-80H440v-80h160v-80H440v-80h160v-80H360v400ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z" />
    </Svg>
  );
};
export default Explicit;
