import React from "react";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { colors } from "@/constants/color";
import { useTheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export default function ThemedSafeAreaView({
  style,
  ...rest
}: SafeAreaViewProps) {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={[
        theme === "light"
          ? styleThemedSafeArea.containerLight
          : styleThemedSafeArea.containerDark,
        style,
      ]}
      {...rest}
    />
  );
}

const styleThemedSafeArea = StyleSheet.create({
  containerLight: {
    backgroundColor: colors.light.background,
    flex: 1,
    // paddingHorizontal: 16,
  },
  containerDark: {
    backgroundColor: colors.dark.background,
    flex: 1,
    // paddingHorizontal: 16,
  },
});
