import * as React from "react";
import { useTheme } from "@/hooks/useTheme";
import { colors } from "@/constants/color";
import { Svg, Path, SvgProps } from "react-native-svg";
const Playlist = (props: SvgProps) => {
  const { theme } = useTheme();
  return (
    <Svg
      width={24}
      height={24}
      fill={theme === "light" ? colors.dark.text : colors.light.text}
      viewBox="0 -960 960 960"
      {...props}
    >
      <Path d="M240-440h360v-80H240v80Zm0-120h360v-80H240v80Zm-80 400q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Z" />
    </Svg>
  );
};
export default Playlist;
