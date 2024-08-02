import { colors } from "@/constants/color";
import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
  viewLight: {
    height: "100%",
    backgroundColor: colors.light.background,
  },
  viewDark: {
    height: "100%",
    backgroundColor: colors.dark.background,
  },
  textLight: {
    color: colors.light.text,
  },
  textDark: {
    color: colors.dark.text,
  },
});
