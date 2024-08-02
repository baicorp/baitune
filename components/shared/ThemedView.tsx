import React from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { globalStyle } from "@/styles/styles";

export default function ThemedView({ style, ...rest }: ViewProps) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        theme === "light" ? globalStyle.viewLight : globalStyle.viewDark,
        style,
      ]}
      {...rest}
    />
  );
}
