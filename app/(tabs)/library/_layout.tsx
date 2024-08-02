import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Library" }} />
      <Stack.Screen name="songs" options={{ headerTitle: "Library" }} />
      <Stack.Screen name="playlists" options={{ headerTitle: "Library" }} />
      <Stack.Screen name="albums" options={{ headerTitle: "Library" }} />
      <Stack.Screen name="artists" options={{ headerTitle: "Library" }} />
    </Stack>
  );
};

export default Layout;
