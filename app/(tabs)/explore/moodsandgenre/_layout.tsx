import { Stack } from "expo-router";

export default function MoodsAndGenreLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[params]"
        options={{ headerShown: false, animation: "none" }}
      />
    </Stack>
  );
}
