import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { globalStyle } from "@/styles/styles";

export default function ThemedView({ style, ...rest }: ScrollViewProps) {
  const { theme } = useTheme();
  return (
    <ScrollView
      style={[
        theme === "light" ? globalStyle.viewLight : globalStyle.viewDark,
        { flex: 1 },
        style,
      ]}
      {...rest}
    />
  );
}
