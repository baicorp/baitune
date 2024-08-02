import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgProps } from "react-native-svg/lib/typescript/ReactNativeSVG";
const HomeFilled = (props: SvgProps) => (
  <Svg width={24} height={24} fill="#000" viewBox="0 -960 960 960" {...props}>
    <Path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" />
  </Svg>
);
export default HomeFilled;
