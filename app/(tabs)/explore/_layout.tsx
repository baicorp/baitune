import React from "react";
import { Stack } from "expo-router";
import { SearchForm, ThemedSafeAreaView } from "@/components/shared";

const ExploreScreenLayout = () => {
  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ animation: "none", headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="search" />
        <Stack.Screen name="moodsandgenre" />
      </Stack>
    </ThemedSafeAreaView>
  );
};

export default ExploreScreenLayout;
