import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { globalStyle } from "@/styles/styles";
import { StyleSheet, Text, TextProps } from "react-native";
import { fontSize } from "@/constants/fontSize";
import { colors } from "@/constants/color";

export default function ThemedText({
  style,
  variant = "default",
  ...rest
}: TextProps & {
  variant?: Variant;
}) {
  const { theme } = useTheme();
  const color =
    theme === "light" ? globalStyle.textLight : globalStyle.textDark;

  return (
    <Text
      style={[
        color,
        variant === "default" && styleTextVariant.default,
        variant === "title" && styleTextVariant.title,
        variant === "sectionTitle" && styleTextVariant.sectionTitle,
        variant === "subtitle" && styleTextVariant.subtitle,
        variant === "listTitle" && styleTextVariant.listTitle,
        variant === "channelTitle" && styleTextVariant.channelTitle,
        style,
      ]}
      {...rest}
    />
  );
}

const styleTextVariant = StyleSheet.create({
  default: {
    fontSize: fontSize.base,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: "600",
  },
  channelTitle: {
    fontSize: fontSize["5xl"],
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: fontSize["3xl"],
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.dark.tint,
  },
  listTitle: {
    fontSize: fontSize["4xl"],
    fontWeight: "bold",
    lineHeight: 35,
  },
});

type Variant = keyof typeof styleTextVariant;
