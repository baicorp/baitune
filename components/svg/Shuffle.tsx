import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { colors } from "@/constants/color";
import { useTheme } from "@/hooks/useTheme";

const Shuffle = (props: SvgProps) => {
  const { theme } = useTheme();
  return (
    <Svg
      width={24}
      height={24}
      fill={
        theme === "light" ? colors.light.background : colors.dark.background
      }
      viewBox="0 -960 960 960"
      {...props}
    >
      <Path d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z" />
    </Svg>
  );
};
export default Shuffle;
