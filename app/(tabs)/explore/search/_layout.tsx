import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="[searchResultQuery]"
        options={{ headerShown: false, animation: "none" }}
      />
    </Stack>
  );
}
