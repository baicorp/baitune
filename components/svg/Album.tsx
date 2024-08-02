import { colors } from "@/constants/color";
import { useTheme } from "@/hooks/useTheme";
import * as React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";
const Album = (props: SvgProps) => {
  const { theme } = useTheme();
  return (
    <Svg
      width={24}
      height={24}
      fill={theme === "light" ? colors.dark.text : colors.light.text}
      viewBox="0 -960 960 960"
      {...props}
    >
      <Path d="M480-300q75 0 127.5-52.5T660-480q0-75-52.5-127.5T480-660q-75 0-127.5 52.5T300-480q0 75 52.5 127.5T480-300Zm0-140q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
    </Svg>
  );
};
export default Album;
