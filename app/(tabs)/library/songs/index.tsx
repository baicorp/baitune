import { ThemedSafeAreaView, ThemedText } from "@/components/shared";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  return (
    <ThemedSafeAreaView>
      <ThemedText>Liked songs</ThemedText>
    </ThemedSafeAreaView>
  );
}
