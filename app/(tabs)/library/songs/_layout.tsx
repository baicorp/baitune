import { Stack } from "expo-router";
import React from "react";

export default function LikedMusicLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Liked Songs" }} />
    </Stack>
  );
}