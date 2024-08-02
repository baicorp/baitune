import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const ArrowBack = (props: SvgProps) => (
  <Svg width={24} height={24} fill="#fff" viewBox="0 -960 960 960" {...props}>
    <Path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
  </Svg>
);
export default ArrowBack;
